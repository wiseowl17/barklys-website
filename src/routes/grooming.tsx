import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Scissors } from "lucide-react";
import { FaqSection } from "@/components/faq-section";
import { GalleryPoliciesLinks } from "@/components/gallery-policies-links";
import { HouseVisitSection } from "@/components/house-visit";
import { Button } from "@/components/ui/button";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  pageHead,
  serviceJsonLd,
  type FaqItem,
} from "@/lib/seo";
import { useCms } from "@/lib/cms-context";
import { cmsText } from "@/lib/cms";
import { HOUSE_VISIT, SITE } from "@/lib/site";

const TITLE = "Dog Grooming in Charlotte NC | Barkly's Fear-Free Home Studio";
const DESCRIPTION =
  "Fear-Free dog grooming at your pup's pace — full grooms, baths & breed-specific cuts in a calm home studio serving Charlotte NC, Tega Cay SC, Fort Mill SC, Ballantyne NC, Matthews NC, Belmont NC & Gastonia NC.";

const FAQS: readonly FaqItem[] = [
  {
    question: "What is Fear-Free dog grooming?",
    answer:
      "We work at your dog’s pace, with breaks and gentle handling, and we won’t force a groom. Vanessa is a Fear Free Certified Professional.",
  },
  {
    question: "Do you groom dogs from Fort Mill and Matthews?",
    answer:
      "Yes. Barkly’s grooms dogs from Charlotte, South End, South Charlotte, Tega Cay, Fort Mill, Ballantyne, Matthews, Belmont, and Gastonia. Fort Mill and Matthews families book the same way as everyone else — online or by phone.",
  },
  {
    question: "How do I book a grooming appointment?",
    answer: `Book online on our Book page, call ${SITE.phoneDisplay}, or message us on WhatsApp. We’re open ${SITE.hoursDisplay}.`,
  },
  {
    question: "Do you groom all breeds?",
    answer:
      "All breeds are welcome. We have extra experience with poodles, schnauzers, doodles, and small breeds, and we pace every visit to the dog.",
  },
  {
    question: "Do you do house visits?",
    answer: `Yes, for homes with ${HOUSE_VISIT.minDogs} or more dogs. House visits cost 25% more than studio visits, and every dog after the second gets $${HOUSE_VISIT.extraDogDiscount} off. Use the house visit request form on this page and we’ll confirm the date.`,
  },
  {
    question: "Where can I see recent grooms and house rules?",
    answer:
      "Recent clients are in our gallery. Cancellation, vaccine, pick-up, and Fear-Free handling notes are on our policies page.",
  },
];

export const Route = createFileRoute("/grooming")({
  component: GroomingPage,
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/grooming",
      jsonLd: [
        serviceJsonLd({
          name: "Fear-Free dog grooming",
          description: DESCRIPTION,
          path: "/grooming",
          serviceType: "Pet grooming",
        }),
        faqPageJsonLd(FAQS),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Grooming", path: "/grooming" },
        ]),
      ],
    }),
});

function GroomingPage() {
  const { copy, site, prices } = useCms();

  return (
    <main className="text-center">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">Services</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          {cmsText(copy, "grooming.headline", "Fear-Free dog grooming in Charlotte")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          {cmsText(
            copy,
            "grooming.intro",
            `Full grooms, baths, and add-ons for dogs in ${site.area}. All breeds welcome, with extra experience with poodles, schnauzers, and doodles.`,
          )}
        </p>
        <div className="mt-6">
          <Button asChild size="lg">
            <Link to="/book">Book a groom</Link>
          </Button>
        </div>

        <div className="mx-auto mt-6 flex max-w-md justify-center gap-2 rounded-full border border-line bg-paper p-1">
          <span className="flex-1 rounded-full bg-sky/40 px-4 py-2 text-sm font-semibold text-navy">
            Grooming
          </span>
          <Link
            to="/boarding"
            className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-navy/70 transition-colors hover:bg-cream hover:text-navy"
          >
            Boarding
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <article className="flex flex-col items-center rounded-xl border border-line bg-paper p-6 shadow-card">
            <span className="flex size-12 items-center justify-center rounded-full bg-sky/35 text-teal-deep">
              <Scissors className="size-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-4 font-display text-2xl">Full Grooming</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Breed-appropriate haircut, bath, dry, ears, and nails — at your dog’s pace.
            </p>
          </article>
          <article className="flex flex-col items-center rounded-xl border border-line bg-paper p-6 shadow-card">
            <span className="flex size-12 items-center justify-center rounded-full bg-sky/35 text-teal-deep">
              <Droplets className="size-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-4 font-display text-2xl">Baths</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Gentle wash, conditioner, and fluffy dry with coat-specific shampoos.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl">Grooming prices</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
            Priced by coat and weight. A full groom includes bath, blow-dry, brush-out, haircut or
            style, ear cleaning, and nail trim. A touch-up is a lighter refresh between full grooms:
            bath, brush-out, trim, and nail trim.
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-center text-sm">
              <thead className="bg-cream-deep text-navy">
                <tr>
                  <th rowSpan={2} className="px-4 py-3 align-bottom font-semibold">
                    Size
                  </th>
                  <th rowSpan={2} className="px-4 py-3 align-bottom font-semibold">
                    Weight
                  </th>
                  <th colSpan={2} className="px-4 pt-3 pb-1 font-semibold">
                    Long hair or double coat
                  </th>
                </tr>
                <tr>
                  <th className="px-4 pt-1 pb-3 text-xs font-medium text-muted">Full groom</th>
                  <th className="px-4 pt-1 pb-3 text-xs font-medium text-muted">Touch-up</th>
                </tr>
              </thead>
              <tbody className="bg-paper">
                {prices.groom.map((row) => (
                  <tr key={row.size} className="border-t border-line">
                    <td className="px-4 py-3 font-medium text-navy">{row.size}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted">{row.range}</td>
                    <td className="px-4 py-3 tabular-nums text-teal-deep">{row.price}</td>
                    <td className="px-4 py-3 tabular-nums text-teal-deep">{row.touchUp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
            Short-haired dog? Book a bath instead. Prices are below.
          </p>

          <h2 className="mt-14 font-display text-3xl">Bath prices</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
            Priced by weight and coat. Every bath includes a blow-dry and nail trim, and long or
            double coats also get a full brush-out.
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-center text-sm">
              <thead className="bg-cream-deep text-navy">
                <tr>
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Weight</th>
                  <th className="px-4 py-3 font-semibold">Short hair</th>
                  <th className="px-4 py-3 font-semibold">Long hair or double coat</th>
                </tr>
              </thead>
              <tbody className="bg-paper">
                {prices.groom.map((row) => (
                  <tr key={row.size} className="border-t border-line">
                    <td className="px-4 py-3 font-medium text-navy">{row.size}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted">{row.range}</td>
                    <td className="px-4 py-3 tabular-nums text-teal-deep">{row.bathShort}</td>
                    <td className="px-4 py-3 tabular-nums text-teal-deep">{row.bathLong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-xs text-muted">
            Heavy matting or a thick coat takes longer. If it will cost extra, we’ll tell you the price at drop-off.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl">Add-ons</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {prices.addons.map((item) => (
            <li
              key={item.name}
              className="flex flex-col items-center rounded-lg border border-line bg-cream px-4 py-3"
            >
              <span className="font-medium text-navy">{item.name}</span>
              <span className="text-sm text-muted">{item.from}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-10">
          <Link to="/book">Book an appointment</Link>
        </Button>
        <GalleryPoliciesLinks />
      </section>

      <HouseVisitSection />

      <FaqSection title="Grooming FAQs" faqs={FAQS} />
    </main>
  );
}
