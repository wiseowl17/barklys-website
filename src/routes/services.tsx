import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Droplets,
  HeartHandshake,
  Home,
  KeyRound,
  Scissors,
  Sparkles,
} from "lucide-react";
import {
  ADD_ONS,
  BOARDING_RATES,
  GROOM_PRICES,
  HOUSE_SITTING_RATES,
  SERVICES,
} from "@/lib/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [{ title: "Services & Pricing | Barkly's" }],
  }),
});

const SERVICE_ICONS = {
  grooming: Scissors,
  baths: Droplets,
  boarding: Home,
  sitting: KeyRound,
  daycare: HeartHandshake,
} as const;

function RateCard({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: readonly { name: string; price: string; note: string }[];
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-paper text-center shadow-card">
      <div className="bg-cream-deep px-5 py-5">
        <h3 className="font-display text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <ul>
        {rows.map((row) => (
          <li
            key={row.name}
            className="flex flex-col items-center gap-0.5 border-t border-line px-4 py-3 sm:flex-row sm:justify-between sm:text-left"
          >
            <span className="font-medium text-navy">{row.name}</span>
            <span className="text-sm">
              <span className="font-semibold tabular-nums text-teal-deep">
                {row.price}
              </span>
              <span className="ml-1.5 text-muted">{row.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ServicesPage() {
  return (
    <main className="text-center">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
          Care menu
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Services</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Full grooms, baths, boarding, house sitting, and daycare. All breeds
          are welcome, with extra fluency in poodles, schnauzers, and doodles.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.slug] ?? Sparkles;
            return (
              <article
                key={service.slug}
                className="flex flex-col items-center rounded-xl border border-line bg-paper p-6 shadow-card"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-sky/35 text-teal-deep">
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <h2 className="mt-4 font-display text-2xl">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.blurb}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl">Full groom starting prices</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
            Prices below are starting points. Final quotes depend on coat
            condition, breed, and the work your dog actually needs. Bath-and-brush
            packages are slightly lower.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-line">
            <table className="w-full text-center text-sm">
              <thead className="bg-cream-deep text-navy">
                <tr>
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Weight</th>
                  <th className="px-4 py-3 font-semibold">Starting at</th>
                </tr>
              </thead>
              <tbody className="bg-paper">
                {GROOM_PRICES.map((row) => (
                  <tr key={row.size} className="border-t border-line">
                    <td className="px-4 py-3 font-medium text-navy">{row.size}</td>
                    <td className="px-4 py-3 text-muted">{row.range}</td>
                    <td className="px-4 py-3 tabular-nums text-teal-deep">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl">Stay & sit rates</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
          House sitting is overnight care in your home. Boarding is overnight
          in ours. Holiday dates, extra pets, puppies, and extended hours are
          listed below.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <RateCard
            title="House sitting"
            subtitle="In your home"
            rows={HOUSE_SITTING_RATES}
          />
          <RateCard
            title="Boarding"
            subtitle="In our home"
            rows={BOARDING_RATES}
          />
        </div>
        <p className="mx-auto mt-8 max-w-xl rounded-xl border border-line bg-paper px-5 py-4 text-sm text-muted">
          <span className="font-medium text-navy">Daycare</span> is daytime
          only and quoted per visit. Tell us your pup’s schedule when you book.
        </p>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl">Add-ons</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
            Deshedding, teeth brushing, touch-ups, paw balm, nails, senior and
            puppy care, and specialty shampoos for different coat types.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ADD_ONS.map((item) => (
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
            <Link to="/book">Request a quote</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
