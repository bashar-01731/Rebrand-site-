/**
 * The trades a visitor can pick from, and the art direction each one gets.
 *
 * Every concept is a real set of design decisions — palette, typeface, the
 * shape of the layout — not a recolour of one template, because the point of
 * the picker is to show that the studio treats trades differently.
 */
export interface Concept {
  id: string;
  /** What the visitor recognises: their own trade. */
  trade: string;
  /** The concept's own name, as a studio would label a direction. */
  name: string;
  /** One line of art direction. */
  mood: string;
  palette: {
    ground: string;
    ink: string;
    dim: string;
    accent: string;
    line: string;
  };
  /** Display face for the preview, with a real fallback stack. */
  display: string;
  /** Letter-spacing for the preview headline. */
  tracking: string;
  /** Whether the display face wants uppercase. */
  upper?: boolean;
  preview: {
    eyebrow: string;
    headline: string;
    body: string;
    cta: string;
    /** Three figures a shop of this trade would actually lead with. */
    stats: [string, string][];
  };
}

export const CONCEPTS: Concept[] = [
  {
    id: 'jewellery',
    trade: 'Jewellery',
    name: 'Aurum',
    mood: 'Near-black and warm gold. Wide margins, small type, nothing hurried.',
    palette: {
      ground: '#0E0D10',
      ink: '#F3EFE6',
      dim: 'rgba(243,239,230,0.55)',
      accent: '#C9A227',
      line: 'rgba(243,239,230,0.14)',
    },
    display: '"Playfair Display", Georgia, serif',
    tracking: '-0.02em',
    preview: {
      eyebrow: 'Since 1974',
      headline: 'Cut once,\nworn for life.',
      body: 'Every stone set by hand in the workshop above the shop.',
      cta: 'Book a viewing',
      stats: [
        ['50y', 'In the family'],
        ['1:1', 'Bespoke fittings'],
        ['GIA', 'Certified stones'],
      ],
    },
  },
  {
    id: 'coffee',
    trade: 'Coffee shop',
    name: 'Roast',
    mood: 'Warm paper and espresso brown. Chunky type, tight leading, tactile.',
    palette: {
      ground: '#F0E7DA',
      ink: '#2A1A12',
      dim: 'rgba(42,26,18,0.62)',
      accent: '#B4522B',
      line: 'rgba(42,26,18,0.16)',
    },
    display: '"Outfit", "Helvetica Neue", sans-serif',
    tracking: '-0.04em',
    preview: {
      eyebrow: 'Roasted Tuesdays',
      headline: 'Dark roast.\nNo apologies.',
      body: 'Single origin, roasted in the back, ground the minute you order.',
      cta: 'See this week’s beans',
      stats: [
        ['6am', 'Doors open'],
        ['3', 'Origins on bar'],
        ['48h', 'Bean to cup'],
      ],
    },
  },
  {
    id: 'clothing',
    trade: 'Clothing store',
    name: 'Atelier',
    mood: 'Bone and ink. Editorial scale, generous white space, photography-led.',
    palette: {
      ground: '#EFEDE8',
      ink: '#141414',
      dim: 'rgba(20,20,20,0.55)',
      accent: '#7A6A5F',
      line: 'rgba(20,20,20,0.14)',
    },
    display: '"Playfair Display", Georgia, serif',
    tracking: '-0.03em',
    preview: {
      eyebrow: 'Autumn / Winter',
      headline: 'Made to be\nworn out.',
      body: 'Cut in small runs from cloth we can name the mill for.',
      cta: 'View the lookbook',
      stats: [
        ['24', 'Pieces this run'],
        ['2', 'Fittings included'],
        ['—', 'No restocks'],
      ],
    },
  },
  {
    id: 'ecommerce',
    trade: 'Online store',
    name: 'Depot',
    mood: 'Clean white, systematic grid, one electric accent. Built to convert.',
    palette: {
      ground: '#FFFFFF',
      ink: '#101014',
      dim: 'rgba(16,16,20,0.58)',
      accent: '#2F5BFF',
      line: 'rgba(16,16,20,0.12)',
    },
    display: '"Outfit", "Helvetica Neue", sans-serif',
    tracking: '-0.035em',
    preview: {
      eyebrow: 'Free returns, always',
      headline: 'Everything,\nshipped today.',
      body: 'Order before three and it leaves the warehouse the same afternoon.',
      cta: 'Shop all',
      stats: [
        ['3pm', 'Same-day cutoff'],
        ['4.8', 'Average rating'],
        ['30d', 'Returns window'],
      ],
    },
  },
];
