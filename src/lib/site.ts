export const SERVICE_AREAS = [
  { name: "Charlotte", state: "NC" },
  { name: "South End", state: "NC" },
  { name: "South Charlotte", state: "NC" },
  { name: "Tega Cay", state: "SC" },
  { name: "Fort Mill", state: "SC" },
  { name: "Ballantyne", state: "NC" },
  { name: "Matthews", state: "NC" },
  { name: "Belmont", state: "NC" },
  { name: "Gastonia", state: "NC" },
] as const;

/** One unique sentence per named area — used on the homepage, not a repeated name list. */
export const SERVICE_AREA_NOTES = [
  {
    name: "Charlotte",
    state: "NC",
    note: "Home studio for Charlotte families who want one-on-one Fear-Free grooming instead of a busy salon floor.",
  },
  {
    name: "South End",
    state: "NC",
    note: "South End owners book weekday evenings after work — drop-off, a paced groom, and a calm pickup.",
  },
  {
    name: "South Charlotte",
    state: "NC",
    note: "South Charlotte doodles, schnauzers, and seniors get extra time on the table, not a rushed slot.",
  },
  {
    name: "Tega Cay",
    state: "SC",
    note: "Tega Cay families drive in for boarding and grooming in a real home, not a kennel run.",
  },
  {
    name: "Fort Mill",
    state: "SC",
    note: "Fort Mill pups are regulars — same booking flow, same Fear-Free handling as Charlotte clients.",
  },
  {
    name: "Ballantyne",
    state: "NC",
    note: "Ballantyne owners who want a quiet first groom or a senior-safe bath book here by appointment.",
  },
  {
    name: "Matthews",
    state: "NC",
    note: "Matthews families use Barkly’s for full grooms and overnight stays without a warehouse daycare vibe.",
  },
  {
    name: "Belmont",
    state: "NC",
    note: "Belmont is an easy hop for weekday evening grooms when the corporate salons are already booked out.",
  },
  {
    name: "Gastonia",
    state: "NC",
    note: "Gastonia clients make the drive for Vanessa’s Fear-Free approach with anxious and first-time dogs.",
  },
] as const;

function joinList(items: readonly string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0]!;
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** Full named list: "Charlotte NC, Tega Cay SC, …, and Gastonia NC" */
export const SERVICE_AREA_NAMES = joinList(
  SERVICE_AREAS.map((area) => `${area.name} ${area.state}`),
);

export const SITE = {
  name: "Barkly's",
  tagline: "Groom, Play & Stay",
  phoneDisplay: "(980) 320-0502",
  phoneHref: "tel:+19803200502",
  whatsappNumber: "19803200502",
  whatsappHref: "https://wa.me/message/IHQRZ6RJWWKBC1",
  email: "barklysclt@gmail.com",
  instagram: "https://instagram.com/barklysclt",
  tiktok: "https://www.tiktok.com/@barklysclt",
  handle: "@barklysclt",
  area: "Charlotte, Fort Mill, Tega Cay, and nearby towns",
  googleReviewHref:
    "https://search.google.com/local/writereview?placeid=ChIJs8QZe9U3T2oRHlr8iUjUr0M",
  googleReviewsHref:
    "https://www.google.com/maps/place/?q=place_id:ChIJs8QZe9U3T2oRHlr8iUjUr0M",
  hoursDisplay: "Sunday 9–5, Monday–Friday 6–9pm, Saturday 9–5",
  locality: "Charlotte, NC",
  studioNote:
    "Home-based studio in Charlotte, NC. Exact address is shared after your appointment is confirmed.",
  /** Keep in lockstep with the live Google listing. */
  googleRatingValue: "5.0",
  googleReviewCount: 6,
} as const;

export type NavLink = { to: string; label: string };
export type NavItem = NavLink | { label: string; children: readonly NavLink[] };

export const NAV: readonly NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Meet the Groomer" },
  {
    label: "Services",
    children: [
      { to: "/grooming", label: "Grooming" },
      { to: "/boarding", label: "Boarding" },
    ],
  },
  { to: "/gallery", label: "Gallery" },
  { to: "/policies", label: "Policies" },
  { to: "/book", label: "Book" },
] as const;

/** Flatten dropdown groups so footer can emit crawlable leaf links. */
export function navLinks(items: readonly NavItem[] = NAV): NavLink[] {
  return items.flatMap((item) => ("children" in item ? [...item.children] : [item]));
}

export const GROOM_PRICES = [
  { size: "S", range: "0–25 lbs", price: "$75" },
  { size: "M", range: "26–40 lbs", price: "$85" },
  { size: "L", range: "41–70 lbs", price: "$95" },
  { size: "XL", range: "71–90 lbs", price: "$105" },
  { size: "XL+", range: "91+ lbs", price: "$115" },
] as const;

export const ADD_ONS = [
  { name: "Deshedding", from: "$25–$40" },
  { name: "Dematting", from: "$20–$40" },
  { name: "Nail trim", from: "$15" },
  { name: "Teeth brushing", from: "$6" },
  { name: "Paw balm", from: "$8" },
  { name: "Specialty shampoo", from: "Quoted" },
] as const;

export const BOARDING_RATES = [
  { name: "Overnight", price: "$50", note: "per night · in our home" },
  { name: "Holiday rate", price: "$60", note: "per night" },
  { name: "Additional dog", price: "+$40", note: "per dog per night" },
  { name: "Puppy rate", price: "$55", note: "per night" },
  { name: "Bathing / grooming", price: "+$50", note: "each" },
  { name: "Extended care", price: "50–100%", note: "of nightly rate" },
] as const;

export const SERVICES = [
  {
    slug: "grooming",
    title: "Full Grooming",
    blurb: "Breed-appropriate haircut, bath, dry, ears, and nails — at your dog’s pace.",
    href: "/grooming",
  },
  {
    slug: "baths",
    title: "Baths",
    blurb: "Gentle wash, conditioner, and fluffy dry with coat-specific shampoos.",
    href: "/grooming",
  },
  {
    slug: "boarding",
    title: "Boarding",
    blurb: "Overnight stay in our calm home — structure, rest, and Fear-Free care.",
    href: "/boarding",
  },
  {
    slug: "daycare",
    title: "Daycare",
    blurb:
      "Daytime dog sitting and companionship for pups who need play, rest, and a familiar face.",
    href: "/boarding",
  },
] as const;
