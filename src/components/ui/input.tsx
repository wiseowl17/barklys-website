import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-paper px-3.5 text-center text-sm text-ink placeholder:text-muted/80 outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/25 aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-center text-sm text-ink placeholder:text-muted/80 outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/25",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("mb-1.5 block text-center text-sm font-medium text-navy", className)}
      {...props}
    />
  );
}
