import { cn } from "@/lib/utils";

export function FearFreeBadge({
  className,
}: {
  className?: string;
}) {
  return (
    <img
      src="/fear-free-certified.png"
      alt="Fear Free Certified Professional"
      className={cn("h-auto w-40 object-contain", className)}
    />
  );
}
