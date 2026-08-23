import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, Home, Scissors, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REVIEWS, SERVICES } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Barkly's | Fear-Free Grooming in Charlotte" },
      {
        name: "description",
        content:
          "Fear-Free certified grooming, boarding, and daycare serving Charlotte, Fort Mill, and Tega Cay.",
      },
    ],
  }),
});

const ICONS = [Scissors, Sparkles, Home, HeartHandshake];

function HomePage() {
  return (
    <main className="text-center">
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-12 sm:px-6 lg:py-16">
          <p className="inline-flex items-center gap-2 rounded-full bg-sky/40 px-3 py-1 text-xs font-semibold tracking-wide text-navy uppercase">
            <ShieldCheck className="size-3.5" />
            Fear Free Certified Professional
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.1] text-navy-deep sm:text-5xl lg:text-6xl">
            Fear-Free grooming in the Charlotte area
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Barkly’s is a calm, home-based studio for grooming, boarding, and
            daycare. Every appointment is paced to your dog — especially the
            sensitive, senior, and first-time guests.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/book">Book an appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">See services</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Serving Charlotte, Fort Mill, Tega Cay, and nearby towns · By
            appointment only
          </p>
          <div className="mt-10 w-full max-w-xl overflow-hidden rounded-2xl shadow-soft ring-1 ring-gold/30">
            <img
              src="/images/hero-angel.jpg"
              alt="Angel, a freshly groomed Australian Shepherd wearing a blue bandana"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
            />
          </div>
          <p className="mt-3 text-xs tracking-wide text-muted">
            Fresh from the table — and still smiling.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
            What we do
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            Groom. Play. Stay.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[i] ?? Scissors;
              return (
                <article
                  key={service.slug}
                  className="flex flex-col items-center rounded-xl border border-line bg-cream p-6 shadow-card"
                >
                  <Icon className="size-6 text-teal-deep" strokeWidth={1.75} />
                  <h3 className="mt-4 font-display text-xl">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.blurb}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
            Kind words
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            Families in Charlotte already trust us
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {REVIEWS.map((review) => (
              <blockquote
                key={review.name}
                className="rounded-xl border border-line bg-paper p-6 shadow-card"
              >
                <p className="text-[15px] leading-relaxed text-ink">
                  “{review.quote}”
                </p>
                <footer className="mt-5 text-sm">
                  <span className="font-semibold text-navy">{review.name}</span>
                  <span className="text-muted"> · {review.area}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl">Ready when your pup is</h2>
          <p className="max-w-xl text-sky">
            Requests are reviewed personally. We’ll confirm timing, coat notes,
            and anything your dog needs to feel safe.
          </p>
          <Button asChild size="lg" variant="primary" className="bg-gold text-navy-deep hover:bg-gold/90">
            <Link to="/book">Request a booking</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
