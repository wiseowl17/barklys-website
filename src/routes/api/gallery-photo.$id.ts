import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/gallery-photo/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = Number(params.id);
        if (!Number.isInteger(id) || id <= 0) {
          return new Response("Not found", { status: 404 });
        }
        const hasDb = Boolean(process.env.DATABASE_URL?.trim());
        const allowPglite =
          !process.env.VERCEL && process.env.NODE_ENV !== "production";
        if (!hasDb && !allowPglite) {
          return new Response("Not found", { status: 404 });
        }
        const { loadPhotoBytes } = await import("@/lib/cms-queries.server");
        const photo = await loadPhotoBytes(id);
        if (!photo) return new Response("Not found", { status: 404 });
        return new Response(new Uint8Array(photo.bytes), {
          headers: {
            "Content-Type": photo.mime,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
