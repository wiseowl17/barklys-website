import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, Home } from "lucide-react";
import { BOARDING_RATES, SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

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

function BoardingRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);

    try {
      // FormSubmit delivers to the business email without a backend.
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      if (!res.ok) throw new Error("send failed");
      setSubmitted(true);
      form.reset();
    } catch {
      // Fallback: open mail client with the request details.
      const entries = Object.fromEntries(data.entries());
      const body = Object.entries(entries)
        .filter(([k]) => !k.startsWith("_"))
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        "Boarding / daycare request",
      )}&body=${encodeURIComponent(body)}`;
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-cream-deep px-6 py-10 text-center">
        <h3 className="font-display text-2xl text-navy">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Thanks! We’ll review availability and get back to you to confirm your
          boarding or daycare dates.
        </p>
        <Button
          type="button"
          className="mt-6"
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-4 rounded-2xl border border-line bg-paper p-6 text-left shadow-card sm:p-8"
    >
      <input type="hidden" name="_subject" value="Barkly's boarding / daycare request" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <p className="text-center text-sm text-muted">
        This is a request only — all stays are confirmed manually based on
        availability.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div>
        <Label htmlFor="service">Service</Label>
        <select
          id="service"
          name="service"
          required
          className="h-11 w-full rounded-md border border-line bg-paper px-3.5 text-center text-sm text-ink outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/25"
          defaultValue=""
        >
          <option value="" disabled>
            Select…
          </option>
          <option value="Boarding (overnight)">Boarding (overnight)</option>
          <option value="Daycare">Daycare</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="start_date">Preferred start date</Label>
          <Input id="start_date" name="start_date" type="date" required />
        </div>
        <div>
          <Label htmlFor="end_date">Preferred end date</Label>
          <Input id="end_date" name="end_date" type="date" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="days">Number of days / nights</Label>
          <Input
            id="days"
            name="days"
            type="number"
            min={1}
            max={30}
            placeholder="e.g. 3"
            required
          />
        </div>
        <div>
          <Label htmlFor="dogs">Number of dogs</Label>
          <Input
            id="dogs"
            name="dogs"
            type="number"
            min={1}
            max={5}
            defaultValue={1}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="dog_name">Dog’s name</Label>
          <Input id="dog_name" name="dog_name" required />
        </div>
        <div>
          <Label htmlFor="breed">Breed</Label>
          <Input id="breed" name="breed" required />
        </div>
      </div>

      <div>
        <Label htmlFor="weight">Weight (lbs)</Label>
        <Input id="weight" name="weight" type="number" min={1} step={1} />
      </div>

      <div>
        <Label htmlFor="message">Notes (temperament, meds, schedule)</Label>
        <Textarea id="message" name="message" rows={4} />
      </div>

      <Button type="submit" className="w-full" disabled={sending}>
        {sending ? "Sending…" : "Send boarding request"}
      </Button>
    </form>
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
            request care.
          </p>
        </div>
      </section>

      <section id="request" className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl">Request boarding or daycare</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
          Tell us how many days you need and whether it’s overnight boarding or
          daycare. We’ll confirm availability by phone or email.
        </p>
        <div className="mt-8">
          <BoardingRequestForm />
        </div>
        <p className="mt-6 text-sm text-muted">
          Need a haircut instead?{" "}
          <Link
            to="/book"
            className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
          >
            Book grooming on Square
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
