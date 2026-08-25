import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, Home } from "lucide-react";
import { BOARDING_RATES } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/boarding")({
  component: BoardingPage,
  head: () => ({
    meta: [{ title: "Boarding & Daycare | Barkly's" }],
  }),
});

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

function BoardingPage() {
  return (
    <main className="text-center">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
          Services
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Boarding</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Overnight stays and daytime care in our calm home — structure, rest,
          and familiar faces.
        </p>

        <div className="mx-auto mt-6 flex max-w-md justify-center gap-2 rounded-full border border-line bg-paper p-1">
          <Link
            to="/grooming"
            className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-navy/70 transition-colors hover:bg-cream hover:text-navy"
          >
            Grooming
          </Link>
          <span className="flex-1 rounded-full bg-sky/40 px-4 py-2 text-sm font-semibold text-navy">
            Boarding
          </span>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <article className="flex flex-col items-center rounded-xl border border-line bg-paper p-6 shadow-card">
            <span className="flex size-12 items-center justify-center rounded-full bg-sky/35 text-teal-deep">
              <Home className="size-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-4 font-display text-2xl">Boarding</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Overnight stay in our calm home — structure, rest, and Fear-Free
              care.
            </p>
          </article>
          <article className="flex flex-col items-center rounded-xl border border-line bg-paper p-6 shadow-card">
            <span className="flex size-12 items-center justify-center rounded-full bg-sky/35 text-teal-deep">
              <HeartHandshake className="size-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-4 font-display text-2xl">Doggy Daycare</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Daytime companionship for pups who need play, rest, and a familiar
              face.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl">Boarding rates</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
            Overnight stay in our home. Holiday dates, extra dogs, puppies, and
            extended hours are listed below.
          </p>
          <div className="mt-8">
            <RateCard
              title="Boarding"
              subtitle="In our home"
              rows={BOARDING_RATES}
            />
          </div>
          <p className="mx-auto mt-8 max-w-xl rounded-xl border border-line bg-cream px-5 py-4 text-sm text-muted">
            <span className="font-medium text-navy">Daycare</span> is daytime
            only and quoted per visit. Tell us your pup’s schedule when you
            book.
          </p>
          <Button asChild className="mt-10">
            <Link to="/book">Book an appointment</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
