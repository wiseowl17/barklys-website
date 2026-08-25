import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV, type NavItem } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

function hasChildren(
  item: NavItem,
): item is { label: string; children: readonly { to: string; label: string }[] } {
  return "children" in item;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const servicesActive =
    pathname === "/grooming" ||
    pathname === "/boarding" ||
    pathname === "/services";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-3 sm:px-6">
        <Link to="/" className="flex flex-col items-center" onClick={() => setOpen(false)}>
          <BrandLogo className="h-[4.75rem] w-auto sm:h-20" />
        </Link>

        <nav className="mt-2 hidden items-center justify-center gap-1 lg:flex">
          {NAV.filter((item) => !("to" in item && item.to === "/book")).map(
            (item) => {
              if (hasChildren(item)) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        servicesActive
                          ? "text-teal-deep"
                          : "text-navy/80 hover:text-navy",
                      )}
                      onClick={() => setServicesOpen((v) => !v)}
                      onBlur={(e) => {
                        if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                          setServicesOpen(false);
                        }
                      }}
                      aria-expanded={servicesOpen}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform",
                          servicesOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {servicesOpen ? (
                      <div className="absolute left-1/2 top-full z-50 mt-1 min-w-[10rem] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-paper py-1 shadow-card">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setServicesOpen(false)}
                            className={cn(
                              "block px-4 py-2.5 text-sm font-medium transition-colors",
                              isActivePath(pathname, child.to)
                                ? "bg-sky/35 text-teal-deep"
                                : "text-navy/80 hover:bg-cream hover:text-navy",
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActivePath(pathname, item.to)
                      ? "text-teal-deep"
                      : "text-navy/80 hover:text-navy",
                  )}
                >
                  {item.label}
                </Link>
              );
            },
          )}
          <Button asChild size="sm" className="ml-2">
            <Link to="/book">Book appointment</Link>
          </Button>
          <SocialLinks className="ml-2" />
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
            {NAV.map((item) => {
              if (hasChildren(item)) {
                return (
                  <div key={item.label} className="w-full">
                    <p className="px-3 py-2 text-xs font-semibold tracking-[0.15em] text-muted uppercase">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block w-full rounded-md px-3 py-3 text-base font-medium",
                          isActivePath(pathname, child.to)
                            ? "bg-sky/40 text-navy"
                            : "text-navy",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "w-full rounded-md px-3 py-3 text-base font-medium",
                    isActivePath(pathname, item.to)
                      ? "bg-sky/40 text-navy"
                      : "text-navy",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <SocialLinks className="mt-3" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
