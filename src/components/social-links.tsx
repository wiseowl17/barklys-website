import { Instagram } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 2.75 15.3a6.34 6.34 0 0 0 10.92 4.39 6.3 6.3 0 0 0 1.86-4.5V8.77a8.18 8.18 0 0 0 4.77 1.52V6.84a4.84 4.84 0 0 1-.71-.15z" />
    </svg>
  );
}

export function SocialLinks({
  className,
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "paper";
}) {
  const link = cn(
    "inline-flex size-10 items-center justify-center rounded-full transition-colors",
    tone === "paper"
      ? "bg-paper/10 text-sky hover:bg-paper/20 hover:text-paper"
      : "bg-sky/35 text-navy hover:bg-pink/50 hover:text-navy-deep",
  );

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <a
        href={SITE.instagram}
        className={link}
        target="_blank"
        rel="noreferrer"
        aria-label={`Instagram ${SITE.handle}`}
      >
        <Instagram className="size-5" strokeWidth={1.75} />
      </a>
      <a
        href={SITE.tiktok}
        className={link}
        target="_blank"
        rel="noreferrer"
        aria-label={`TikTok ${SITE.handle}`}
      >
        <TikTokIcon className="size-5" />
      </a>
    </div>
  );
}
