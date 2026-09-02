import { Link } from "@tanstack/react-router";
import { navLinks, SERVICE_AREAS, SITE } from "@/lib/site";
import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-navy text-center text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col items-center">
          <BrandLogo decorative className="mx-auto mb-4 h-28 w-auto drop-shadow-md" />
          <p className="mt-2 text-sm font-medium text-paper">Barkly’s Grooming & Boarding</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sky">
            Fear-Free dog grooming, boarding, daycare, and dog sitting for {SITE.area}. Home-based
            studio. Open {SITE.hoursDisplay}.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks().map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sky hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-sky">
            <li>
              <a href={SITE.phoneHref} className="hover:text-paper">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-paper">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.googleReviewHref}
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
            Serving {SITE.area}. Exact studio address is shared after your appointment is confirmed.
          </p>
        </div>
      </div>
      <div className="border-t border-paper/10 py-5 text-xs text-sky/80">
        © {new Date().getFullYear()} Barkly’s. All rights reserved.
      </div>
    </footer>
  );
}
