import { HOME_SHOOT } from "@/lib/site";
import { cn } from "@/lib/utils";

const TAPES = ["bg-pink", "bg-gold", "bg-sky", "bg-teal"] as const;

function Polaroid({
  photo,
  tape,
  rotate,
  featured = false,
  priority = false,
}: {
  photo: (typeof HOME_SHOOT)[number];
  tape: (typeof TAPES)[number];
  rotate: string;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <figure
      className={cn(
        "relative rounded-[1.35rem] bg-paper shadow-card ring-1 ring-line/70 transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft",
        featured ? "p-3 pb-4 sm:p-3.5 sm:pb-5" : "p-2.5 pb-3",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute -top-2 left-1/2 z-10 -translate-x-1/2 rounded-[2px] opacity-80 shadow-sm",
          featured ? "h-5 w-14" : "h-4 w-11",
          tape,
          rotate,
        )}
      />
      <span className="relative block aspect-[4/5] overflow-hidden rounded-[1rem] bg-cream-deep">
        <img
          src={photo.src}
          alt={photo.alt}
          width={1000}
          height={1400}
          className="h-full w-full object-cover object-[center_18%]"
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "low"}
        />
      </span>
      <figcaption
        className={cn(
          "mt-2.5 text-center font-display italic text-navy",
          featured ? "text-base sm:text-lg" : "text-[13px] sm:text-sm",
        )}
      >
        {photo.name}
      </figcaption>
    </figure>
  );
}

export function HomeShootGrid() {
  const [featured, ...rest] = HOME_SHOOT;

  return (
    <div>
      <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <Polaroid
          photo={featured}
          tape={TAPES[0]}
          rotate="-rotate-3"
          featured
          priority
        />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-5">
        {rest.map((photo, i) => (
          <Polaroid
            key={photo.src}
            photo={photo}
            tape={TAPES[(i + 1) % TAPES.length]}
            rotate={i % 2 === 0 ? "rotate-6" : "-rotate-6"}
          />
        ))}
      </div>
    </div>
  );
}
