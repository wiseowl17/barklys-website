import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Halloween season switch, shared by the seasonal logo and the decorations in
 * `@/components/halloween`.
 *
 * On Oct 1 through Nov 1 (studio time, America/New_York), off automatically
 * afterwards — no deploy needed to remove it. Never on /book or /admin.
 * `?halloween=1` forces it on (to preview out of season), `?halloween=0`
 * forces it off; either is remembered for the rest of the visit.
 *
 * Decided on the client after hydration, so a cached server render can never
 * leak the season early or late.
 */

const TIME_ZONE = "America/New_York";
const FORCE_KEY = "barklys-halloween-force";

function inSeason(now: Date): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  return month === 10 || (month === 11 && day === 1);
}

/** The `?halloween=1|0` override for this visit, or null when none is set. */
export function forcedHalloween(): boolean | null {
  try {
    const param = new URLSearchParams(window.location.search).get("halloween");
    if (param === "1" || param === "0") sessionStorage.setItem(FORCE_KEY, param);
    const value = param ?? sessionStorage.getItem(FORCE_KEY);
    if (value === "1") return true;
    if (value === "0") return false;
  } catch {
    // storage blocked — fall back to the calendar
  }
  return null;
}

export function useHalloween(): boolean {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [season, setSeason] = useState(false);

  useEffect(() => {
    setSeason(forcedHalloween() ?? inSeason(new Date()));
  }, []);

  if (pathname === "/book" || pathname.startsWith("/admin")) return false;
  return season;
}
