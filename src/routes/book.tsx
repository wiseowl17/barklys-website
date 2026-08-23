import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/book")({
  component: BookPage,
  head: () => ({
    meta: [{ title: "Book an Appointment | Barkly's" }],
  }),
});

const TUFT_SRC = "https://widget.tuftapp.com/index.html?groomer_id=7105";

function BookPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-14 text-center sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        By appointment
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Book with us</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        Choose a service and time below. We’ll follow up with anything we need
        for a calm, Fear-Free visit.
      </p>

      <div className="mt-10 w-full overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
        <iframe
          title="Book an appointment with Barkly's"
          src={TUFT_SRC}
          height={750}
          className="w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="mt-4 text-sm text-muted">
        Having trouble with the calendar?{" "}
        <a
          href={TUFT_SRC}
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
            <a className="font-medium text-navy" href={SITE.phoneHref}>
              {SITE.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Email</dt>
          <dd>
            <a className="font-medium text-navy" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Social</dt>
          <dd className="font-medium text-navy">
            Instagram & TikTok {SITE.handle}
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
