import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "Meet Vanessa | Barkly's" }],
  }),
});

function AboutPage() {
  return (
    <main className="text-center">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
          Meet the groomer
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Vanessa</h1>
        <aside className="mt-8 w-full overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
          <img
            src="/vanessa.jpg"
            alt="Vanessa with a golden retriever on the grooming table"
            className="mx-auto aspect-square w-full max-w-lg object-cover"
          />
          <div className="p-6">
            <p className="font-display text-2xl text-navy">Vanessa Cordova</p>
            <p className="mt-1 text-sm text-muted">
              Fear Free Certified Professional · Groomer
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky/40 px-3 py-1 text-xs font-semibold tracking-wide text-navy uppercase">
              <ShieldCheck className="size-3.5" />
              Fear Free Certified
            </p>
          </div>
        </aside>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          Nearly two decades in animal care, a veterinary education from
          Venezuela, and five years as a professional groomer — with a Fear
          Free certification at the center of every appointment.
        </p>
        <ul className="mt-8 w-full space-y-4 text-[15px] leading-relaxed text-ink">
          <li className="rounded-lg border border-line bg-paper px-4 py-3">
            Trained as a veterinary doctor in Venezuela
          </li>
          <li className="rounded-lg border border-line bg-paper px-4 py-3">
            Currently studying to revalidate her veterinary degree in the
            United States
          </li>
          <li className="rounded-lg border border-line bg-paper px-4 py-3">
            Professional groomer with 5 years of hands-on salon experience
          </li>
          <li className="rounded-lg border border-line bg-paper px-4 py-3">
            Special care for poodles, schnauzers, doodles, and small breeds —
            all breeds welcome
          </li>
        </ul>
      </section>

      <section className="bg-paper">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl">Why Fear Free matters</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Fear Free is a science-based certification that trains
              professionals to recognize and reduce fear, anxiety, and stress
              in pets. It focuses on reading subtle body language, gentle
              positive handling, environmental adjustments, and desensitizing
              pets to grooming tools.
            </p>
            <p>
              The result is a calmer, safer experience for the dog and greater
              peace of mind for owners. At Barkly’s every appointment
              prioritizes your pet’s emotional well-being — the haircut never
              comes before the animal in the chair.
            </p>
            <p>
              If your dog needs extra time, breaks, or a slower introduction to
              the table, dryer, or clippers, that is the plan — not an
              inconvenience.
            </p>
          </div>
          <Button asChild className="mt-8">
            <Link to="/book">Book with Vanessa</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
