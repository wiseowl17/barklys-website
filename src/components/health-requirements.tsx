import type { ReactNode } from "react";
import { useCms } from "@/lib/cms-context";

type HealthRule = { topic: string; rule: ReactNode };

/**
 * Vaccine and health requirements for /policies. Not an FAQ list on purpose:
 * the vaccine headings carry their own emphasis (bold italic for required,
 * bold underline for strongly recommended), which FaqSection cannot render.
 */
export function HealthRequirements() {
  const { site } = useCms();

  const rules: HealthRule[] = [
    {
      topic: "On medication",
      rule: "We can only accommodate pets that are well and not sedated. We cannot administer medication.",
    },
    {
      topic: "Human aggressive",
      rule: "We do not accept pets that have shown unprovoked aggression resulting in harm to a person.",
    },
    {
      topic: "Pet aggressive",
      rule: "We do not accept pets that have shown unprovoked aggression resulting in harm to another pet.",
    },
    {
      topic: "Food aggressive",
      rule: "We can accommodate. Food is not given in the studio.",
    },
    {
      topic: "Toy aggressive",
      rule: "We can accommodate. Toys are not given in the studio.",
    },
    {
      topic: "Recent contagious illness",
      rule: "No contagious illness now or within the past 30 days.",
    },
    {
      topic: "Health conditions (heart, liver, bloat, collapsing trachea, cancer, diabetes, etc.)",
      rule: "We may be able to accommodate if the pet is strong enough for a groom. An express groom is strongly recommended.",
    },
    { topic: "Sedation", rule: "We do not accept sedated pets." },
    { topic: "In heat", rule: "We do not accept pets in heat." },
    { topic: "Pregnant", rule: "It depends on the situation and the dog." },
    {
      topic: "Lameness (ability to walk and stand)",
      rule: "The pet must be able to stand on its own during the groom.",
    },
    { topic: "Recent surgery", rule: "We cannot accept pets after recent surgery." },
    { topic: "Elizabethan collars", rule: "We cannot accept pets wearing one." },
    { topic: "Fleas or ticks", rule: "We will not accept pets with fleas or ticks." },
    {
      topic: "Blindness, deafness, or special needs care",
      rule: (
        <>
          We can accommodate, with different pricing. Please{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
          >
            email us
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <section id="health-requirements" className="scroll-mt-40">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl">Vaccines and health requirements</h2>
        <p className="mt-3 text-lg font-medium text-navy">Age: 8 weeks and up</p>

        <div className="mt-8 space-y-4">
          <article className="rounded-xl border border-line bg-paper p-6 shadow-card">
            <h3 className="font-display text-xl font-bold italic">Dog vaccinations required</h3>
            <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-muted">
              <li>Rabies: 1 or 3 year</li>
              <li>Exception: puppies between 8 weeks and 16 weeks</li>
              <li>All vaccinations must be given at least 48 hours before we provide services.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-line bg-paper p-6 shadow-card">
            <h3 className="font-display text-xl font-bold underline decoration-2 underline-offset-4">
              Dog vaccinations strongly recommended
            </h3>
            <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-muted">
              <li>DPP: 1 or 3 year (distemper, parvovirus, parainfluenza)</li>
              <li>Bordetella: every 12 months</li>
              <li>Canine influenza</li>
            </ul>
          </article>

          <article className="rounded-xl border border-line bg-paper p-6 text-left shadow-card">
            <h3 className="text-center font-display text-xl">Health and behavior</h3>
            <dl className="mt-4 divide-y divide-line text-[15px] leading-relaxed">
              {rules.map((item) => (
                <div key={item.topic} className="grid gap-1 py-3 sm:grid-cols-[15rem_1fr] sm:gap-6">
                  <dt className="font-semibold text-navy">{item.topic}</dt>
                  <dd className="text-muted">{item.rule}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
