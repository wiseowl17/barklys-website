import { Link, useRouterState } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

const HIDDEN = new Set(["/book", "/thanks"]);

export function MobileCta() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (HIDDEN.has(pathname)) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-3 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={SITE.phoneHref}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-line bg-paper text-sm font-semibold text-navy"
        >
          Call
        </a>
        <Link
          to="/book"
          className="inline-flex h-11 flex-[1.4] items-center justify-center rounded-full bg-teal text-sm font-semibold text-paper"
        >
          Book appointment
        </Link>
      </div>
    </div>
  );
}
