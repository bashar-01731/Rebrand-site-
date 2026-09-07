/**
 * Shared concept metadata: everything the shell (grid, routing, case studies,
 * lead form) needs to know about the six demos.
 *
 * Deliberately NOT the place for demo page copy. Each concept demo is a bespoke
 * layout, not a reskin of a shared template, so its content lives with its own
 * component in components/demo/sites/.
 */

export const CONCEPT_SLUGS = ["noir", "ember", "form", "elan", "arc", "void"] as const;

export type ConceptSlug = (typeof CONCEPT_SLUGS)[number];

export interface Concept {
  slug: ConceptSlug;
  /** Display index, e.g. "01". Sequential content, so a number marker is earned. */
  num: string;
  industry: string;
  name: string;
  /** Fictional domain shown in the browser-frame URL bar. */
  domain: string;
  /** One-line positioning shown under the concept name on the card. */
  tagline: string;
  /** Art-direction summary used by the case studies section. */
  mood: string;
  /**
   * Generated tile art. No stock photography — layered gradients tuned to each
   * industry's colour mood, plus a texture overlay defined per concept.
   */
  tile: {
    background: string;
    /** Colour of the concept wordmark drawn onto the tile. */
    ink: string;
    /** Secondary text on the tile. Checked against the tile's own background. */
    inkDim: string;
  };
  caseStudy?: {
    brief: string;
    approach: string;
  };
}

export const CONCEPTS: Concept[] = [
  {
    slug: "noir",
    num: "01",
    industry: "Fashion Store",
    name: "NOIR",
    domain: "noir-atelier.com",
    tagline: "Monochrome editorial for a ready-to-wear label.",
    mood: "Monochrome, near-black and off-white, luxury editorial.",
    tile: {
      background:
        "linear-gradient(147deg, #1c1c1c 0%, #0b0b0b 42%, #2a2a28 100%)",
      ink: "#f4f2ee",
      inkDim: "#a9a7a1",
    },
    caseStudy: {
      brief:
        "A ready-to-wear label with a strong lookbook and a webshop that flattened it. Every garment sat in the same square card at the same size, so the collection read as a catalogue instead of a point of view.",
      approach:
        "We dropped the uniform grid. Pieces are laid out at three different scales on an asymmetric rhythm, so the eye moves the way it does through a printed lookbook, and the label decides what leads. Colour is removed entirely — the only chroma on the page is the clothing itself. Product names sit in oversized display type and the price is set small underneath, which reverses the usual e-commerce hierarchy and signals that this is a collection, not a clearance rail.",
    },
  },
  {
    slug: "ember",
    num: "02",
    industry: "Restaurant",
    name: "EMBER",
    domain: "ember-kitchen.com",
    tagline: "Fire-lit charcoal for a live-flame kitchen.",
    mood: "Deep charcoal with a warm ember glow. Moody, low-lit, appetite-forward.",
    tile: {
      background:
        "radial-gradient(72% 88% at 26% 108%, #b4471f 0%, rgba(180,71,31,0) 62%), radial-gradient(52% 62% at 82% 8%, #6d2a12 0%, rgba(109,42,18,0) 58%), linear-gradient(168deg, #171310 0%, #0c0a09 100%)",
      ink: "#f6ece4",
      inkDim: "#c6a893",
    },
    caseStudy: {
      brief:
        "A live-fire restaurant whose room is dark, warm and loud, and whose website was white, bright and silent. Guests booking at 9pm on a phone got no sense of the place they were walking into.",
      approach:
        "The page is lit the way the room is: a single warm source low on the left, everything falling off into charcoal. The menu is set as a typed list with dot leaders rather than photo cards — a kitchen changing its menu weekly cannot maintain a photo per dish, and a list is faster to scan and cheaper to keep true. Booking is the only high-contrast element on the page, so the one action that matters is the one thing that glows.",
    },
  },
  {
    slug: "form",
    num: "03",
    industry: "Coffee",
    name: "FORM",
    domain: "formcoffee.co",
    tagline: "Warm cream and espresso for a specialty roaster.",
    mood: "Light mode. Warm cream ground, espresso brown text, copper accent. Cosy and artisanal.",
    tile: {
      background:
        "radial-gradient(64% 74% at 74% 16%, #e4d3bd 0%, rgba(228,211,189,0) 66%), linear-gradient(158deg, #cbb79c 0%, #8a6a4c 58%, #4a3626 100%)",
      ink: "#2a1d13",
      inkDim: "#5c4630",
    },
    caseStudy: {
      brief:
        "A neighbourhood roaster selling bags online and pulling shots in one room. Their site had gone dark-mode-by-default because that is what the template did, and a warm room ended up feeling like a hardware store.",
      approach:
        "This is the only light concept in the set, and that is the decision. Cream ground, espresso text, copper for anything clickable — the palette is the product. Bags are shown in a calm three-column grid with the roast date and tasting notes given equal weight to the price, because that is what a returning customer actually re-reads before buying the same bag again.",
    },
  },
  {
    slug: "elan",
    num: "04",
    industry: "Jewelry",
    name: "ÉLAN",
    domain: "elan-fine.com",
    tagline: "Gold on black, and a great deal of nothing.",
    mood: "Black with warm gold. Generous negative space. Precious and quiet.",
    tile: {
      background:
        "radial-gradient(46% 56% at 50% 42%, rgba(198,161,91,0.42) 0%, rgba(198,161,91,0) 68%), linear-gradient(180deg, #12100c 0%, #07060a 100%)",
      ink: "#e9d9b4",
      inkDim: "#a68d5e",
    },
  },
  {
    slug: "arc",
    num: "05",
    industry: "Real Estate",
    name: "ARC",
    domain: "arc-property.com",
    tagline: "Structured cool grey for an architectural agency.",
    mood: "Cool architectural greys and blues, visible grid lines. Structured and confident.",
    tile: {
      background:
        "linear-gradient(160deg, #2b3440 0%, #161b22 55%, #0d1016 100%), radial-gradient(60% 60% at 20% 12%, rgba(120,150,180,0.28) 0%, rgba(120,150,180,0) 60%)",
      ink: "#e6ecf2",
      inkDim: "#9fb0c0",
    },
  },
  {
    slug: "void",
    num: "06",
    industry: "Barbershop",
    name: "VOID",
    domain: "voidbarbers.com",
    tagline: "Pure black, hard type, one red line.",
    mood: "Pure black, sharp masculine type, a single deep red accent.",
    tile: {
      background:
        "linear-gradient(112deg, #000000 0%, #000000 58%, #1a0407 78%, #45090f 100%)",
      ink: "#ffffff",
      inkDim: "#b9928f",
    },
    caseStudy: {
      brief:
        "A three-chair barbershop taking bookings through Instagram DMs. They did not need a website with a blog and an About page — they needed prices visible and a booking button that works with one thumb.",
      approach:
        "The whole site is a price list. Services are a numbered stack with the price set at display size on the right, so a walk-in can read the cost from arm's length. There is one accent colour and it is used exactly once per screen, on the thing you are meant to press. Nothing collapses into a hamburger on mobile because there are only four destinations, and a barbershop's customers do not browse — they book.",
    },
  },
];

export const CONCEPTS_BY_SLUG: Record<ConceptSlug, Concept> = Object.fromEntries(
  CONCEPTS.map((c) => [c.slug, c]),
) as Record<ConceptSlug, Concept>;

export function getConcept(slug: string): Concept | undefined {
  return CONCEPTS.find((c) => c.slug === slug);
}

export const CASE_STUDIES = CONCEPTS.filter((c) => c.caseStudy);

/* ------------------------------------------------------------------ */

export interface Tier {
  id: string;
  name: string;
  from: string;
  summary: string;
  features: string[];
  delivery: string;
  featured?: boolean;
}

export const TIERS: Tier[] = [
  {
    id: "starter",
    name: "STARTER",
    from: "$900",
    summary: "One page, done properly. For a business that needs to exist online and look credible doing it.",
    features: [
      "Single-page site",
      "Mobile responsive",
      "Contact form",
      "2 revision rounds",
    ],
    delivery: "1–2 week delivery",
  },
  {
    id: "growth",
    name: "GROWTH",
    from: "$2,400",
    summary: "A full site with its own identity. For a business that is being compared to competitors and needs to win that comparison.",
    features: [
      "Up to 6 pages",
      "Custom visual identity",
      "Lead / booking form",
      "Basic animation",
      "3 revision rounds",
    ],
    delivery: "2–4 week delivery",
    featured: true,
  },
  {
    id: "signature",
    name: "SIGNATURE",
    from: "$6,000",
    summary: "The version we would build for ourselves. For a business where the website is the first and strongest impression.",
    features: [
      "Unlimited pages",
      "3D / interactive elements",
      "Custom motion design",
      "E-commerce ready",
      "Dedicated design sprint",
    ],
    delivery: "4–8 week delivery",
  },
];

export const INDUSTRIES = [
  "Fashion / Retail",
  "Restaurant / Café",
  "Coffee / Roastery",
  "Jewelry / Luxury",
  "Real Estate",
  "Barbershop / Salon",
  "Fitness / Wellness",
  "Professional Services",
  "Other",
];

export const BUDGETS = [
  "Under $1,000",
  "$900 – $2,400",
  "$2,400 – $6,000",
  "$6,000 +",
  "Not sure yet",
];

export const CONTACT = {
  whatsapp: "+971500000000",
  whatsappHref: "https://wa.me/971500000000",
  instagram: "https://instagram.com",
  instagramHandle: "@rebrand.studio",
  email: "studio@rebrand.design",
};
