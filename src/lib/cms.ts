import {
  ADD_ONS,
  BOARDING_RATES,
  GALLERY,
  GROOM_PRICES,
  HERO_SLIDES,
  SITE,
} from "@/lib/site";

export type MediaCollection = "gallery" | "hero"

export type GalleryItem = {
  src: string
  alt: string
  name: string
}

export type StudioPhoto = {
  id: number | null
  src: string
  name: string
  alt: string
  kind: "upload" | "builtin"
  hidden: boolean
  collection: MediaCollection
  sort_order: number
}

export type GroomPrice = { size: string; range: string; price: string }
export type AddonPrice = { name: string; from: string }
export type BoardingPrice = { name: string; price: string; note: string }

export type PublicCms = {
  copy: Record<string, string>
  gallery: GalleryItem[]
  hero: GalleryItem[]
  prices: {
    groom: GroomPrice[]
    addons: AddonPrice[]
    boarding: BoardingPrice[]
  }
  site: {
    phoneDisplay: string
    phoneHref: string
    email: string
    hoursDisplay: string
    area: string
    studioNote: string
  }
}

export type CopyField = {
  key: string
  label: string
  group: string
  multiline?: boolean
  defaultValue: string
}

export const COPY_FIELDS: readonly CopyField[] = [
  {
    key: "home.headline",
    label: "Home headline",
    group: "Home",
    defaultValue: "Groom, play, and stay at your dog’s pace",
  },
  {
    key: "home.subhead",
    label: "Home introduction",
    group: "Home",
    multiline: true,
    defaultValue:
      "No cages, no crowded kennel runs, no rushing your dog through a haircut. Barkly’s is a calm, home-based studio for grooming, boarding, daycare, and dog sitting — built for dogs who need a little more patience, especially the sensitive, senior, and first-time guests.",
  },
  {
    key: "home.serving",
    label: "Home serving line",
    group: "Home",
    defaultValue:
      "Serving the greater Charlotte area, Fort Mill, Tega Cay, and nearby towns · By appointment only",
  },
  {
    key: "home.cta_title",
    label: "Home closing headline",
    group: "Home",
    defaultValue: "Ready when your pup is",
  },
  {
    key: "home.cta_body",
    label: "Home closing text",
    group: "Home",
    multiline: true,
    defaultValue:
      "Pick a time that works for you. We’ll handle the rest — coat notes, Fear-Free pacing, and a calm visit, every time.",
  },
  {
    key: "about.headline",
    label: "About headline",
    group: "About",
    defaultValue: "The Fear-Free groomer behind Barkly’s",
  },
  {
    key: "about.intro",
    label: "About introduction",
    group: "About",
    multiline: true,
    defaultValue:
      "Nearly two decades in animal care, a veterinary education from Venezuela, and five years as a professional dog groomer — Vanessa brings a vet’s eye for a dog’s body language to every appointment, with a Fear Free certification at the center of it. She welcomes dogs from the greater Charlotte area and nearby towns.",
  },
  {
    key: "about.bullet_1",
    label: "About highlight 1",
    group: "About",
    defaultValue: "Trained as a veterinary doctor in Venezuela",
  },
  {
    key: "about.bullet_2",
    label: "About highlight 2",
    group: "About",
    defaultValue: "Continuing her veterinary education in the U.S. alongside her grooming practice",
  },
  {
    key: "about.bullet_3",
    label: "About highlight 3",
    group: "About",
    defaultValue: "Professional groomer with 5 years of hands-on salon experience",
  },
  {
    key: "about.bullet_4",
    label: "About highlight 4",
    group: "About",
    defaultValue:
      "Special care for poodles, schnauzers, doodles, and small breeds — all breeds welcome",
  },
  {
    key: "grooming.headline",
    label: "Grooming headline",
    group: "Grooming",
    defaultValue: "Fear-Free dog grooming in Charlotte",
  },
  {
    key: "grooming.intro",
    label: "Grooming introduction",
    group: "Grooming",
    multiline: true,
    defaultValue:
      "Full grooms, baths, and add-ons in a quiet home studio — not a loud salon floor. Every dog gets one-on-one attention at their own pace, with extra fluency in poodles, schnauzers, and doodles. All breeds welcome, from Charlotte to Fort Mill, Tega Cay, and nearby towns.",
  },
  {
    key: "boarding.headline",
    label: "Boarding headline",
    group: "Boarding",
    defaultValue: "Boarding, daycare & dog sitting",
  },
  {
    key: "boarding.intro",
    label: "Boarding introduction",
    group: "Boarding",
    multiline: true,
    defaultValue:
      "A real home, not a kennel — overnight boarding, in-home dog sitting, and daytime daycare with structure, rest, and familiar faces instead of a row of runs. For families in Charlotte, Fort Mill, Tega Cay, and nearby towns.",
  },
  {
    key: "site.area",
    label: "Service area (short)",
    group: "Contact",
    defaultValue: SITE.area,
  },
  {
    key: "site.hours",
    label: "Hours",
    group: "Contact",
    defaultValue: SITE.hoursDisplay,
  },
  {
    key: "site.phone",
    label: "Phone",
    group: "Contact",
    defaultValue: SITE.phoneDisplay,
  },
  {
    key: "site.email",
    label: "Email",
    group: "Contact",
    defaultValue: SITE.email,
  },
  {
    key: "site.studio_note",
    label: "Studio note",
    group: "Contact",
    multiline: true,
    defaultValue: SITE.studioNote,
  },
] as const

export const COPY_GROUPS = ["Home", "About", "Grooming", "Boarding", "Contact"] as const

export function defaultCopyMap(): Record<string, string> {
  const copy: Record<string, string> = {}
  for (const field of COPY_FIELDS) copy[field.key] = field.defaultValue
  copy["prices.groom"] = JSON.stringify(GROOM_PRICES)
  copy["prices.addons"] = JSON.stringify(ADD_ONS)
  copy["prices.boarding"] = JSON.stringify(BOARDING_RATES)
  return copy
}

export function cmsText(copy: Record<string, string>, key: string, fallback: string): string {
  const value = copy[key]
  return value != null && value.trim().length > 0 ? value : fallback
}

export function phoneHrefFromDisplay(display: string): string {
  const digits = display.replace(/\D/g, "")
  if (digits.length === 10) return `tel:+1${digits}`
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`
  return SITE.phoneHref
}

function parseJson<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function parseGroomPrices(copy: Record<string, string>): GroomPrice[] {
  const parsed = parseJson<GroomPrice[]>(copy["prices.groom"], [...GROOM_PRICES])
  return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...GROOM_PRICES]
}

export function parseAddonPrices(copy: Record<string, string>): AddonPrice[] {
  const parsed = parseJson<AddonPrice[]>(copy["prices.addons"], [...ADD_ONS])
  return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...ADD_ONS]
}

export function parseBoardingPrices(copy: Record<string, string>): BoardingPrice[] {
  const parsed = parseJson<BoardingPrice[]>(copy["prices.boarding"], [...BOARDING_RATES])
  return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...BOARDING_RATES]
}

export function buildPublicCms(
  stored: Record<string, string>,
  gallery: GalleryItem[],
  hero: GalleryItem[],
): PublicCms {
  const copy = { ...defaultCopyMap(), ...stored }
  const phoneDisplay = cmsText(copy, "site.phone", SITE.phoneDisplay)
  return {
    copy,
    gallery,
    hero,
    prices: {
      groom: parseGroomPrices(copy),
      addons: parseAddonPrices(copy),
      boarding: parseBoardingPrices(copy),
    },
    site: {
      phoneDisplay,
      phoneHref: phoneHrefFromDisplay(phoneDisplay),
      email: cmsText(copy, "site.email", SITE.email),
      hoursDisplay: cmsText(copy, "site.hours", SITE.hoursDisplay),
      area: cmsText(copy, "site.area", SITE.area),
      studioNote: cmsText(copy, "site.studio_note", SITE.studioNote),
    },
  }
}

export function builtinStudioPhotos(collection: MediaCollection): StudioPhoto[] {
  const source = collection === "hero" ? HERO_SLIDES : GALLERY
  return source.map((photo, index) => ({
    id: null,
    src: photo.src,
    name: photo.name,
    alt: photo.alt,
    kind: "builtin" as const,
    hidden: false,
    collection,
    sort_order: index,
  }))
}

export function fallbackPublicCms(): PublicCms {
  return buildPublicCms(
    {},
    GALLERY.map((photo) => ({ src: photo.src, alt: photo.alt, name: photo.name })),
    HERO_SLIDES.map((photo) => ({ src: photo.src, alt: photo.alt, name: photo.name })),
  )
}

export function photoUrl(id: number): string {
  return `/api/gallery-photo/${id}`
}
