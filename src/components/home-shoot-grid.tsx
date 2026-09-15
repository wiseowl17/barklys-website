import { HOME_SHOOT } from "@/lib/site";
import { cn } from "@/lib/utils";

const TAPES = ["bg-pink", "bg-gold", "bg-sky", "bg-teal"] as const;

export function HomeShootGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
      {HOME_SHOOT.map((photo, i) => {
        const tape = TAPES[i % TAPES.length];
        const last = i === HOME_SHOOT.length - 1;
        return (
          <figure
            key={photo.src}
            className={cn(
              "relative rounded-[1.35rem] bg-paper p-2.5 pb-3 shadow-card ring-1 ring-line/70 transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft",
              last && "col-span-2 mx-auto w-full max-w-[16.5rem] sm:col-span-1 sm:col-start-2 sm:max-w-none",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute -top-2 left-1/2 z-10 h-4 w-11 -translate-x-1/2 rounded-[2px] opacity-80 shadow-sm",
                tape,
                i % 2 === 0 ? "-rotate-6" : "rotate-6",
              )}
            />
            <span className="relative block aspect-[4/5] overflow-hidden rounded-[1rem] bg-cream-deep">
              <img
                src={photo.src}
                alt={photo.alt}
                width={1000}
                height={1400}
                className="h-full w-full object-cover object-[center_18%]"
                decoding={i === 0 ? "sync" : "async"}
                fetchPriority={i === 0 ? "high" : "low"}
              />
            </span>
            <figcaption className="mt-2.5 text-center font-display text-[13px] italic text-navy sm:text-sm">
              {photo.name}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
