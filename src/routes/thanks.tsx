import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/thanks")({
  component: ThanksPage,
  head: () =>
    pageHead({
      title: "Thank you | Barkly's",
      description: "We received your request and will confirm as soon as we can.",
      path: "/thanks",
      noIndex: true,
    }),
});

function ThanksPage() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        Request received
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Thank you</h1>
      <p className="mt-4 text-muted">
        We’ll review availability and get back to you by phone or email to confirm. For a
        quicker reply, text us on WhatsApp or call {SITE.phoneDisplay}.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <a href={SITE.whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </main>
  );
}
