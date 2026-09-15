import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { defaultCopyMap, fallbackPublicCms, type PublicCms, type StudioPhoto } from "@/lib/cms";
import { studioMiddleware, studioTokenMiddleware } from "@/lib/cms-middleware";

const copyRecord = z.record(z.string(), z.string());

function canUseDb(): boolean {
  if (process.env.DATABASE_URL?.trim()) return true;
  if (process.env.VERCEL) return false;
  if (process.env.NODE_ENV === "production") return false;
  return true;
}

const dbUnavailable =
  "The studio desk needs the live site database before photos and copy can save. The public pages still work.";

export const getPublicContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicCms> => {
    if (!canUseDb()) return fallbackPublicCms();
    const { loadPublicCmsSafe } = await import("./cms-queries.server");
    return loadPublicCmsSafe();
  },
);

export const getAdminSession = createServerFn({ method: "GET" })
  .middleware([studioTokenMiddleware])
  .handler(async ({ context }): Promise<{ ok: boolean }> => {
    const { hasAdminAccess } = await import("./cms-session.server");
    return { ok: hasAdminAccess(context.studioToken) };
  });

export const adminLogin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string().min(1).max(200) }))
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string; token?: string }> => {
    const { passwordMatches, writeAdminSession } = await import("./cms-session.server");
    if (!passwordMatches(data.password)) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { ok: false, error: "That password does not match." };
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
    if (!canUseDb()) {
      return { copy: defaultCopyMap(), photos: [] as StudioPhoto[] };
    }
    const { loadStudioData } = await import("./cms-queries.server");
    try {
      const studio = await loadStudioData();
      return { copy: { ...defaultCopyMap(), ...studio.copy }, photos: studio.photos };
    } catch (err) {
      console.error("[cms] studio load failed", err);
      return { copy: defaultCopyMap(), photos: [] };
    }
  });

export const saveStudioCopy = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator(z.object({ entries: copyRecord }))
  .handler(async ({ data }) => {
    if (!canUseDb()) throw new Error(dbUnavailable);
    const allowed = new Set(Object.keys(defaultCopyMap()));
    const entries: Record<string, string> = {};
    for (const [key, value] of Object.entries(data.entries)) {
      if (!allowed.has(key)) continue;
      entries[key] = value.slice(0, 4000);
    }
    const { upsertCopy } = await import("./cms-queries.server");
    await upsertCopy(entries);
    return { ok: true as const };
  });

export const uploadStudioPhoto = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator(
    z.object({
      name: z.string().min(1).max(80),
      alt: z.string().max(160),
      mime: z.string().max(40),
      dataBase64: z.string().min(32).max(1_200_000),
    }),
  )
  .handler(async ({ data }) => {
    if (!canUseDb()) throw new Error(dbUnavailable);
    const { insertPhoto } = await import("./cms-queries.server");
    const id = await insertPhoto(data);
    return { ok: true as const, id };
  });

export const deleteStudioPhoto = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator(z.object({ id: z.number().int().positive() }))
  .handler(async ({ data }) => {
    if (!canUseDb()) throw new Error(dbUnavailable);
    const { removePhoto } = await import("./cms-queries.server");
    await removePhoto(data.id);
    return { ok: true as const };
  });

export const toggleBuiltinPhoto = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator(
    z.object({
      src: z.string().min(1).max(200),
      hidden: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    if (!canUseDb()) throw new Error(dbUnavailable);
    const { setBuiltinHidden } = await import("./cms-queries.server");
    await setBuiltinHidden(data.src, data.hidden);
    return { ok: true as const };
  });
