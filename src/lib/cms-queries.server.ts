import { getSql } from "@/lib/db";
import {
  buildPublicCms,
  fallbackPublicCms,
  photoUrl,
  type GalleryItem,
  type PublicCms,
  type StudioPhoto,
} from "@/lib/cms";
import { GALLERY } from "@/lib/site";

export type { StudioPhoto };

export type StudioData = {
  copy: Record<string, string>
  photos: StudioPhoto[]
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

async function hiddenSrcs(): Promise<string[]> {
  const sql = await getSql();
  const rows = await sql.query<{ src: string }>("select src from gallery_hidden");
  return rows.map((row) => row.src);
}

async function uploadedItems(): Promise<GalleryItem[]> {
  const sql = await getSql();
  const rows = await sql.query<{ id: number; name: string; alt: string }>(
    "select id, name, alt from gallery_photos order by sort_order asc, id desc",
  );
  return rows.map((row) => ({
    src: photoUrl(Number(row.id)),
    name: row.name,
    alt: row.alt || row.name,
  }));
}

export async function loadPublicCms(): Promise<PublicCms> {
  const [stored, uploaded, hidden] = await Promise.all([
    copyMap(),
    uploadedItems(),
    hiddenSrcs(),
  ]);
  return buildPublicCms(stored, uploaded, hidden);
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
  const sql = await getSql();
  const [stored, hidden, uploads] = await Promise.all([
    copyMap(),
    hiddenSrcs(),
    sql.query<{ id: number; name: string; alt: string }>(
      "select id, name, alt from gallery_photos order by sort_order asc, id desc",
    ),
  ]);
  const hiddenSet = new Set(hidden);
  const photos: StudioPhoto[] = [
    ...uploads.map((row) => ({
      id: Number(row.id),
      src: photoUrl(Number(row.id)),
      name: row.name,
      alt: row.alt || row.name,
      kind: "upload" as const,
      hidden: false,
    })),
    ...GALLERY.map((photo) => ({
      id: null,
      src: photo.src,
      name: photo.name,
      alt: photo.alt,
      kind: "builtin" as const,
      hidden: hiddenSet.has(photo.src),
    })),
  ];
  return { copy: { ...stored }, photos };
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

export async function insertPhoto(input: {
  name: string
  alt: string
  mime: string
  dataBase64: string
}): Promise<number> {
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
  const rows = await sql.query<{ id: number }>(
    `insert into gallery_photos (name, alt, mime, bytes)
     values ($1, $2, $3, decode($4, 'base64'))
     returning id`,
    [
      input.name.trim().slice(0, 80) || "Groom",
      (input.alt.trim() || input.name.trim() || "Groomed dog").slice(0, 160),
      mime,
      cleaned,
    ],
  );
  const id = rows[0]?.id;
  if (id == null) throw new Error("Could not save that photo.");
  return Number(id);
}

export async function removePhoto(id: number): Promise<void> {
  const sql = await getSql();
  await sql.query("delete from gallery_photos where id = $1", [id]);
}

export async function setBuiltinHidden(src: string, hidden: boolean): Promise<void> {
  if (!GALLERY.some((photo) => photo.src === src)) {
    throw new Error("Unknown gallery photo.");
  }
  const sql = await getSql();
  if (hidden) {
    await sql.query(
      "insert into gallery_hidden (src) values ($1) on conflict (src) do nothing",
      [src],
    );
  } else {
    await sql.query("delete from gallery_hidden where src = $1", [src]);
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
