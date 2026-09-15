import { useState } from "react";
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

function BookPage() {
  const { site } = useCms();
  const [frameReady, setFrameReady] = useState(false);

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-14 text-center sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        Grooming
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Book grooming</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        Pick a service and time below — it takes less than a minute. We’ll follow up if we need
        anything for a calm, Fear-Free visit.
      </p>

      <p className="mt-4 max-w-xl rounded-xl border border-line bg-cream-deep px-4 py-3 text-sm text-muted">
        Looking for overnight boarding or daycare?{" "}
        <Link
          to="/boarding"
          className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
        >
          Request boarding or daycare here
        </Link>
        .
      </p>
      <GalleryPoliciesLinks />

      <div className="relative mt-10 w-full overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
        {!frameReady ? (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-cream-deep"
            role="status"
          >
            <span className="size-10 animate-spin rounded-full border-2 border-sky border-t-teal-deep" />
            <p className="text-sm text-muted">Loading the booking calendar…</p>
          </div>
        ) : null}
        <iframe
          title="Book a grooming appointment with Barkly's"
          src={SQUARE_WIDGET}
          allow="payment"
          className="h-[820px] w-full border-0"
          onLoad={() => setFrameReady(true)}
        />
      </div>

      <p className="mt-4 text-sm text-muted">
        Having trouble with the calendar?{" "}
        <a
          href={SQUARE_BOOK}
          className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          Open booking in a new tab
        </a>
        .
      </p>

      <dl className="mt-10 space-y-3 text-sm">
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
      <p className="mt-8 rounded-lg border border-line bg-cream-deep p-4 text-sm text-muted">
        Home-based studio. The exact address is shared only after your
        appointment is confirmed.
      </p>
    </main>
  );
}
