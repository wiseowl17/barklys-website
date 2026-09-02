import { createFileRoute, Link } from "@tanstack/react-router";
import { GalleryPoliciesLinks } from "@/components/gallery-policies-links";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "Meet Vanessa | Fear-Free Dog Groomer in Charlotte | Barkly's";
const DESCRIPTION =
  "Meet Vanessa Cordova, Fear Free certified professional dog groomer serving dogs in Charlotte NC, Tega Cay SC, Fort Mill SC, Ballantyne NC, Matthews NC, Belmont NC, and Gastonia NC.";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/about",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Meet the Groomer", path: "/about" },
      ]),
    }),
});

function AboutPage() {
  return (
    <main className="text-center">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
          Meet the groomer
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          The Fear-Free groomer behind Barkly’s
        </h1>

        <div className="relative mt-10 flex flex-col items-center">
          <div
            className="pointer-events-none absolute inset-x-8 -top-4 h-72 rounded-full bg-gold/25 blur-3xl sm:h-96"
            aria-hidden
          />
          <div className="relative size-56 rounded-full bg-gold p-1.5 shadow-soft sm:size-72">
            <div className="size-full rounded-full bg-navy p-1">
              <img
                src="/vanessa-headshot.jpg"
                alt="Vanessa Cordova, Fear Free certified professional groomer"
                className="size-full rounded-full object-cover object-[center_18%]"
              />
            </div>
          </div>
          <p className="relative mt-6 font-display text-3xl text-navy">Vanessa Cordova</p>
          <p className="relative mt-1 text-sm text-muted">
            Fear Free Certified Professional · Groomer
          </p>
        </div>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          Nearly two decades in animal care, a veterinary education from Venezuela, and five years
          as a professional dog groomer — with a Fear Free certification at the center of every
          appointment. Vanessa welcomes dogs from {SITE.area}.
        </p>
        <ul className="mt-8 w-full space-y-4 text-[15px] leading-relaxed text-ink">
          <li className="rounded-lg border border-line bg-paper px-4 py-3">
            Trained as a veterinary doctor in Venezuela
          </li>
          <li className="rounded-lg border border-line bg-paper px-4 py-3">
            Currently studying to revalidate her veterinary degree in the United States
          </li>
          <li className="rounded-lg border border-line bg-paper px-4 py-3">
            Professional groomer with 5 years of hands-on salon experience
          </li>
          <li className="rounded-lg border border-line bg-paper px-4 py-3">
            Special care for poodles, schnauzers, doodles, and small breeds — all breeds welcome
          </li>
        </ul>

        <figure className="mt-12 w-full overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
          <img
            src="/vanessa.jpg"
            alt="Vanessa with a golden retriever on the grooming table"
            className="mx-auto w-full object-cover"
          />
          <figcaption className="px-5 py-4 text-sm text-muted">
            In the studio — every appointment at the dog’s pace.
          </figcaption>
        </figure>
        <GalleryPoliciesLinks />
      </section>

      <section className="bg-paper">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl">Why Fear Free matters</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Fear Free is a science-based certification that trains professionals to recognize and
              reduce fear, anxiety, and stress in pets. It focuses on reading subtle body language,
              gentle positive handling, environmental adjustments, and desensitizing pets to
              grooming tools.
            </p>
            <p>
              The result is a calmer, safer experience for the dog and greater peace of mind for
              owners. At Barkly’s every appointment prioritizes your pet’s emotional well-being —
              the haircut never comes before the animal in the chair.
            </p>
            <p>
              If your dog needs extra time, breaks, or a slower introduction to the table, dryer, or
              clippers, that is the plan — not an inconvenience.
            </p>
          </div>
          <Button asChild className="mt-8">
            <Link to="/book">Book with Vanessa</Link>
          </Button>
          <p className="mt-6 text-sm text-muted">
            If Vanessa took good care of your pup,{" "}
            <a
              href={SITE.googleReviewHref}
              className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              leave a Google review
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
