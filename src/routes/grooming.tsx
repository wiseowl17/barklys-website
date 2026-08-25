import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Scissors } from "lucide-react";
import { ADD_ONS, GROOM_PRICES } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/grooming")({
  component: GroomingPage,
  head: () => ({
    meta: [{ title: "Grooming & Pricing | Barkly's" }],
  }),
});

function GroomingPage() {
  return (
    <main className="text-center">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
          Services
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Grooming</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Full grooms, baths, and add-ons. All breeds welcome, with extra fluency
          in poodles, schnauzers, and doodles.
        </p>

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
              Breed-appropriate haircut, bath, dry, ears, and nails — at your
              dog’s pace.
            </p>
          </article>
          <article className="flex flex-col items-center rounded-xl border border-line bg-paper p-6 shadow-card">
            <span className="flex size-12 items-center justify-center rounded-full bg-sky/35 text-teal-deep">
              <Droplets className="size-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-4 font-display text-2xl">Baths</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Gentle wash, conditioner, and fluffy dry with coat-specific
              shampoos.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl">Grooming prices</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
            Full grooms include haircut, bath, dry, ears, and nails.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-line">
            <table className="w-full text-center text-sm">
              <thead className="bg-cream-deep text-navy">
                <tr>
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Weight</th>
                  <th className="px-4 py-3 font-semibold">Full groom</th>
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
                <tr className="border-t border-line bg-cream">
                  <td className="px-4 py-3 font-medium text-navy">Touch-up</td>
                  <td className="px-4 py-3 text-muted">Bath, face, feet & tidy</td>
                  <td className="px-4 py-3 text-teal-deep">
                    $10 less than a full groom
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-xs text-muted">
            Extra time for matting or heavy coat work may be quoted at drop-off.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl">Add-ons</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
          Deshedding, dematting, teeth brushing, paw balm, nails, and specialty
          shampoos for different coat types.
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
          <Link to="/book">Book an appointment</Link>
        </Button>
      </section>
    </main>
  );
}
