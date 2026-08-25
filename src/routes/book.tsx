import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/book")({
  component: BookPage,
  head: () => ({
    meta: [{ title: "Book an Appointment | Barkly's" }],
  }),
});

const SERVICES = [
  "Full Groom",
  "Touch-Up",
  "Bath",
  "Boarding",
  "Doggy Daycare",
  "House Sitting",
  "Other",
] as const;

const field =
  "h-11 w-full rounded-md border border-line bg-paper px-3.5 text-center text-sm text-ink outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/25";

function BookPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `Phone: ${data.get("phone") ?? ""}`,
      `Dog: ${data.get("dog") ?? ""}`,
      `Breed: ${data.get("breed") ?? ""}`,
      `Weight: ${data.get("weight") ?? ""}`,
      `Service: ${data.get("service") ?? ""}`,
      `Preferred dates: ${data.get("dates") ?? ""}`,
      "",
      String(data.get("message") ?? ""),
    ];
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      "Barkly's booking request",
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-14 text-center sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        By appointment
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Book with us</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        Requests are reviewed by hand. We’ll confirm your time — nothing is
        booked until you hear back from us.
      </p>

      {sent ? (
        <div className="mt-10 w-full rounded-2xl border border-line bg-paper px-6 py-12 shadow-soft">
          <p className="font-display text-2xl text-navy">Request ready to send</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            Your email app should open with the details. If it doesn’t, write us
            at{" "}
            <a
              className="font-medium text-teal-deep"
              href={`mailto:${SITE.email}`}
            >
              {SITE.email}
            </a>{" "}
            or call{" "}
            <a className="font-medium text-teal-deep" href={SITE.phoneHref}>
              {SITE.phoneDisplay}
            </a>
            .
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-6"
            onClick={() => setSent(false)}
          >
            Send another request
          </Button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-10 grid w-full gap-4 rounded-2xl border border-line bg-paper p-6 text-left shadow-soft sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" required autoComplete="name" />
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
              />
            </div>
            <div>
              <Label htmlFor="dog">Dog’s name</Label>
              <Input id="dog" name="dog" required />
            </div>
            <div>
              <Label htmlFor="breed">Breed</Label>
              <Input id="breed" name="breed" />
            </div>
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input id="weight" name="weight" type="number" min="1" step="1" />
            </div>
            <div>
              <Label htmlFor="service">Service</Label>
              <select id="service" name="service" required className={field}>
                <option value="">Choose one</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="dates">Preferred dates</Label>
              <Input id="dates" name="dates" placeholder="e.g. next Tuesday AM" />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Anything we should know?</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Coat condition, anxiety, senior or puppy, extra add-ons…"
            />
          </div>
          <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto sm:justify-self-center">
            Send request
          </Button>
        </form>
      )}

      <dl className="mt-10 space-y-3 text-sm">
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
          <dd className="mt-2">
            <SocialLinks />
          </dd>
        </div>
      </dl>
      <p className="mt-8 rounded-lg border border-line bg-cream-deep p-4 text-sm text-muted">
        Home-based studio. The exact address is shared only after your
        appointment is confirmed.
      </p>
    </main>
  );
}
