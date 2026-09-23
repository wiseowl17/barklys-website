import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { navLinks, SERVICE_AREAS } from "@/lib/site";
import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";
import { useCms } from "@/lib/cms-context";

export function Footer() {
  const { site } = useCms();

  return (
    <footer className="mt-auto border-t border-line bg-navy text-center text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col items-center">
          <BrandLogo decorative className="mx-auto mb-4 h-28 w-auto drop-shadow-md" />
          <p className="mt-2 text-sm font-medium text-paper">Barkly’s Grooming & Boarding</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sky">
            Fear-Free dog grooming, boarding, and daycare for {site.area}. {site.studioNote} Open{" "}
            {site.hoursDisplay}.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks().map((item) => (
              <Fragment key={item.to}>
                <li>
                  <Link to={item.to} className="text-sky hover:text-paper">
                    {item.label}
                  </Link>
                </li>
                {item.to === "/boarding" ? (
                  <li>
                    <Link to="/grooming" hash="house-visits" className="text-sky hover:text-paper">
                      House visits
                    </Link>
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-sky">
            <li>Charlotte, NC</li>
            <li>
              <a href={site.phoneHref} className="hover:text-paper">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-paper">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJs8QZe9U3T2oRHlr8iUjUr0M"
                className="hover:text-paper"
                target="_blank"
                rel="noreferrer"
              >
                Leave a Google review
              </a>
            </li>
          </ul>
          <SocialLinks tone="paper" className="mt-5" />
          <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-gold uppercase">
            Service areas
          </p>
          <ul className="mt-3 flex max-w-xs flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-sky/90">
            {SERVICE_AREAS.map((area) => (
              <li key={`${area.name}-${area.state}`}>
                {area.name} {area.state}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-sky/80">
            Serving {site.area}.
          </p>
        </div>
      </div>
      <div className="border-t border-paper/10 py-5 text-xs text-sky/80">
        <p>© {new Date().getFullYear()} Barkly’s. All rights reserved.</p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link to="/privacy" className="hover:text-paper">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-paper">
            Terms
          </Link>
          <Link to="/policies" className="hover:text-paper">
            Policies & FAQ
          </Link>
        </p>
      </div>
    </footer>
  );
}
