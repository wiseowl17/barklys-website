import { cn } from "@/lib/utils";
import { useHalloween } from "@/lib/halloween";

export function BrandLogo({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  const halloween = useHalloween();
  return (
    <img
      src={halloween ? "/logo-halloween.png" : "/logo.png"}
      alt={decorative ? "" : "Barkly's — Groom, Play & Stay"}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
