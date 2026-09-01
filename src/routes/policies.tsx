import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/policies")({
  component: PoliciesPage,
  head: () =>
    pageHead({
      title: "Grooming & Boarding Policies | Barkly's Charlotte",
      description:
        "Cancellation, vaccine, pick-up, and Fear-Free handling policies for dog grooming, boarding, and daycare at Barkly's in Charlotte NC.",
      path: "/policies",
    }),
});

const POLICIES = [
  {
    title: "Cancellations",
    body: "Please cancel at least 2 days before your appointment. Late cancellations keep another dog from taking that time.",
  },
  {
    title: "Punctuality & no-shows",
    body: "There is a 15-minute grace period for grooming. After 15 minutes the appointment is forfeited and a no-show fee applies. Three no-shows mean we will not book future appointments.",
  },
  {
    title: "Pick-up",
    body: "Please pick up within one hour of your dog being ready. After that, a boarding fee applies.",
  },
  {
    title: "Health & vaccines",
    body: "Dogs should be current on core vaccines and free of contagious illness. Let us know about injuries, skin conditions, or medications before the visit.",
  },
  {
    title: "Fear-Free handling",
    body: "We will not force a groom. If your dog needs a pause, a shorter service, or a follow-up visit, we will say so. Safety for the dog and the groomer always comes first.",
  },
  {
    title: "Home studio",
    body: "Barkly’s is home-based. The studio address is shared after confirmation. Please arrive on time, keep siblings and extra guests to a minimum, and follow any parking notes we send.",
  },
];

function PoliciesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        House rules
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Policies</h1>
      <p className="mx-auto mt-4 max-w-xl text-muted">
        Written to keep the day calm for every dog on the books — including
        yours.
      </p>
      <div className="mt-10 space-y-4">
        {POLICIES.map((policy) => (
          <article
            key={policy.title}
            className="rounded-xl border border-line bg-paper p-6 shadow-card"
          >
            <h2 className="font-display text-2xl">{policy.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {policy.body}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
