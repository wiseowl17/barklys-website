import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/book")({
  component: BookPage,
  head: () => ({
    meta: [{ title: "Book an Appointment | Barkly's" }],
  }),
});

function BookPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    console.info("Barkly's booking request", data);
    setSent(true);
    form.reset();
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
          By appointment
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          Request a booking
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          All appointments are by request and must be manually confirmed. We
          will contact you shortly to review timing, coat notes, and anything
          your dog needs to feel comfortable.
        </p>
        <dl className="mt-8 space-y-3 text-sm">
          <div>
            <dt className="text-muted">Phone</dt>
            <dd>
              <a className="font-medium text-navy" href={SITE.phoneHref}>
                {SITE.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Email</dt>
            <dd>
              <a className="font-medium text-navy" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Social</dt>
            <dd className="font-medium text-navy">
              Instagram & TikTok {SITE.handle}
            </dd>
          </div>
        </dl>
        <p className="mt-8 rounded-lg border border-line bg-cream-deep p-4 text-sm text-muted">
          Home-based studio. The exact address is shared only after your
          appointment is confirmed.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-8">
        {sent ? (
          <div>
            <h2 className="font-display text-2xl">Request received</h2>
            <p className="mt-3 text-muted">
              Thank you. We’ll review your note and follow up to confirm. If
              it’s urgent, call or text {SITE.phoneDisplay}.
            </p>
            <Button className="mt-6" type="button" onClick={() => setSent(false)}>
              Send another request
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4">
            <p className="text-sm text-muted">
              Connect this form to Formspree later by adding your form endpoint
              to the action. For now, requests stay on this device until we
              confirm them personally.
            </p>
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="dogName">Dog’s name</Label>
                <Input id="dogName" name="dogName" required />
              </div>
              <div>
                <Label htmlFor="breed">Breed</Label>
                <Input id="breed" name="breed" required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input id="weight" name="weight" inputMode="decimal" />
              </div>
              <div>
                <Label htmlFor="service">Service</Label>
                <select
                  id="service"
                  name="service"
                  required
                  className="h-11 w-full rounded-md border border-line bg-paper px-3.5 text-sm text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/25"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>Full groom</option>
                  <option>Bath & brush</option>
                  <option>Boarding</option>
                  <option>Daycare / sitting</option>
                  <option>Add-ons only</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="dates">Preferred dates</Label>
              <Input id="dates" name="dates" placeholder="e.g. next Tuesday morning" />
            </div>
            <div>
              <Label htmlFor="message">Anything we should know?</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Coat notes, anxiety, senior care, puppies…"
              />
            </div>
            <Button type="submit" size="lg" className="mt-2">
              Send request
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
