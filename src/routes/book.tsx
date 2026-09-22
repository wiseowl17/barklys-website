import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { breadcrumbJsonLd, pageHead, serviceJsonLd } from "@/lib/seo";
import { useCms } from "@/lib/cms-context";
import { GalleryPoliciesLinks } from "@/components/gallery-policies-links";
import { SocialLinks } from "@/components/social-links";

const TITLE = "Book Dog Grooming in Charlotte NC | Barkly's";
const DESCRIPTION =
  "Book a Fear-Free dog grooming appointment online in seconds — serving Charlotte NC, Tega Cay SC, Fort Mill SC, Ballantyne NC, Matthews NC, Belmont NC & Gastonia NC. Boarding and daycare by request.";

export const Route = createFileRoute("/book")({
  component: BookPage,
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/book",
      jsonLd: [
        serviceJsonLd({
          name: "Book dog grooming",
          description: DESCRIPTION,
          path: "/book",
          serviceType: "Pet grooming appointment",
        }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book", path: "/book" },
        ]),
      ],
    }),
});

const SQUARE_WIDGET =
  "https://app.squareup.com/appointments/buyer/widget/d5mbi8xeslrg3x/LFEEJ4985GGP9";
const SQUARE_BOOK =
  "https://app.squareup.com/appointments/book/d5mbi8xeslrg3x/LFEEJ4985GGP9/start";
const SETMORE_BOOKING_URL = "https://barklysclt.setmore.com";
/**
 * Booking provider toggle. Square's widget code above is kept intact (not
 * deleted) so this can be flipped back with one change if Setmore doesn't
 * work out. Setmore's booking page embeds directly as an iframe (confirmed:
 * no X-Frame-Options header, no frame-ancestors CSP directive), so it reuses
 * the same iframe/loading-spinner treatment Square used — no separate widget
 * script needed.
 */
const USE_SETMORE = true;

function BookPage() {
  const { site } = useCms();
  const [frameReady, setFrameReady] = useState(false);
  const [frameMounted, setFrameMounted] = useState(false);

  useEffect(() => {
    // Mount the iframe after hydration. Cross-origin load events are easy to
    // miss on an SSR'd iframe (the document can finish before React attaches
    // onLoad, and Strict Mode remounts skip a second load), which would leave
    // the spinner overlay stuck on top of a fully-loaded calendar.
    setFrameMounted(true);
  }, []);

  return (
    <main className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col items-center px-0 text-center lg:px-6 lg:py-14">
      <div className="w-full shrink-0 px-4 pt-5 pb-3 sm:px-6 lg:px-0 lg:pt-0 lg:pb-0">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
          Grooming
        </p>
        <h1 className="mt-2 font-display text-3xl sm:mt-3 sm:text-4xl lg:text-5xl">Book grooming</h1>
        <p className="mt-3 hidden max-w-xl mx-auto leading-relaxed text-muted sm:block lg:mt-4">
          Pick a service and time below — it takes less than a minute. We’ll follow up if we need
          anything for a calm, Fear-Free visit.
        </p>

        <p className="mt-3 max-w-xl mx-auto rounded-xl border border-line bg-cream-deep px-4 py-3 text-sm text-muted lg:mt-4">
          Looking for overnight boarding or daycare?{" "}
          <Link
            to="/boarding"
            className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
          >
            Request boarding or daycare here
          </Link>
          .
        </p>
        <div className="hidden sm:block">
          <GalleryPoliciesLinks />
        </div>
        <p className="mt-2 text-sm text-muted lg:hidden">
          Having trouble?{" "}
          <a
            href={USE_SETMORE ? SETMORE_BOOKING_URL : SQUARE_BOOK}
            className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            Open booking in a new tab
          </a>
        </p>
      </div>

      <div className="relative min-h-[28rem] w-full flex-1 overflow-auto overscroll-contain [-webkit-overflow-scrolling:touch] bg-paper sm:mt-4 lg:mt-10 lg:min-h-[820px] lg:flex-none lg:overflow-hidden lg:rounded-2xl lg:border lg:border-line lg:shadow-soft">
        {!frameReady ? (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-cream-deep"
            role="status"
          >
            <span className="size-10 animate-spin rounded-full border-2 border-sky border-t-teal-deep" />
            <p className="text-sm text-muted">Loading the booking calendar…</p>
          </div>
        ) : null}
        {frameMounted ? (
          <iframe
            title="Book a grooming appointment with Barkly's"
            src={USE_SETMORE ? SETMORE_BOOKING_URL : SQUARE_WIDGET}
            allow="payment"
            className="absolute inset-0 h-full w-full border-0"
            onLoad={() => setFrameReady(true)}
          />
        ) : null}
      </div>

      <p className="mt-4 hidden shrink-0 px-4 text-sm text-muted lg:block lg:px-0">
        Having trouble with the calendar?{" "}
        <a
          href={USE_SETMORE ? SETMORE_BOOKING_URL : SQUARE_BOOK}
          className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          Open booking in a new tab
        </a>
        .
      </p>

      <dl className="mt-10 hidden w-full space-y-3 px-4 text-sm lg:block lg:px-0">
        <div>
          <dt className="text-muted">Phone</dt>
          <dd>
            <a className="font-medium text-navy" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Email</dt>
          <dd>
            <a className="font-medium text-navy" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Social</dt>
          <dd className="mt-2">
            <SocialLinks />
          </dd>
        </div>
      </dl>
      <p className="mt-8 hidden rounded-lg border border-line bg-cream-deep p-4 text-sm text-muted lg:block">
        Home-based studio. The exact address is shared only after your
        appointment is confirmed.
      </p>
    </main>
  );
}
