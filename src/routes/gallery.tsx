import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { useCms } from "@/lib/cms-context";
import type { GalleryItem } from "@/lib/cms";
import { breadcrumbJsonLd, collectionPageJsonLd, pageHead } from "@/lib/seo";
import { GALLERY } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () =>
    pageHead({
      title: "Dog Grooming Gallery | Barkly's Charlotte",
      description:
        "See real Barkly's clients after Fear-Free dog grooming in the Charlotte NC area — bows, bandanas, and happy tails. Book your dog's own before-and-after.",
      path: "/gallery",
      jsonLd: [
        collectionPageJsonLd({
          name: "Fluff & friends from the Charlotte table",
          description:
            "See real Barkly's clients after Fear-Free dog grooming in the Charlotte NC area — bows, bandanas, and happy tails. Book your dog's own before-and-after.",
          path: "/gallery",
          images: GALLERY,
        }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]),
      ],
    }),
});

const TAPES = ["bg-pink", "bg-gold", "bg-sky", "bg-teal"] as const;

function GalleryPage() {
  const { gallery } = useCms();
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <main className="relative px-4 py-14 text-center sm:px-6 lg:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-[-4rem] size-56 rounded-full bg-pink/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 right-[-3rem] size-48 rounded-full bg-sky/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-20 left-1/3 size-40 rounded-full bg-gold/20 blur-3xl"
      />

      <p className="relative text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        Fresh from the table
      </p>
      <h1 className="relative mt-3 font-display text-4xl sm:text-5xl">
        Fluff & friends from the Charlotte table
      </h1>
      <p className="relative mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 text-muted">
        <Heart className="size-4 fill-pink text-pink" />
        A little scrapbook of real Barkly’s grooms — bows, bandanas, and happy
        tails after Fear-Free visits.
        <Heart className="size-4 fill-pink text-pink" />
      </p>

      <div className="relative mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {gallery.map((photo, i) => {
          const tape = TAPES[i % TAPES.length];
          return (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActive(photo)}
              className="group relative w-full rounded-[1.35rem] bg-paper p-2.5 pb-3 text-left shadow-card ring-1 ring-line/70 transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -top-2 left-1/2 z-10 h-4 w-11 -translate-x-1/2 rounded-[2px] opacity-80 shadow-sm",
                  tape,
                  i % 2 === 0 ? "-rotate-6" : "rotate-6",
                )}
              />
              <span
                className={cn(
                  "relative block aspect-[3/4] overflow-hidden rounded-[1rem]",
                )}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  title={photo.name}
                  width={1500}
                  height={2000}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-3 block truncate text-center font-display text-[13px] italic text-navy sm:text-sm">
                {photo.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative mx-auto mt-12 max-w-xl">
        <p className="text-muted">Want your pup on this wall?</p>
        <Button asChild size="lg" className="mt-4">
          <Link to="/book">Book a groom</Link>
        </Button>
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
          <figure
            className="w-full max-w-[min(92vw,52rem)] rounded-[1.6rem] bg-paper p-3 pb-10 shadow-soft sm:p-4 sm:pb-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              title={active.name}
              className="max-h-[78vh] w-full rounded-[1.15rem] object-contain"
            />
            <figcaption className="mt-4 text-center font-display text-xl italic text-navy">
              {active.name}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </main>
  );
}
