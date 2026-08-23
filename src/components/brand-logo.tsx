import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <img
      src="/logo.png"
      alt={decorative ? "" : "Barkly's — Groom, Play & Stay"}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
