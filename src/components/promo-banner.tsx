import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function PromoBanner() {
  return (
    <div className="bg-pink px-4 py-2.5 text-center text-sm font-medium text-navy">
      <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <Sparkles className="size-4 shrink-0" strokeWidth={2} />
        <span>
          Touch-ups are <strong>$10 less</strong> than a full groom — bath
          included.
        </span>
        <Link
          to="/services"
          className="underline decoration-navy/40 underline-offset-2 hover:decoration-navy"
        >
          See prices
        </Link>
      </p>
    </div>
  );
}
