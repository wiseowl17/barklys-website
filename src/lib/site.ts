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
    note: "Our home studio is in Charlotte, and Vanessa grooms one dog at a time.",
  },
  {
    name: "South End",
    state: "NC",
    note: "South End owners can book weekday appointments from 6 to 9pm, after work.",
  },
  {
    name: "South Charlotte",
    state: "NC",
    note: "South Charlotte doodles, schnauzers, and senior dogs get extra time on the table when they need it.",
  },
  {
    name: "Tega Cay",
    state: "SC",
    note: "Tega Cay families get boarding and grooming in a home, with no kennel runs.",
  },
  {
    name: "Fort Mill",
    state: "SC",
    note: "Fort Mill owners can book online or call (980) 320-0502. Every dog gets the same Fear-Free handling.",
  },
  {
    name: "Ballantyne",
    state: "NC",
    note: "Ballantyne owners book with us for a quiet first groom or a gentle bath for an older dog.",
  },
  {
    name: "Matthews",
    state: "NC",
    note: "Matthews families book full grooms and overnight stays in a home setting.",
  },
  {
    name: "Belmont",
    state: "NC",
    note: "Weeknight and weekend hours make it easy for Belmont owners to fit in a groom.",
  },
  {
    name: "Gastonia",
    state: "NC",
    note: "Anxious and first-time dogs from Gastonia get Vanessa’s Fear-Free approach.",
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
  googleReviewCount: 9,
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
  { to: "/policies", label: "Policies & FAQ" },
  { to: "/book", label: "Book" },
] as const;

/** Flatten dropdown groups so footer can emit crawlable leaf links. */
export function navLinks(items: readonly NavItem[] = NAV): NavLink[] {
  return items.flatMap((item) => ("children" in item ? [...item.children] : [item]));
}

/**
 * Priced by weight and coat, matching the Setmore menu. `price` is the full
 * groom and `touchUp` the lighter refresh (both long-haired / double-coated);
 * baths split by short vs long / double coat.
 */
export const GROOM_PRICES = [
  { size: "S", range: "0–25 lbs", price: "$75", touchUp: "$65", bathShort: "$45", bathLong: "$55" },
  { size: "M", range: "26–40 lbs", price: "$85", touchUp: "$75", bathShort: "$60", bathLong: "$70" },
  { size: "L", range: "41–70 lbs", price: "$95", touchUp: "$85", bathShort: "$80", bathLong: "$90" },
  { size: "XL", range: "71–90 lbs", price: "$105", touchUp: "$95", bathShort: "Call us", bathLong: "Call us" },
] as const;

/** House visits: studio price plus 25%, rounded to the nearest $5. */
export const HOUSE_VISIT = {
  markup: 0.25,
  roundTo: 5,
  minDogs: 2,
  /** Taken off each dog after the second. */
  extraDogDiscount: 5,
} as const;

/**
 * House-visit rules. Customers must agree to these before the request form
 * sends, and /policies lists them as "House visit policies".
 */
export const HOUSE_VISIT_RULES = [
  {
    question: "Who can book a house visit?",
    answer: "House visits are for homes with two or more dogs. For one dog, book a studio appointment.",
  },
  {
    question: "How much do house visits cost?",
    answer:
      "House visits cost 25% more than studio visits, rounded to the nearest $5, and every dog after the second gets $5 off. The full price table is on the Grooming page.",
  },
  {
    question: "What do you use in my home?",
    answer: "We bathe your dogs in your bathtub, using your water.",
  },
  {
    question: "Do you clean up after a house visit?",
    answer:
      "We vacuum up the hair after the groom, but we can’t guarantee your space will be fully clean afterward.",
  },
] as const;

/**
 * House-visit price for a studio price like "$75". Anything that isn't a plain
 * dollar amount ("Call us") passes through unchanged.
 */
export function houseVisitPrice(studio: string): string {
  const match = /^\$(\d+(?:\.\d+)?)$/.exec(studio.trim());
  if (!match) return studio;
  const raised = Number(match[1]) * (1 + HOUSE_VISIT.markup);
  return `$${Math.round(raised / HOUSE_VISIT.roundTo) * HOUSE_VISIT.roundTo}`;
}

export const ADD_ONS = [
  { name: "Deshedding", from: "$25" },
  { name: "Dematting", from: "$20–$35 by size" },
  { name: "Nail trim on its own", from: "$20" },
  { name: "Teeth brushing", from: "$6" },
  { name: "Paw balm", from: "$4" },
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

export const GALLERY = [
  {
    src: "/gallery/angel-aussie.jpg",
    alt: "Angel, a merle Australian Shepherd in a blue paw-print bandana",
    name: "Angel",
  },
  {
    src: "/gallery/pom-fluff.jpg",
    alt: "Fluffy Pomeranian after a full groom",
    name: "Pomeranian",
  },
  {
    src: "/gallery/goldendoodle.jpg",
    alt: "Goldendoodle in a star bandana after a tidy trim",
    name: "Doodle",
  },
  {
    src: "/gallery/yorkie.jpg",
    alt: "Yorkshire Terrier in a purple bow after grooming",
    name: "Yorkie",
  },
  {
    src: "/gallery/doodle-brown-sit.jpg",
    alt: "Brown doodle puppy in a corgi bandana",
    name: "Doodle pup",
  },
  {
    src: "/gallery/pom-bowtie.jpg",
    alt: "Pomeranian wearing a blue paw-print bowtie",
    name: "Bowtie Pom",
  },
  {
    src: "/gallery/bernedoodle.jpg",
    alt: "Bernedoodle in an Easter carrot bandana",
    name: "Bernedoodle",
  },
  {
    src: "/gallery/aussie-pink-sit.jpg",
    alt: "Tri-color Australian Shepherd in a pink paw bandana",
    name: "Aussie",
  },
  {
    src: "/gallery/doodle-ribbons.jpg",
    alt: "Cream doodle with pink hair ribbons",
    name: "Ribbon doodle",
  },
  {
    src: "/gallery/pom-stars.jpg",
    alt: "Pomeranian in a navy stars-and-stripes bandana",
    name: "Stars Pom",
  },
  {
    src: "/gallery/black-bowtie.jpg",
    alt: "Black doodle mix in a plaid bowtie",
    name: "Plaid bowtie",
  },
  {
    src: "/gallery/doodle-watermelon.jpg",
    alt: "Red-and-white doodle in a watermelon bandana",
    name: "Summer doodle",
  },
  {
    src: "/gallery/pom-usa.jpg",
    alt: "Pomeranian in a red USA fireworks bandana",
    name: "Patriot Pom",
  },
  { src: "/gallery/chow.jpg", alt: "Chow Chow puppy in a blue bandana", name: "Chow pup" },
  {
    src: "/gallery/doodle-small.jpg",
    alt: "Small chocolate doodle after a tidy face trim",
    name: "Chocolate doodle",
  },
  {
    src: "/gallery/mixed-easter.jpg",
    alt: "Happy mixed-breed dog in an Easter bandana",
    name: "Easter smile",
  },
  {
    src: "/gallery/pom-blue.jpg",
    alt: "Smiling Pomeranian in a light blue bandana",
    name: "Blue Pom",
  },
  {
    src: "/gallery/doodle-brown-stand.jpg",
    alt: "Brown doodle standing after a bath and fluff",
    name: "Fluff stand",
  },
  {
    src: "/gallery/brindle-stars.jpg",
    alt: "Brindle pup in patriotic star headband and bandana",
    name: "Star pup",
  },
  {
    src: "/gallery/aussie-pink-side.jpg",
    alt: "Australian Shepherd sitting in profile after a groom",
    name: "Aussie profile",
  },
] as const;

export const HERO_SLIDES = [
  GALLERY[0],
  GALLERY[1],
  GALLERY[2],
  GALLERY[3],
  GALLERY[5],
  GALLERY[6],
  GALLERY[8],
  GALLERY[11],
] as const;

/** Studio photoshoot — homepage grid (not the client gallery). */
export const HOME_SHOOT = [
  {
    src: "/shoot/vanessa-portrait.jpg",
    alt: "Vanessa Cordova sitting with Bubbles, a small white dog in a sprinkle bandana, after a Fear-Free groom",
    name: "Vanessa and Bubbles",
  },
  {
    src: "/shoot/vanessa-table-bandana.jpg",
    alt: "Vanessa brushing Bubbles on the grooming table",
    name: "At the table",
  },
  {
    src: "/shoot/vanessa-brush.jpg",
    alt: "Vanessa gently brushing Bubbles, gold comb and shears on the table",
    name: "Gentle hands",
  },
  {
    src: "/shoot/vanessa-scissors.jpg",
    alt: "Vanessa finishing a groom with gold shears on Bubbles",
    name: "The finishing cut",
  },
  {
    src: "/shoot/vanessa-floor.jpg",
    alt: "Vanessa sitting on the studio floor with Bubbles after a groom",
    name: "After the groom",
  },
  {
    src: "/shoot/vanessa-treat.jpg",
    alt: "Vanessa offering a treat to Bubbles sitting with her",
    name: "Treat time",
  },
  {
    src: "/shoot/vanessa-trick.jpg",
    alt: "Bubbles standing on hind legs for a treat from Vanessa",
    name: "Good pup",
  },
] as const;

export const REVIEWS = [
  {
    name: "Manuel",
    area: "Loki · Reviewed on Google",
    quote:
      "Vanessa is hands down the best dog groomer in the Charlotte area! Loki looked and smelled phenomenal after his appointment, you can immediately tell the care and attention to detail that went into his groom. The Fear-Free approach is so evident in how calm and happy he was. It gives such peace of mind knowing your pup is in gentle, capable hands. We will definitely be back!",
  },
  {
    name: "Claudia",
    area: "Golden · Reviewed on Google",
    quote:
      "It’s always a pleasure to leave Golden in her care. She is warm, gentle, and very professional. You can truly see the love and attention she puts into every detail, and Golden always looks absolutely beautiful. Highly recommended!",
  },
  {
    name: "Jennifer",
    area: "Reviewed on Google",
    quote:
      "I had a wonderful experience there! Vanessa was very friendly, professional, and caring. She did an amazing job. My pet looked so clean, happy, and adorable. I’m very happy with the service and will definitely be coming back.",
  },
  {
    name: "Raiza",
    area: "Cooper · Reviewed on Google",
    quote:
      "Vanessa is an excellent dog groomer. I took my dog Cooper and he looked perfect: bath, haircut, and drying were all spot on. She’s very professional, careful, and you can tell she truly loves animals. The place is calm and Cooper came out super happy. Highly recommended, we’ll definitely be back.",
  },
  {
    name: "Yany",
    area: "Reviewed on Google",
    quote:
      "I absolutely love our groomer. She is so sweet, gentle, and caring with my dogs. You can truly tell that she loves animals and treats them as if they were her own. My dogs are always happy and look absolutely adorable when they come back.",
  },
  {
    name: "Karla",
    area: "Reviewed on Google",
    quote:
      "I had a great experience with Vanessa! She was so sweet, patient, and gentle with my dog. You can really tell she loves what she does and genuinely cares about the dogs she works with. My dog looked amazing and happy after his grooming! I’m so glad I found someone I can trust. We’ll definitely be coming back. Highly recommend!",
  },
] as const;
