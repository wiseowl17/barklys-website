import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCms } from "@/lib/cms-context";
import { HOUSE_VISIT, HOUSE_VISIT_RULES, houseVisitPrice } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

/**
 * House visits for homes with two or more dogs. Prices come from the studio
 * price table via `houseVisitPrice`, so a studio-desk price change carries over.
 */
export function HouseVisitSection() {
  const { prices } = useCms();
  const { minDogs, extraDogDiscount } = HOUSE_VISIT;

  // Worked example: three medium full grooms, the third one discounted.
  const medium = prices.groom.find((row) => row.size === "M");
  const mediumPrice = medium ? Number(houseVisitPrice(medium.price).replace("$", "")) : NaN;
  const example = Number.isFinite(mediumPrice)
    ? `Example: three medium, long-haired dogs getting full grooms cost $${mediumPrice} + $${mediumPrice} + $${mediumPrice - extraDogDiscount} = $${mediumPrice * 3 - extraDogDiscount}.`
    : null;

  return (
    <section id="house-visits" className="scroll-mt-32 bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl">House visits</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
          Have {minDogs === 2 ? "two" : minDogs} or more dogs? Vanessa can groom them at your
          home. House visits cost 25% more than studio visits, and every dog after the second
          gets ${extraDogDiscount} off.
        </p>

        <div className="mt-8 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-center text-sm">
            <thead className="bg-cream-deep text-navy">
              <tr>
                <th rowSpan={2} className="px-3 py-3 align-bottom font-semibold">
                  Size
                </th>
                <th colSpan={2} className="px-3 pt-3 pb-1 font-semibold">
                  Grooms
                  <span className="block text-xs font-normal text-muted">long or double coat</span>
                </th>
                <th colSpan={2} className="px-3 pt-3 pb-1 font-semibold">
                  Baths
                </th>
              </tr>
              <tr>
                <th className="px-3 pt-1 pb-3 text-xs font-medium text-muted">Full groom</th>
                <th className="px-3 pt-1 pb-3 text-xs font-medium text-muted">Touch-up</th>
                <th className="px-3 pt-1 pb-3 text-xs font-medium text-muted">Short hair</th>
                <th className="px-3 pt-1 pb-3 text-xs font-medium text-muted">Long or double</th>
              </tr>
            </thead>
            <tbody className="bg-paper">
              {prices.groom.map((row) => (
                <tr key={row.size} className="border-t border-line">
                  <td className="px-3 py-3">
                    <span className="block font-medium text-navy">{row.size}</span>
                    <span className="block text-xs whitespace-nowrap text-muted">{row.range}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap tabular-nums text-teal-deep">
                    {houseVisitPrice(row.price)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap tabular-nums text-teal-deep">
                    {houseVisitPrice(row.touchUp)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap tabular-nums text-teal-deep">
                    {houseVisitPrice(row.bathShort)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap tabular-nums text-teal-deep">
                    {houseVisitPrice(row.bathLong)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
          Prices are per dog. Every dog after the second gets ${extraDogDiscount} off.
          {example ? ` ${example}` : ""}
        </p>

        <h3 className="mt-12 font-display text-2xl">Request a house visit</h3>
        <div className="mt-6">
          <HouseVisitForm />
        </div>
      </div>
    </section>
  );
}

function HouseVisitForm() {
  const { site } = useCms();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setError("");

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const dogs = Number(data.get("dogs") ?? 0);
    if (!name || !phone || !email) {
      setError("Please add your name, phone, and email so we can confirm the visit.");
      setSending(false);
      return;
    }
    if (data.get("agreed_to_house_rules") !== "Yes") {
      setError("Please read and agree to the house visit rules before sending.");
      setSending(false);
      return;
    }
    if (!Number.isFinite(dogs) || dogs < HOUSE_VISIT.minDogs) {
      setError(
        `House visits are for ${HOUSE_VISIT.minDogs} or more dogs. For one dog, book a studio appointment instead.`,
      );
      setSending(false);
      return;
    }

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("send failed");
      void navigate({ to: "/thanks" });
    } catch {
      setError(
        `We couldn’t send that just now. Call ${site.phoneDisplay} or email ${site.email}, then try again.`,
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-4 rounded-2xl border border-line bg-cream p-6 text-left shadow-card sm:p-8"
      noValidate
    >
      <input type="hidden" name="_subject" value="Barkly's house visit request" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <p className="text-center text-sm text-muted">
        Sending this form doesn’t book the visit yet. We’ll call or email to confirm the date.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="hv_name">Your name</Label>
          <Input id="hv_name" name="name" required autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="hv_phone">Phone</Label>
          <Input id="hv_phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>

      <div>
        <Label htmlFor="hv_email">Email</Label>
        <Input id="hv_email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="hv_area">Town or neighborhood</Label>
          <Input id="hv_area" name="area" placeholder="e.g. Ballantyne" />
        </div>
        <div>
          <Label htmlFor="hv_date">Preferred date</Label>
          <Input id="hv_date" name="preferred_date" type="date" />
        </div>
      </div>

      <div>
        <Label htmlFor="hv_dogs">Number of dogs</Label>
        <Input
          id="hv_dogs"
          name="dogs"
          type="number"
          min={HOUSE_VISIT.minDogs}
          max={8}
          defaultValue={HOUSE_VISIT.minDogs}
          required
        />
      </div>

      <div>
        <Label htmlFor="hv_details">Your dogs</Label>
        <Textarea
          id="hv_details"
          name="dogs_details"
          rows={5}
          placeholder="For each dog: name, breed, weight, coat (short, long, or double), and full groom, touch-up, or bath."
        />
      </div>

      <fieldset className="rounded-xl border border-line bg-paper p-4">
        <legend className="px-1 font-display text-lg text-navy">House visit rules</legend>
        <ul className="mt-1 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
          {HOUSE_VISIT_RULES.map((rule) => (
            <li key={rule.question}>{rule.answer}</li>
          ))}
        </ul>
        <label
          htmlFor="hv_agree"
          className="mt-4 flex cursor-pointer items-start gap-3 text-sm font-medium text-navy"
        >
          <input
            id="hv_agree"
            name="agreed_to_house_rules"
            type="checkbox"
            value="Yes"
            required
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-teal-deep"
          />
          <span>
            I’ve read and agree to the house visit rules. They’re also on our{" "}
            <Link
              to="/policies"
              hash="house-visit-policies"
              className="text-teal-deep underline decoration-sky underline-offset-2"
            >
              policies page
            </Link>
            .
          </span>
        </label>
      </fieldset>

      <Button type="submit" className="w-full" disabled={sending || !agreed}>
        {sending ? "Sending…" : "Send house visit request"}
      </Button>
      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
