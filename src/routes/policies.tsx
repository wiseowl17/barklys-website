import { createFileRoute } from "@tanstack/react-router";
import { FaqSection } from "@/components/faq-section";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  pageHead,
  type FaqItem,
} from "@/lib/seo";

const TITLE = "Grooming & Boarding Policies | Barkly's Charlotte";
const DESCRIPTION =
  "Cancellation, vaccine, pick-up, and Fear-Free handling policies for dog grooming, boarding, and daycare at Barkly's in Charlotte NC.";

const POLICIES: readonly FaqItem[] = [
  {
    question: "What is the cancellation policy?",
    answer:
      "Please cancel at least 2 days before your appointment. Late cancellations keep another dog from taking that time.",
  },
  {
    question: "What happens if I am late or miss a grooming appointment?",
    answer:
      "There is a 15-minute grace period for grooming. After 15 minutes the appointment is forfeited and a no-show fee applies. Three no-shows mean we will not book future appointments.",
  },
  {
    question: "When should I pick up my dog?",
    answer:
      "Please pick up within one hour of your dog being ready. After that, a boarding fee applies.",
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
        Written to keep the day calm for every dog on the books — including
        yours.
      </p>
      <div className="mt-10">
        <FaqSection title="Policy FAQs" faqs={POLICIES} />
      </div>
    </main>
  );
}
