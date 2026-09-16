import { createFileRoute, Link } from "@tanstack/react-router";
import { GalleryPoliciesLinks } from "@/components/gallery-policies-links";
import { Button } from "@/components/ui/button";
import { useCms } from "@/lib/cms-context";
import { cmsText } from "@/lib/cms";
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
  const { copy } = useCms();
  const bullets = [
    cmsText(copy, "about.bullet_1", "Trained as a veterinary doctor in Venezuela"),
    cmsText(
      copy,
      "about.bullet_2",
      "Currently studying to revalidate her veterinary degree in the United States",
    ),
    cmsText(
      copy,
      "about.bullet_3",
      "Professional groomer with 5 years of hands-on salon experience",
    ),
    cmsText(
      copy,
      "about.bullet_4",
      "Special care for poodles, schnauzers, doodles, and small breeds — all breeds welcome",
    ),
  ];

  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
            Meet the groomer
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            {cmsText(copy, "about.headline", "The Fear-Free groomer behind Barkly’s")}
          </h1>
        </header>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <figure className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
            <img
              src="/vanessa-headshot.jpg"
              alt="Vanessa Cordova, Fear Free certified professional groomer at Barkly’s"
              width={960}
              height={1344}
              className="block h-auto w-full rounded-2xl shadow-card"
              decoding="async"
              fetchPriority="high"
            />
          </figure>
          <div className="text-center lg:text-left">
            <p className="font-display text-3xl text-navy sm:text-4xl">Vanessa Cordova</p>
            <p className="mt-1 text-sm text-muted">
              Fear Free Certified Professional · Groomer
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {cmsText(
                copy,
                "about.intro",
                "Nearly two decades in animal care, a veterinary education from Venezuela, and five years as a professional dog groomer — with a Fear Free certification at the center of every appointment. Vanessa welcomes dogs from the greater Charlotte area and nearby towns.",
              )}
            </p>
            <ul className="mt-8 space-y-3 text-[15px] leading-relaxed text-ink">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-line bg-paper px-4 py-3 lg:text-left"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="mt-16">
          <img
            src="/vanessa-studio.jpg"
            alt="Vanessa at the Barkly’s grooming table with scissors, clippers, and brushes ready"
            width={1600}
            height={1143}
            className="block h-auto w-full rounded-2xl shadow-card"
            decoding="async"
          />
          <figcaption className="mt-4 text-center text-sm text-muted">
            The home studio — calm, equipped, and ready when your pup is.
          </figcaption>
        </figure>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <figure className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
            <img
              src="/shoot/vanessa-table-groom.svg"
              alt="Vanessa gently grooming a small white dog on the table"
              width={480}
              height={719}
              className="block h-auto w-full rounded-2xl shadow-card"
              decoding="async"
            />
            <figcaption className="mt-4 text-center text-sm text-muted lg:text-left">
              In the studio — every appointment at the dog’s pace.
            </figcaption>
          </figure>
          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl">Why Fear Free matters</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                Fear Free is a science-based certification that trains professionals to recognize
                and reduce fear, anxiety, and stress in pets. It focuses on reading subtle body
                language, gentle positive handling, environmental adjustments, and desensitizing
                pets to grooming tools.
              </p>
              <p>
                The result is a calmer, safer experience for the dog and greater peace of mind for
                owners. At Barkly’s every appointment prioritizes your pet’s emotional well-being —
                the haircut never comes before the animal in the chair.
              </p>
              <p>
                If your dog needs extra time, breaks, or a slower introduction to the table, dryer,
                or clippers, that is the plan — not an inconvenience.
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
        </div>
        <GalleryPoliciesLinks className="mx-auto mt-12 max-w-xl text-center text-sm text-muted" />
      </section>
    </main>
  );
}
