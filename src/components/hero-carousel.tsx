import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const slides = HERO_SLIDES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  function go(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  const slide = slides[index];

  return (
    <div className="mt-10 w-full max-w-2xl">
      <div className="relative overflow-hidden rounded-2xl bg-cream-deep shadow-soft ring-1 ring-gold/30">
        <div className="relative aspect-[4/5] sm:aspect-[5/4]">
          {slides.map((item, i) => (
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
      </div>

      <p className="mt-3 text-xs tracking-wide text-muted">{slide.name}</p>

      <div className="mt-3 flex justify-center gap-2">
        {slides.map((item, i) => (
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
    </div>
  );
}
