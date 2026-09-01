import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { GALLERY } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () =>
    pageHead({
      title: "Dog Grooming Gallery | Barkly's Charlotte",
      description:
        "Real Barkly's clients after Fear-Free dog grooming in the Charlotte NC area — bows, bandanas, and happy tails.",
      path: "/gallery",
    }),
});

const TAPES = ["bg-pink", "bg-gold", "bg-sky", "bg-teal"] as const;
const ROTATES = [
  "-rotate-2",
  "rotate-2",
  "-rotate-1",
  "rotate-3",
  "rotate-1",
  "-rotate-3",
  "rotate-[2.5deg]",
  "-rotate-[1.5deg]",
] as const;

function spanFor(i: number) {
  const n = i % 8;
  if (n === 0) return "sm:col-span-2 sm:row-span-2";
  if (n === 3) return "sm:col-span-2";
  if (n === 5) return "sm:row-span-2";
  if (n === 6) return "lg:col-span-2";
  return "";
}

function GalleryPage() {
  const [active, setActive] = useState<(typeof GALLERY)[number] | null>(null);

  return (
    <main className="relative overflow-hidden px-4 py-14 text-center sm:px-6">
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
        Fluff & friends
      </h1>
      <p className="relative mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 text-muted">
        <Heart className="size-4 fill-pink text-pink" />
        A little scrapbook of real Barkly’s clients — bows, bandanas, and
        happy tails.
        <Heart className="size-4 fill-pink text-pink" />
      </p>

      <div className="relative mx-auto mt-12 grid max-w-6xl grid-cols-2 items-start gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 lg:gap-5">
        {GALLERY.map((photo, i) => {
          const tape = TAPES[i % TAPES.length];
          const rotate = ROTATES[i % ROTATES.length];
          return (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActive(photo)}
              className={cn(
                "group relative z-0 h-full w-full origin-center rounded-[1.35rem] bg-paper p-2 pb-9 text-left shadow-card ring-1 ring-line/70 transition-all duration-300 hover:z-20 hover:rotate-0 hover:-translate-y-1 hover:shadow-soft",
                rotate,
                spanFor(i),
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -top-2 left-1/2 z-10 h-4 w-11 -translate-x-1/2 rotate-6 rounded-[2px] opacity-80 shadow-sm",
                  tape,
                  i % 2 === 0 ? "-rotate-6" : "rotate-6",
                )}
              />
              <span className="block h-full min-h-[9.5rem] overflow-hidden rounded-[1rem] sm:min-h-[11rem]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </span>
              <span className="absolute inset-x-2 bottom-2 truncate text-center font-display text-[13px] italic text-navy sm:text-sm">
                {photo.name}
              </span>
            </button>
          );
        })}
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
            className="max-w-[min(92vw,40rem)] rotate-1 rounded-[1.6rem] bg-paper p-3 pb-12 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[72vh] w-full rounded-[1.15rem] object-contain"
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
