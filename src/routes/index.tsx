import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, Home, Scissors, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/hero-carousel";
import { GalleryPoliciesLinks } from "@/components/gallery-policies-links";
import { useCms } from "@/lib/cms-context";
import { cmsText } from "@/lib/cms";
import { pageHead } from "@/lib/seo";
import { REVIEWS, SERVICES, SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () =>
    pageHead({
      title: "Barkly's | Fear-Free Dog Grooming in Charlotte",
      description:
        "Fear-Free certified dog grooming, boarding, daycare, and dog sitting serving Charlotte NC, Tega Cay SC, Fort Mill SC, Ballantyne NC, Matthews NC, Belmont NC, and Gastonia NC.",
      path: "/",
    }),
});

const ICONS = {
  grooming: Scissors,
  baths: Sparkles,
  boarding: Home,
  daycare: HeartHandshake,
} as const;

function HomePage() {
  const { copy, hero } = useCms();

  return (
    <main className="text-center">
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-12 sm:px-6 lg:py-16">
          <h1 className="font-display text-4xl leading-[1.1] text-navy-deep sm:text-5xl lg:text-6xl">
            {cmsText(copy, "home.headline", "Groom, play, and stay at your dog’s pace")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {cmsText(
              copy,
              "home.subhead",
              "Barkly’s is a calm, home-based studio for dog grooming, boarding, daycare, and dog sitting. Every appointment is paced to your dog — especially the sensitive, senior, and first-time guests.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/book">Book an appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/grooming">See services</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            {cmsText(
              copy,
              "home.serving",
              "Serving Charlotte, Fort Mill, Tega Cay, and nearby towns · By appointment only",
            )}
          </p>
          <HeroCarousel slides={hero} />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
            What we do
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Groom. Play. Stay.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const Icon = ICONS[service.slug] ?? Scissors;
              return (
                <Link
                  key={service.slug}
                  to={service.href}
                  className="flex flex-col items-center rounded-xl border border-line bg-cream p-6 shadow-card transition-shadow hover:shadow-md"
                >
                  <Icon className="size-6 text-teal-deep" strokeWidth={1.75} />
                  <h3 className="mt-4 font-display text-xl">
                    {service.slug === "daycare" ? "Doggy Daycare" : service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.blurb}</p>
                </Link>
              );
            })}
          </div>
          <GalleryPoliciesLinks className="mx-auto mt-10 max-w-xl text-sm text-muted" />
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
          <p className="mt-3 text-sm text-muted">5.0 on Google from families who booked with Vanessa</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {REVIEWS.map((review) => (
              <blockquote
                key={review.name}
                className="rounded-xl border border-line bg-paper p-6 shadow-card"
              >
                <div className="mb-3 flex justify-center gap-0.5" aria-label="5 stars on Google">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed text-ink">“{review.quote}”</p>
                <footer className="mt-5 text-sm">
                  <span className="font-semibold text-navy">{review.name}</span>
                  <span className="text-muted"> · {review.area}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="outline">
              <a href={SITE.googleReviewsHref} target="_blank" rel="noreferrer">
                Read all reviews on Google
              </a>
            </Button>
            <Button asChild size="lg">
              <a href={SITE.googleReviewHref} target="_blank" rel="noreferrer">
                Leave a Google review
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl">
            {cmsText(copy, "home.cta_title", "Ready when your pup is")}
          </h2>
          <p className="max-w-xl text-sky">
            {cmsText(
              copy,
              "home.cta_body",
              "Pick a time that works. We’ll take it from there — coat notes, Fear-Free handling, and a calm visit for your pup.",
            )}
          </p>
          <Button
            asChild
            size="lg"
            variant="primary"
            className="bg-gold text-navy-deep hover:bg-gold/90"
          >
            <Link to="/book">Book an appointment</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
