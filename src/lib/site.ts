export const SITE = {
  name: "Barkly's",
  tagline: "Groom, Play & Stay",
  phoneDisplay: "(801) 696-6507",
  phoneHref: "tel:+18016966507",
  email: "barklysclt@gmail.com",
  instagram: "https://instagram.com/barklysclt",
  tiktok: "https://www.tiktok.com/@barklysclt",
  handle: "@barklysclt",
  area:
    "Charlotte, NC and surrounding towns including Fort Mill and Tega Cay",
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Meet the Groomer" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/policies", label: "Policies" },
  { to: "/book", label: "Book" },
] as const;

export const GROOM_PRICES = [
  { size: "S", range: "11–25 lbs", groom: "$75", touchUp: "$65" },
  { size: "M", range: "26–40 lbs", groom: "$85", touchUp: "$75" },
  { size: "L", range: "41–70 lbs", groom: "$95", touchUp: "$85" },
  { size: "XL", range: "71–90 lbs", groom: "$105", touchUp: "$95" },
  { size: "XL+", range: "91+ lbs", groom: "$115", touchUp: "$105" },
] as const;

export const ADD_ONS = [
  { name: "Deshedding", from: "$25–$40" },
  { name: "Nail trim", from: "$15–$20" },
  { name: "Teeth brushing", from: "$12" },
  { name: "Paw balm", from: "$8" },
  { name: "Specialty shampoo", from: "Quoted" },
] as const;

export const HOUSE_SITTING_RATES = [
  { name: "Overnight", price: "$50", note: "per night · in your home" },
  { name: "Holiday rate", price: "$60", note: "per night" },
  { name: "Additional dog", price: "+$15", note: "per dog per night" },
  { name: "Puppy rate", price: "$60", note: "per night" },
  { name: "Cat care", price: "$35", note: "per night" },
  { name: "Additional cat", price: "+$15", note: "per cat per night" },
  { name: "Extended care", price: "50–100%", note: "of nightly rate" },
] as const;

export const BOARDING_RATES = [
  { name: "Overnight", price: "$50", note: "per night · in our home" },
  { name: "Holiday rate", price: "$60", note: "per night" },
  { name: "Additional dog", price: "+$40", note: "per dog per night" },
  { name: "Puppy rate", price: "$55", note: "per night" },
  { name: "Cat care", price: "$35", note: "per night" },
  { name: "Additional cat", price: "+$23", note: "per cat per night" },
  { name: "Bathing / grooming", price: "+$50", note: "each" },
  { name: "Extended care", price: "50–100%", note: "of nightly rate" },
] as const;

export const SERVICES = [
  {
    slug: "grooming",
    title: "Full Grooming",
    blurb:
      "Breed-appropriate haircut, bath, dry, ears, and nails — at your dog’s pace.",
  },
  {
    slug: "baths",
    title: "Baths",
    blurb:
      "Gentle wash, conditioner, and fluffy dry with coat-specific shampoos.",
  },
  {
    slug: "boarding",
    title: "Boarding",
    blurb:
      "Overnight stay in our calm home — structure, rest, and Fear-Free care.",
  },
  {
    slug: "sitting",
    title: "House Sitting",
    blurb:
      "Overnight care in your home so your pets stay in their own space.",
  },
  {
    slug: "daycare",
    title: "Daycare",
    blurb:
      "Daytime companionship for pups who need play, rest, and a familiar face.",
  },
] as const;

export const GALLERY = [
  { src: "/gallery/angel-aussie.jpg", alt: "Angel, a merle Australian Shepherd in a blue paw-print bandana", name: "Angel" },
  { src: "/gallery/pom-fluff.jpg", alt: "Fluffy Pomeranian after a full groom", name: "Pomeranian" },
  { src: "/gallery/goldendoodle.jpg", alt: "Goldendoodle in a star bandana after a tidy trim", name: "Doodle" },
  { src: "/gallery/yorkie.jpg", alt: "Yorkshire Terrier in a purple bow after grooming", name: "Yorkie" },
  { src: "/gallery/doodle-brown-sit.jpg", alt: "Brown doodle puppy in a corgi bandana", name: "Doodle pup" },
  { src: "/gallery/pom-bowtie.jpg", alt: "Pomeranian wearing a blue paw-print bowtie", name: "Bowtie Pom" },
  { src: "/gallery/bernedoodle.jpg", alt: "Bernedoodle in an Easter carrot bandana", name: "Bernedoodle" },
  { src: "/gallery/aussie-pink-sit.jpg", alt: "Tri-color Australian Shepherd in a pink paw bandana", name: "Aussie" },
  { src: "/gallery/doodle-ribbons.jpg", alt: "Cream doodle with pink hair ribbons", name: "Ribbon doodle" },
  { src: "/gallery/pom-stars.jpg", alt: "Pomeranian in a navy stars-and-stripes bandana", name: "Stars Pom" },
  { src: "/gallery/black-bowtie.jpg", alt: "Black doodle mix in a plaid bowtie", name: "Plaid bowtie" },
  { src: "/gallery/doodle-watermelon.jpg", alt: "Red-and-white doodle in a watermelon bandana", name: "Summer doodle" },
  { src: "/gallery/pom-usa.jpg", alt: "Pomeranian in a red USA fireworks bandana", name: "Patriot Pom" },
  { src: "/gallery/chow.jpg", alt: "Chow Chow puppy in a blue bandana", name: "Chow pup" },
  { src: "/gallery/doodle-small.jpg", alt: "Small chocolate doodle after a tidy face trim", name: "Chocolate doodle" },
  { src: "/gallery/mixed-easter.jpg", alt: "Happy mixed-breed dog in an Easter bandana", name: "Easter smile" },
  { src: "/gallery/pom-blue.jpg", alt: "Smiling Pomeranian in a light blue bandana", name: "Blue Pom" },
  { src: "/gallery/doodle-brown-stand.jpg", alt: "Brown doodle standing after a bath and fluff", name: "Fluff stand" },
  { src: "/gallery/brindle-stars.jpg", alt: "Brindle pup in patriotic star headband and bandana", name: "Star pup" },
  { src: "/gallery/aussie-pink-side.jpg", alt: "Australian Shepherd sitting in profile after a groom", name: "Aussie profile" },
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

export const REVIEWS = [
  {
    name: "Lauren M.",
    area: "South End, Charlotte",
    quote:
      "Vanessa took her time with our anxious doodle and never rushed a single step. He hopped in the car looking proud, not stressed.",
  },
  {
    name: "Chris & Maya",
    area: "Fort Mill",
    quote:
      "We’ve been through three salons. This is the first time our schnauzer didn’t hide after a groom. The Fear Free approach is real.",
  },
  {
    name: "Priya S.",
    area: "Tega Cay",
    quote:
      "Clear communication, beautiful finish, and she treated our senior Pom like royalty. We’ll only book here from now on.",
  },
  {
    name: "Daniel R.",
    area: "Ballantyne",
    quote:
      "Home-based and still more professional than the big shops. Our Aussie came home calm, fluffy, and actually happy.",
  },
] as const;
