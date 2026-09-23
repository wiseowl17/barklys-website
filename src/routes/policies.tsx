import { createFileRoute } from "@tanstack/react-router";
import { FaqSection } from "@/components/faq-section";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  pageHead,
  type FaqItem,
} from "@/lib/seo";
import { SERVICE_AREA_NAMES, SITE } from "@/lib/site";

const TITLE = "Grooming & Boarding Policies | Barkly's Charlotte";
const DESCRIPTION =
  "Cancellation, vaccine, pick-up, Fear-Free handling, booking, service areas, breeds, coat care, and boarding vs daycare FAQs for Barkly's home studio in Charlotte NC.";

const POLICIES: readonly FaqItem[] = [
  {
    question: "What is the cancellation policy?",
    answer:
      "Please cancel at least 2 days before your appointment. Late cancellations keep another dog from taking that time slot.",
  },
  {
    question: "What happens if I am late or miss a grooming appointment?",
    answer:
      "There’s a 15-minute grace period for grooming. After that, the appointment is forfeited and a no-show fee applies (confirmed when you book). Three no-shows and we won’t be able to book future appointments.",
  },
  {
    question: "When should I pick up my dog?",
    answer:
      "Please pick up within 45 minutes of your dog being ready. After that, a boarding fee applies. If you’re running late, let us know early so we can plan.",
  },
  {
    question: "What vaccines and health requirements apply?",
    answer:
      "Dogs should be current on core vaccines and free of contagious illness. Let us know about injuries, skin conditions, or medications before the visit.",
  },
  {
    question: "How does Fear-Free handling work at Barkly's?",
    answer:
      "We will not force a groom. If your dog needs a pause, a shorter service, or a follow-up visit, we will say so. Safety for the dog and the groomer always comes first.",
  },
  {
    question: "Where is the studio, and how do visits work?",
    answer:
      "Barkly’s is home-based. The studio address is shared after confirmation. Please arrive on time, keep siblings and extra guests to a minimum, and follow any parking notes we send.",
  },
  {
    question: "Which cities does Barkly's serve?",
    answer: `We serve families across ${SERVICE_AREA_NAMES}. Fort Mill and Matthews families book the same way as Charlotte clients — online or by phone.`,
  },
  {
    question: "How do I book grooming, boarding, or daycare?",
    answer: `Book grooming online at barklysclt.com/book (Setmore). You can also call ${SITE.phoneDisplay} or message us on WhatsApp. We’re open ${SITE.hoursDisplay}. Boarding and daycare are by request — use the form on the Boarding page or call, and we’ll confirm availability.`,
  },
  {
    question: "How should I care for my dog’s coat between visits?",
    answer:
      "Brush regularly between appointments so mats don’t build up, especially on doodles and longer coats. Keep the coat at a comfortable length you can maintain at home, and book sooner if you notice tangles, skin irritation, or your dog seems uncomfortable. Heavy matting or a thick coat takes longer. If it will cost extra, we’ll tell you the price at drop-off.",
  },
  {
    question: "Do you use cages?",
    answer:
      "No. Since Barkly’s is a Fear-Free studio, we don’t use cages or kennel runs, and we never rush a dog through a haircut. Dogs stay in our home and get one-on-one attention.",
  },
  {
    question: "What breeds do you groom?",
    answer:
      "All breeds are welcome. We have extra experience with poodles, schnauzers, doodles, and small breeds, and we pace every visit to the dog.",
  },
  {
    question: "What’s the difference between boarding and daycare?",
    answer:
      "Boarding is an overnight stay in our calm home. Daycare and dog sitting are daytime only — play, rest, and a familiar face while you’re at work or out for the day. Both use Fear-Free handling and are confirmed based on availability.",
  },
];

export const Route = createFileRoute("/policies")({
  component: PoliciesPage,
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/policies",
      jsonLd: [
        faqPageJsonLd(POLICIES),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Policies", path: "/policies" },
        ]),
      ],
    }),
});

function PoliciesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        House rules
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">
        Grooming & boarding policies
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-muted">
        A few rules that keep the schedule calm for every dog, including yours.
      </p>
      <div className="mt-10">
        <FaqSection title="Policy FAQs" faqs={POLICIES} />
      </div>
    </main>
  );
}
