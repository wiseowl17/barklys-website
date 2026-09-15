import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/site";
import type { GalleryItem } from "@/lib/cms";
import { cn } from "@/lib/utils";

export function HeroCarousel({ slides }: { slides?: readonly GalleryItem[] }) {
  const items = slides && slides.length > 0 ? slides : HERO_SLIDES;
  const signature = items.map((item) => item.src).join("|");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [signature]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || items.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [items.length]);

  function go(next: number) {
    setIndex((next + items.length) % items.length);
  }

  const slide = items[index] ?? items[0];
  if (!slide) return null;

  return (
    <div className="mt-10 w-full max-w-2xl">
      <div className="relative overflow-hidden rounded-2xl bg-cream-deep shadow-soft ring-1 ring-gold/30">
        <div className="relative aspect-[4/5] sm:aspect-[5/4]">
          {items.map((item, i) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-navy shadow-card"
              aria-label="Previous photo"
              onClick={() => go(index - 1)}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-navy shadow-card"
              aria-label="Next photo"
              onClick={() => go(index + 1)}
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}
      </div>

      <p className="mt-3 text-xs tracking-wide text-muted">{slide.name}</p>

      {items.length > 1 ? (
        <div className="mt-3 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Show ${item.name}`}
              aria-current={i === index}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === index ? "w-6 bg-teal" : "w-2.5 bg-sky",
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
