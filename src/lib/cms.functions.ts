import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  builtinStudioPhotos,
  defaultCopyMap,
  fallbackPublicCms,
  type MediaCollection,
  type PublicCms,
} from "@/lib/cms";
import {
  bucketFor,
  publicFromStudioFile,
  setBucket,
  studioPhotosFromFile,
  type PersistMode,
} from "@/lib/cms-file";
import { studioMiddleware, studioTokenMiddleware } from "@/lib/cms-middleware";

const copyRecord = z.record(z.string(), z.string());

function canUseDb(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

const dbUnavailable =
  "The live website cannot store copy yet. Save from this preview, or add a free database under Vercel → Storage. A GitHub key is not required.";

export const getPublicContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicCms> => {
    if (canUseDb()) {
      const { loadPublicCmsSafe } = await import("./cms-queries.server");
      return loadPublicCmsSafe();
    }
    try {
      const { readStudioFile } = await import("./cms-publish.server");
      return publicFromStudioFile(await readStudioFile());
    } catch (err) {
      console.error("[cms] published load failed", err);
      return fallbackPublicCms();
    }
  },
);

export const getAdminSession = createServerFn({ method: "GET" })
  .middleware([studioTokenMiddleware])
  .handler(async ({ context }): Promise<{ ok: boolean }> => {
    const { hasAdminAccess } = await import("./cms-session.server");
    return { ok: hasAdminAccess(context.studioToken) };
  });

export const adminLogin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().min(1).max(200),
      password: z.string().min(1).max(200),
    }),
  )
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string; token?: string }> => {
    const { credentialsMatch, writeAdminSession } = await import("./cms-session.server");
    if (!credentialsMatch(data.email, data.password)) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { ok: false, error: "That email or password does not match." };
    }
    const token = writeAdminSession();
    return { ok: true, token };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { clearAdminSession } = await import("./cms-session.server");
  clearAdminSession();
  return { ok: true as const };
});

export const getStudioData = createServerFn({ method: "GET" })
  .middleware([studioMiddleware])
  .handler(async () => {
    const { persistMode, canPersist, readStudioFile } = await import("./cms-publish.server");
    const mode: PersistMode = persistMode();
    if (canUseDb()) {
      const { loadStudioData } = await import("./cms-queries.server");
      try {
        const studio = await loadStudioData();
        return {
          copy: { ...defaultCopyMap(), ...studio.copy },
          gallery: studio.gallery,
          hero: studio.hero,
          dbOk: true,
          persistMode: mode,
        };
      } catch (err) {
        console.error("[cms] studio load failed", err);
      }
    }
    try {
      const file = await readStudioFile();
      return {
        copy: { ...defaultCopyMap(), ...file.copy },
        gallery: studioPhotosFromFile(file, "gallery"),
        hero: studioPhotosFromFile(file, "hero"),
        dbOk: canPersist(),
        persistMode: mode,
      };
    } catch (err) {
      console.error("[cms] published studio load failed", err);
      return {
        copy: defaultCopyMap(),
        gallery: builtinStudioPhotos("gallery"),
        hero: builtinStudioPhotos("hero"),
        dbOk: false,
        persistMode: mode,
      };
    }
  });

async function persistFileAndPublish() {
  const { publishStudio } = await import("./cms-publish.server");
  return publishStudio();
}

export const saveStudioCopy = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator(z.object({ entries: copyRecord }))
  .handler(async ({ data }) => {
    const { canPersist, readStudioFile, writeStudioFile } = await import("./cms-publish.server");
    if (!canPersist()) throw new Error(dbUnavailable);
    const allowed = new Set(Object.keys(defaultCopyMap()));
    const entries: Record<string, string> = {};
    for (const [key, value] of Object.entries(data.entries)) {
      if (!allowed.has(key)) continue;
      entries[key] = value.slice(0, 4000);
    }
    if (canUseDb()) {
      const { upsertCopy } = await import("./cms-queries.server");
      await upsertCopy(entries);
      return { ok: true as const, pushed: false };
    }
    const file = await readStudioFile();
    await writeStudioFile({ ...file, copy: { ...file.copy, ...entries } });
    const published = await persistFileAndPublish();
    return { ok: true as const, pushed: published.pushed };
  });

export const uploadStudioPhoto = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator(
    z.object({
      name: z.string().min(1).max(80),
      alt: z.string().max(160),
      mime: z.string().max(40),
      dataBase64: z.string().min(32).max(1_200_000),
      collection: z.enum(["gallery", "hero"]).default("gallery"),
    }),
  )
  .handler(async ({ data }) => {
    const { canPersist, readStudioFile, writeStudioFile, writeStudioPhoto } = await import(
      "./cms-publish.server"
    );
    if (!canPersist()) throw new Error(dbUnavailable);
    if (canUseDb()) {
      const { insertPhoto } = await import("./cms-queries.server");
      const id = await insertPhoto(data);
      return { ok: true as const, id: String(id), pushed: false };
    }
    const cleaned = data.dataBase64.replace(/\s/g, "");
    if (!/^[A-Za-z0-9+/=]+$/.test(cleaned)) {
      throw new Error("That photo could not be read.");
    }
    const bytes = Buffer.from(cleaned, "base64");
    if (bytes.length > 800_000) {
      throw new Error("That photo is too large. Please use a smaller image.");
    }
    const ext = data.mime.includes("png") ? "png" : data.mime.includes("webp") ? "webp" : "jpg";
    const id = `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    const src = await writeStudioPhoto(`${id}.${ext}`, bytes);
    const collection = data.collection as MediaCollection;
    const file = await readStudioFile();
    const bucket = bucketFor(file, collection);
    const upload = {
      id,
      src,
      name: data.name.trim().slice(0, 80) || "Groom",
      alt: (data.alt.trim() || data.name.trim() || "Groomed dog").slice(0, 160),
    };
    const next = setBucket(file, collection, {
      ...bucket,
      uploads: [upload, ...bucket.uploads],
      order: [src, ...bucket.order.filter((item) => item !== src)],
    });
    await writeStudioFile(next);
    const published = await persistFileAndPublish();
    return { ok: true as const, id, pushed: published.pushed };
  });

export const deleteStudioPhoto = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator(
    z.object({
      id: z.number().int().positive().optional(),
      src: z.string().min(1).max(200).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { canPersist, readStudioFile, writeStudioFile, removeStudioPhotoFile } = await import(
      "./cms-publish.server"
    );
    if (!canPersist()) throw new Error(dbUnavailable);
    if (canUseDb() && data.id) {
      const { removePhoto } = await import("./cms-queries.server");
      await removePhoto(data.id);
      return { ok: true as const, pushed: false };
    }
    if (data.src) {
      const file = await readStudioFile();
      const strip = (collection: MediaCollection) => {
        const bucket = bucketFor(file, collection);
        return setBucket(file, collection, {
          hidden: bucket.hidden.filter((src) => src !== data.src),
          order: bucket.order.filter((src) => src !== data.src),
          uploads: bucket.uploads.filter((upload) => upload.src !== data.src),
        });
      };
      let next = strip("gallery");
      next = {
        ...next,
        hero: {
          hidden: next.hero.hidden.filter((src) => src !== data.src),
          order: next.hero.order.filter((src) => src !== data.src),
          uploads: next.hero.uploads.filter((upload) => upload.src !== data.src),
        },
      };
      await writeStudioFile(next);
      await removeStudioPhotoFile(data.src);
    }
    const published = await persistFileAndPublish();
    return { ok: true as const, pushed: published.pushed };
  });

export const toggleBuiltinPhoto = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator(
    z.object({
      src: z.string().min(1).max(200),
      hidden: z.boolean(),
      collection: z.enum(["gallery", "hero"]).default("gallery"),
    }),
  )
  .handler(async ({ data }) => {
    const { canPersist, readStudioFile, writeStudioFile } = await import("./cms-publish.server");
    if (!canPersist()) throw new Error(dbUnavailable);
    if (canUseDb()) {
      const { setBuiltinHidden } = await import("./cms-queries.server");
      await setBuiltinHidden(data.src, data.hidden, data.collection as MediaCollection);
      return { ok: true as const, pushed: false };
    }
    const collection = data.collection as MediaCollection;
    const file = await readStudioFile();
    const photos = studioPhotosFromFile(file, collection).map((photo) =>
      photo.src === data.src ? { ...photo, hidden: data.hidden } : photo,
    );
    const bucket = bucketFor(file, collection);
    await writeStudioFile(
      setBucket(file, collection, {
        ...bucket,
        hidden: photos.filter((photo) => photo.hidden).map((photo) => photo.src),
        order: photos.map((photo) => photo.src),
      }),
    );
    const published = await persistFileAndPublish();
    return { ok: true as const, pushed: published.pushed };
  });

export const reorderStudioPhotos = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator(
    z.object({
      collection: z.enum(["gallery", "hero"]),
      srcs: z.array(z.string().min(1).max(200)).min(1).max(80),
    }),
  )
  .handler(async ({ data }) => {
    const { canPersist, readStudioFile, writeStudioFile } = await import("./cms-publish.server");
    if (!canPersist()) throw new Error(dbUnavailable);
    if (canUseDb()) {
      const { reorderMedia } = await import("./cms-queries.server");
      await reorderMedia(data.collection as MediaCollection, data.srcs);
      return { ok: true as const, pushed: false };
    }
    const collection = data.collection as MediaCollection;
    const file = await readStudioFile();
    const current = studioPhotosFromFile(file, collection);
    const allowed = new Set(current.map((photo) => photo.src));
    const unique = data.srcs.filter((src, index) => allowed.has(src) && data.srcs.indexOf(src) === index);
    for (const photo of current) {
      if (!unique.includes(photo.src)) unique.push(photo.src);
    }
    const bucket = bucketFor(file, collection);
    await writeStudioFile(
      setBucket(file, collection, {
        ...bucket,
        order: unique,
      }),
    );
    const published = await persistFileAndPublish();
    return { ok: true as const, pushed: published.pushed };
  });
