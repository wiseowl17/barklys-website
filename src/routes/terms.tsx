import { createFileRoute, Link } from "@tanstack/react-router";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "Terms & Conditions | Barkly's";
const DESCRIPTION =
  "Appointment, cancellation, and studio terms for Barkly's Fear-Free grooming, boarding, and daycare in Charlotte, NC.";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/terms",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Terms", path: "/terms" },
      ]),
    }),
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-14 text-left sm:px-6">
      <p className="text-center text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        Legal
      </p>
      <h1 className="mt-3 text-center font-display text-4xl">Terms & conditions</h1>
      <p className="mt-3 text-center text-sm text-muted">Last updated September 14, 2026</p>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink">
        <p>
          By booking or using this website you agree to these terms for Barkly’s services in{" "}
          {SITE.area}.
        </p>
        <h2 className="font-display text-2xl">Appointments</h2>
        <p className="text-muted">
          Grooming times booked through Setmore are requests until confirmed. Boarding and
          daycare stays are request-only and must be accepted by us. {SITE.studioNote}
        </p>
        <h2 className="font-display text-2xl">Cancellations & no-shows</h2>
        <p className="text-muted">
          House rules — including the 2-day cancel window, 15-minute grooming grace period, and
          pick-up timing — are on our{" "}
          <Link to="/policies" className="text-teal-deep underline">
            policies
          </Link>{" "}
          page and are part of these terms.
        </p>
        <h2 className="font-display text-2xl">Pet care</h2>
        <p className="text-muted">
          Barkly’s is not a veterinary clinic. Dogs should be current on core vaccines and free
          of contagious illness. We use Fear-Free handling and may pause or stop a service if a
          dog is too stressed or unsafe to continue.
        </p>
        <h2 className="font-display text-2xl">Website</h2>
        <p className="text-muted">
          Content, prices, and availability may change. Photos are of real clients and may not
          represent every coat or breed. Optional analytics cookies are described in the{" "}
          <Link to="/privacy" className="text-teal-deep underline">
            privacy policy
          </Link>
          .
        </p>
        <h2 className="font-display text-2xl">Contact</h2>
        <p className="text-muted">
          {SITE.name}, {SITE.locality}
          <br />
          {SITE.phoneDisplay} · {SITE.email}
        </p>
      </div>
    </main>
  );
}
