import { getSql } from "@/lib/db";
import {
  buildPublicCms,
  fallbackPublicCms,
  photoUrl,
  type GalleryItem,
  type MediaCollection,
  type PublicCms,
  type StudioPhoto,
} from "@/lib/cms";
import { GALLERY, HERO_SLIDES } from "@/lib/site";

export type { StudioPhoto };

export type StudioData = {
  copy: Record<string, string>
  gallery: StudioPhoto[]
  hero: StudioPhoto[]
}

type SlotRow = { src: string; sort_order: number; hidden: boolean }
type UploadRow = { id: number; name: string; alt: string; sort_order: number }

function defaultsFor(collection: MediaCollection) {
  return collection === "hero" ? HERO_SLIDES : GALLERY;
}

async function copyMap(): Promise<Record<string, string>> {
  const sql = await getSql();
  const rows = await sql.query<{ key: string; value: string }>(
    "select key, value from site_copy",
  );
  const stored: Record<string, string> = {};
  for (const row of rows) stored[row.key] = row.value;
  return stored;
}

async function slotsFor(collection: MediaCollection): Promise<SlotRow[]> {
  const sql = await getSql();
  return sql.query<SlotRow>(
    "select src, sort_order, hidden from media_slots where collection = $1 order by sort_order asc, src asc",
    [collection],
  );
}

async function uploadsFor(collection: MediaCollection): Promise<UploadRow[]> {
  const sql = await getSql();
  return sql.query<UploadRow>(
    "select id, name, alt, sort_order from gallery_photos where collection = $1 order by sort_order asc, id desc",
    [collection],
  );
}

function toItem(photo: { src: string; name: string; alt: string }): GalleryItem {
  return { src: photo.src, name: photo.name, alt: photo.alt || photo.name };
}

function assembleStudio(
  collection: MediaCollection,
  uploads: UploadRow[],
  slots: SlotRow[],
): StudioPhoto[] {
  const defaults = defaultsFor(collection);
  const bySrc = new Map<string, StudioPhoto>();

  for (const row of uploads) {
    const src = photoUrl(Number(row.id));
    bySrc.set(src, {
      id: Number(row.id),
      src,
      name: row.name,
      alt: row.alt || row.name,
      kind: "upload",
      hidden: false,
      collection,
      sort_order: Number(row.sort_order) || 0,
    });
  }
  for (const photo of defaults) {
    if (bySrc.has(photo.src)) continue;
    bySrc.set(photo.src, {
      id: null,
      src: photo.src,
      name: photo.name,
      alt: photo.alt,
      kind: "builtin",
      hidden: false,
      collection,
      sort_order: 0,
    });
  }

  if (slots.length === 0) {
    const uploaded = [...bySrc.values()].filter((photo) => photo.kind === "upload");
    const builtins = [...bySrc.values()].filter((photo) => photo.kind === "builtin");
    return [...uploaded, ...builtins].map((photo, index) => ({ ...photo, sort_order: index }));
  }

  const hidden = new Map(slots.map((slot) => [slot.src, slot.hidden]));
  const ordered: StudioPhoto[] = [];
  const seen = new Set<string>();
  for (const slot of slots) {
    let photo = bySrc.get(slot.src);
    if (!photo && slot.src.startsWith("/studio/")) {
      photo = {
        id: null,
        src: slot.src,
        name: slot.src.slice("/studio/".length).replace(/\.[^.]+$/, "") || "Upload",
        alt: "Studio photo",
        kind: "upload",
        hidden: false,
        collection,
        sort_order: Number(slot.sort_order),
      };
      bySrc.set(slot.src, photo);
    }
    if (!photo) continue;
    ordered.push({
      ...photo,
      hidden: Boolean(slot.hidden),
      sort_order: Number(slot.sort_order),
    });
    seen.add(slot.src);
  }
  for (const photo of bySrc.values()) {
    if (seen.has(photo.src)) continue;
    ordered.push({
      ...photo,
      hidden: hidden.get(photo.src) ?? false,
      sort_order: ordered.length,
    });
  }
  return ordered;
}

function publicFromStudio(photos: StudioPhoto[]): GalleryItem[] {
  return photos.filter((photo) => !photo.hidden).map(toItem);
}

export async function loadPublicCms(): Promise<PublicCms> {
  const [stored, galleryUploads, heroUploads, gallerySlots, heroSlots] = await Promise.all([
    copyMap(),
    uploadsFor("gallery"),
    uploadsFor("hero"),
    slotsFor("gallery"),
    slotsFor("hero"),
  ]);
  return buildPublicCms(
    stored,
    publicFromStudio(assembleStudio("gallery", galleryUploads, gallerySlots)),
    publicFromStudio(assembleStudio("hero", heroUploads, heroSlots)),
  );
}

export async function loadPublicCmsSafe(): Promise<PublicCms> {
  try {
    return await loadPublicCms();
  } catch (err) {
    console.error("[cms] public load failed", err);
    return fallbackPublicCms();
  }
}

export async function loadStudioData(): Promise<StudioData> {
  const [stored, galleryUploads, heroUploads, gallerySlots, heroSlots] = await Promise.all([
    copyMap(),
    uploadsFor("gallery"),
    uploadsFor("hero"),
    slotsFor("gallery"),
    slotsFor("hero"),
  ]);
  return {
    copy: stored,
    gallery: assembleStudio("gallery", galleryUploads, gallerySlots),
    hero: assembleStudio("hero", heroUploads, heroSlots),
  };
}

export async function upsertCopy(entries: Record<string, string>): Promise<void> {
  const sql = await getSql();
  for (const [key, value] of Object.entries(entries)) {
    if (!key || key.length > 80) continue;
    await sql.query(
      `insert into site_copy (key, value, updated_at)
       values ($1, $2, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`,
      [key, value],
    );
  }
}

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 800_000;
const COLLECTIONS = new Set<MediaCollection>(["gallery", "hero"]);

export async function insertPhoto(input: {
  name: string
  alt: string
  mime: string
  dataBase64: string
  collection?: MediaCollection
}): Promise<number> {
  const collection: MediaCollection = COLLECTIONS.has(input.collection as MediaCollection)
    ? (input.collection as MediaCollection)
    : "gallery";
  const mime = ALLOWED_MIME.has(input.mime) ? input.mime : "image/jpeg";
  const cleaned = input.dataBase64.replace(/\s/g, "");
  if (!/^[A-Za-z0-9+/=]+$/.test(cleaned)) {
    throw new Error("That photo could not be read.");
  }
  const size = Math.ceil((cleaned.length * 3) / 4);
  if (size > MAX_BYTES) {
    throw new Error("That photo is too large. Please use a smaller image.");
  }
  const sql = await getSql();
  const minRows = await sql.query<{ min: number | null }>(
    "select min(sort_order) as min from gallery_photos where collection = $1",
    [collection],
  );
  const sortOrder = (minRows[0]?.min ?? 0) - 1;
  const rows = await sql.query<{ id: number }>(
    `insert into gallery_photos (name, alt, mime, bytes, collection, sort_order)
     values ($1, $2, $3, decode($4, 'base64'), $5, $6)
     returning id`,
    [
      input.name.trim().slice(0, 80) || "Groom",
      (input.alt.trim() || input.name.trim() || "Groomed dog").slice(0, 160),
      mime,
      cleaned,
      collection,
      sortOrder,
    ],
  );
  const id = rows[0]?.id;
  if (id == null) throw new Error("Could not save that photo.");
  const src = photoUrl(Number(id));
  const current = assembleStudio(collection, await uploadsFor(collection), await slotsFor(collection));
  const srcs = [src, ...current.map((photo) => photo.src).filter((item) => item !== src)];
  await writeSlots(collection, srcs, new Map(current.map((photo) => [photo.src, photo.hidden])));
  return Number(id);
}

export async function removePhoto(id: number): Promise<void> {
  const sql = await getSql();
  const src = photoUrl(id);
  await sql.query("delete from gallery_photos where id = $1", [id]);
  await sql.query("delete from media_slots where src = $1", [src]);
}

export async function setBuiltinHidden(
  src: string,
  hidden: boolean,
  collection: MediaCollection = "gallery",
): Promise<void> {
  const defaults = defaultsFor(collection);
  if (!defaults.some((photo) => photo.src === src)) {
    throw new Error("Unknown photo.");
  }
  const current = assembleStudio(collection, await uploadsFor(collection), await slotsFor(collection));
  const hiddenMap = new Map(current.map((photo) => [photo.src, photo.src === src ? hidden : photo.hidden]));
  await writeSlots(
    collection,
    current.map((photo) => photo.src),
    hiddenMap,
  );
}

export async function reorderMedia(
  collection: MediaCollection,
  srcs: string[],
): Promise<void> {
  if (!COLLECTIONS.has(collection)) throw new Error("Unknown collection.");
  const current = assembleStudio(collection, await uploadsFor(collection), await slotsFor(collection));
  const allowed = new Set(current.map((photo) => photo.src));
  const unique = srcs.filter((src, index) => allowed.has(src) && srcs.indexOf(src) === index);
  for (const photo of current) {
    if (!unique.includes(photo.src)) unique.push(photo.src);
  }
  const hiddenMap = new Map(current.map((photo) => [photo.src, photo.hidden]));
  await writeSlots(collection, unique, hiddenMap);
}

async function writeSlots(
  collection: MediaCollection,
  srcs: string[],
  hiddenMap: Map<string, boolean>,
): Promise<void> {
  const sql = await getSql();
  await sql.query("delete from media_slots where collection = $1", [collection]);
  for (let i = 0; i < srcs.length; i += 1) {
    const src = srcs[i]!;
    await sql.query(
      `insert into media_slots (src, collection, sort_order, hidden)
       values ($1, $2, $3, $4)
       on conflict (src, collection) do update set sort_order = excluded.sort_order, hidden = excluded.hidden`,
      [src, collection, i, hiddenMap.get(src) ?? false],
    );
  }
  for (let i = 0; i < srcs.length; i += 1) {
    const src = srcs[i]!;
    const match = src.match(/^\/api\/gallery-photo\/(\d+)$/);
    if (!match) continue;
    await sql.query(
      "update gallery_photos set sort_order = $1, collection = $2 where id = $3",
      [i, collection, Number(match[1])],
    );
  }
}

export async function loadPhotoBytes(
  id: number,
): Promise<{ mime: string; bytes: Buffer } | null> {
  const sql = await getSql();
  const rows = await sql.query<{ mime: string; data: string }>(
    "select mime, encode(bytes, 'base64') as data from gallery_photos where id = $1",
    [id],
  );
  const row = rows[0];
  if (!row) return null;
  return { mime: row.mime, bytes: Buffer.from(row.data, "base64") };
}
