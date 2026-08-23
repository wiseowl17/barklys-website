import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { GALLERY } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [{ title: "Gallery | Barkly's" }],
  }),
});

function GalleryPage() {
  const [active, setActive] = useState<(typeof GALLERY)[number] | null>(null);

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        Fresh from the table
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Gallery</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Real Barkly’s clients — Aussies, Poms, doodles, Yorkies, and friends —
        after a calm, Fear-Free groom.
      </p>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {GALLERY.map((photo) => (
          <button
            key={photo.src}
            type="button"
            className="mb-4 block w-full overflow-hidden rounded-xl shadow-card ring-1 ring-line"
            onClick={() => setActive(photo)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          <button
            type="button"
            className="absolute top-4 right-4 size-11 rounded-full bg-paper text-navy"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X className="mx-auto size-5" />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-soft"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </main>
  );
}
