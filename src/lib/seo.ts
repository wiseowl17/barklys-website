import { SERVICE_AREAS, SITE } from "@/lib/site";

/** Canonical host. Apex should redirect here. */
export const CANONICAL_ORIGIN = "https://www.barklysclt.com";

/**
 * Trailing-slash policy: homepage is `https://www.barklysclt.com/`;
 * every other public URL has no trailing slash.
 */
export function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return `${CANONICAL_ORIGIN}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_ORIGIN}${normalized.replace(/\/+$/, "")}`;
}

export const OG_IMAGE_PATH = "/og.jpg";
export const OG_IMAGE_URL = `${CANONICAL_ORIGIN}${OG_IMAGE_PATH}`;

type PageHeadInput = {
  title: string;
  description: string;
  path: string;
  jsonLd?: unknown | readonly unknown[];
};

export function pageHead({ title, description, path, jsonLd }: PageHeadInput) {
  const url = canonicalUrl(path);
  const jsonLdItems = jsonLd == null ? [] : Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLdItems.map((item) => ({
      type: "application/ld+json",
      children: JSON.stringify(item),
    })),
  };
}

const areaServed = SERVICE_AREAS.map((area) => ({
  "@type": "City" as const,
  name: area.name,
  containedInPlace: {
    "@type": "State" as const,
    name: area.state === "SC" ? "South Carolina" : "North Carolina",
  },
}));

/** Home-based: locality only — no public street address. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PetGroomer"],
    "@id": `${CANONICAL_ORIGIN}/#business`,
    name: SITE.name,
    alternateName: ["Barkly's Charlotte", "Barkly's Grooming & Boarding"],
    description:
      "Fear-Free dog grooming, boarding, daycare, and in-home dog sitting serving Charlotte NC and nearby towns.",
    url: canonicalUrl("/"),
    telephone: SITE.phoneHref.replace("tel:", ""),
    email: SITE.email,
    image: OG_IMAGE_URL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Charlotte",
      addressRegion: "NC",
      addressCountry: "US",
    },
    areaServed,
    sameAs: [SITE.instagram, SITE.tiktok],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Barkly's services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dog grooming",
            url: canonicalUrl("/grooming"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dog boarding",
            url: canonicalUrl("/boarding"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dog daycare and dog sitting",
            url: canonicalUrl("/boarding"),
          },
        },
      ],
    },
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: canonicalUrl(input.path),
    provider: { "@id": `${CANONICAL_ORIGIN}/#business` },
    areaServed,
  };
}

export type FaqItem = {
  question: string;
  answer: string;
};

export function faqPageJsonLd(faqs: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
