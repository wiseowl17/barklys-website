import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "Privacy Policy | Barkly's";
const DESCRIPTION =
  "How Barkly's collects and uses information from website visitors and clients in the Charlotte area.";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/privacy",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Privacy", path: "/privacy" },
      ]),
    }),
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-14 text-left sm:px-6">
      <p className="text-center text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        Legal
      </p>
      <h1 className="mt-3 text-center font-display text-4xl">Privacy policy</h1>
      <p className="mt-3 text-center text-sm text-muted">Last updated September 14, 2026</p>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink">
        <p>
          Barkly’s (“we”) is a home-based dog grooming, boarding, and daycare studio serving{" "}
          {SITE.area}. This page explains what we collect when you use{" "}
          <a className="text-teal-deep underline" href="https://www.barklysclt.com">
            barklysclt.com
          </a>
          .
        </p>
        <h2 className="font-display text-2xl">What we collect</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted">
          <li>Booking details you submit (name, phone, email, pet info, dates) via Setmore or our request form.</li>
          <li>Messages you send by email, phone, or WhatsApp.</li>
          <li>Optional analytics cookies (Google Analytics) only if you accept them on the cookie banner.</li>
        </ul>
        <h2 className="font-display text-2xl">How we use it</h2>
        <p className="text-muted">
          We use your information to confirm appointments, care for your dog, follow up on
          requests, and — if you opt in — understand how the website is used. We do not sell
          personal information.
        </p>
        <h2 className="font-display text-2xl">Processors</h2>
        <p className="text-muted">
          Setmore handles grooming bookings. FormSubmit delivers boarding
          requests to our email. Google Analytics runs only after you accept cookies. WhatsApp
          is used if you choose to chat with us there.
        </p>
        <h2 className="font-display text-2xl">Studio address</h2>
        <p className="text-muted">{SITE.studioNote}</p>
        <h2 className="font-display text-2xl">Your choices</h2>
        <p className="text-muted">
          Decline analytics cookies on the banner, or email {SITE.email} to update or delete
          client records we hold for scheduling.
        </p>
        <h2 className="font-display text-2xl">Contact</h2>
        <p className="text-muted">
          {SITE.name}
          <br />
          {SITE.locality}
          <br />
          <a className="text-teal-deep underline" href={SITE.phoneHref}>
            {SITE.phoneDisplay}
          </a>
          <br />
          <a className="text-teal-deep underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </p>
      </div>
    </main>
  );
}
