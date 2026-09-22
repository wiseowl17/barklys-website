import { useEffect, useState, type CSSProperties } from "react";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { forcedHalloween, useHalloween } from "@/lib/halloween";

/**
 * Seasonal Halloween decorations: a witch hat on the featured homepage
 * polaroid and a one-time drift of pumpkins, bats and leaves on the homepage.
 * The Halloween logo swap lives in `BrandLogo`. Season rules: `@/lib/halloween`.
 */

const DRIFT_SEEN_KEY = "barklys-halloween-drift-seen";

const ORANGE = "#E8893A";
const ORANGE_DEEP = "#C96A22";

/* ---------- artwork ---------- */

function Pumpkin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={className}>
      <path d="M20 9c0-3 1.5-5 4-6" stroke="#3D8296" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M21 8c3-2 7-1.5 8.5 1-3 1.5-6 1.2-8.5-1z" fill="#54A0B5" />
      <ellipse cx="13" cy="23" rx="9" ry="12" fill={ORANGE_DEEP} />
      <ellipse cx="27" cy="23" rx="9" ry="12" fill={ORANGE_DEEP} />
      <ellipse cx="20" cy="23" rx="9.5" ry="12.5" fill={ORANGE} />
      <path d="M15 20l2.4-3 2.4 3zM20.2 20l2.4-3 2.4 3z" fill="#1A3A4C" />
      <path d="M14.5 26c2.5 2.6 8.5 2.6 11 0" stroke="#1A3A4C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Bat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" aria-hidden className={className}>
      <path
        d="M24 8c-1.5-3-4-3.5-4-3.5l1.2 3.6C17 5 11 4 4 6c3 1.5 4 4 3.5 7 2-1.5 4.5-1.5 6 0 1-2 3.5-2.5 5.5-1 1 3 3 5 5 6.5 2-1.5 4-3.5 5-6.5 2-1.5 4.5-1 5.5 1 1.5-1.5 4-1.5 6 0-.5-3 .5-5.5 3.5-7-7-2-13-1-17.2 2.1L28 4.5S25.5 5 24 8z"
        fill="#2C5A71"
      />
      <circle cx="22.3" cy="10.6" r="0.9" fill="#F5B0CB" />
      <circle cx="25.7" cy="10.6" r="0.9" fill="#F5B0CB" />
    </svg>
  );
}

function Leaf({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path d="M16 3c6 4 11 9 11 15 0 5-4.5 9-11 9S5 23 5 18C5 12 10 7 16 3z" fill={color} />
      <path d="M16 7v22" stroke="#FBF7F0" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function WitchHat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" aria-hidden className={className}>
      <path d="M14 42C22 30 26 14 38 4c1 10 3 22 10 36z" fill="#1A3A4C" />
      <path d="M38 4c-2 3-3 5-3 5" stroke="#2C5A71" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="32" cy="44" rx="30" ry="8" fill="#1A3A4C" />
      <path d="M17.5 37c9 3.5 21 3.5 29.5 0l1.5 4.5c-10 3.5-22 3.5-32 0z" fill="#E4B77C" />
      <rect x="28" y="36.5" width="8" height="7" rx="1.2" fill="none" stroke="#F5B0CB" strokeWidth="1.8" />
    </svg>
  );
}

/* ---------- placements ---------- */

/** Witch hat "sticker" on the featured polaroid's top-right corner. */
export function HalloweenPolaroidHat({ className }: { className?: string }) {
  const on = useHalloween();
  if (!on) return null;
  return (
    <WitchHat
      className={cn(
        "pointer-events-none absolute -top-9 -right-5 z-20 w-24 rotate-[18deg] drop-shadow-md sm:-top-11 sm:-right-7 sm:w-28",
        className,
      )}
    />
  );
}

type DriftItem = {
  kind: "pumpkin" | "bat" | "leaf-gold" | "leaf-orange" | "leaf-pink";
  left: number;
  size: number;
  delay: number;
  duration: number;
  sway: number;
};

const DRIFT: DriftItem[] = [
  { kind: "leaf-gold", left: 6, size: 26, delay: 0, duration: 6.2, sway: 30 },
  { kind: "bat", left: 18, size: 44, delay: 0.6, duration: 5.4, sway: -40 },
  { kind: "pumpkin", left: 30, size: 30, delay: 1.4, duration: 6.4, sway: 20 },
  { kind: "leaf-orange", left: 43, size: 24, delay: 0.3, duration: 5.8, sway: -26 },
  { kind: "leaf-pink", left: 55, size: 22, delay: 1.9, duration: 5.6, sway: 34 },
  { kind: "bat", left: 67, size: 38, delay: 1.1, duration: 5.2, sway: 42 },
  { kind: "leaf-gold", left: 78, size: 28, delay: 2.4, duration: 5.9, sway: -30 },
  { kind: "pumpkin", left: 88, size: 28, delay: 0.8, duration: 6.6, sway: -18 },
  { kind: "leaf-orange", left: 94, size: 22, delay: 2.9, duration: 5.3, sway: 24 },
  { kind: "leaf-gold", left: 36, size: 20, delay: 3.2, duration: 5.2, sway: 28 },
];

function DriftArt({ kind }: { kind: DriftItem["kind"] }) {
  if (kind === "pumpkin") return <Pumpkin className="block size-full" />;
  if (kind === "bat") return <Bat className="block size-full" />;
  const color = kind === "leaf-gold" ? "#E4B77C" : kind === "leaf-orange" ? ORANGE : "#F5B0CB";
  return <Leaf className="block size-full" color={color} />;
}

/**
 * One gentle drift down the homepage, once per visit. Sits under the header,
 * mobile booking bar, WhatsApp bubble and cookie banner, and never takes
 * clicks. Skipped entirely for visitors who prefer reduced motion.
 */
export function HalloweenDrift() {
  const on = useHalloween();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!on || pathname !== "/") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem(DRIFT_SEEN_KEY) && forcedHalloween() !== true) return;
      sessionStorage.setItem(DRIFT_SEEN_KEY, "1");
    } catch {
      // storage blocked — still play once for this page view
    }
    setPlay(true);
    const done = setTimeout(() => setPlay(false), 10_000);
    return () => {
      clearTimeout(done);
      setPlay(false);
    };
  }, [on, pathname]);

  if (!play) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {DRIFT.map((item, i) => (
        <span
          key={i}
          className="halloween-drift absolute -top-16"
          style={
            {
              left: `${item.left}%`,
              width: item.size,
              height: item.size,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              "--sway": `${item.sway}px`,
            } as CSSProperties
          }
        >
          <DriftArt kind={item.kind} />
        </span>
      ))}
    </div>
  );
}
