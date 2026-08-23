import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-3 sm:px-6">
        <Link to="/" className="flex flex-col items-center" onClick={() => setOpen(false)}>
          <BrandLogo className="h-[4.75rem] w-auto sm:h-20" />
        </Link>

        <nav className="mt-2 hidden items-center justify-center gap-1 lg:flex">
          {NAV.filter((item) => item.to !== "/book").map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.to
                  ? "text-teal-deep"
                  : "text-navy/80 hover:text-navy",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link to="/book">Book appointment</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-md text-navy lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-cream px-4 py-4 text-center lg:hidden">
          <nav className="flex flex-col items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "w-full rounded-md px-3 py-3 text-base font-medium",
                  pathname === item.to ? "bg-sky/40 text-navy" : "text-navy",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
