import { motion } from 'framer-motion';

interface Package {
  /** Sequential marker: these are ordered by scope, so the number is real information. */
  num: string;
  name: string;
  /** Who it is for, in one line. */
  fit: string;
  deliverables: string[];
  timeline: string;
  /** Prices are quoted per project rather than invented here. */
  price: string;
  featured?: boolean;
}

const PACKAGES: Package[] = [
  {
    num: '01',
    name: 'Landing',
    fit: 'One page that has to do one job — a launch, a campaign, a single offer.',
    deliverables: [
      'Single scrolling page',
      'Copy direction',
      'Motion and interaction',
      'Analytics wired in',
    ],
    timeline: '1–2 weeks',
    price: 'On request',
  },
  {
    num: '02',
    name: 'Site',
    fit: 'A full marketing site for a business that has outgrown its template.',
    deliverables: [
      'Up to six pages',
      'Design system and components',
      'CMS so you can edit it',
      'Performance budget held',
      'Search and social setup',
    ],
    timeline: '3–5 weeks',
    price: 'On request',
    featured: true,
  },
  {
    num: '03',
    name: 'Identity',
    fit: 'Everything above, plus the brand it all has to sit on.',
    deliverables: [
      'Positioning and naming review',
      'Logo and full type system',
      'Colour and art direction',
      'Brand guidelines',
      'The site, built on it',
    ],
    timeline: '6–10 weeks',
    price: 'On request',
  },
];

const EASE = [0.215, 0.61, 0.355, 1] as const;

/**
 * The choice the visitor came to make. Three packages ordered by scope, each
 * stating who it fits, what lands, and how long it takes.
 */
export default function Services() {
  return (
    <section id="services" className="relative min-h-screen w-full">
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <motion.div
          className="mb-14 flex flex-col gap-5 border-b border-ink/10 pb-10 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div>
            <p className="mb-6 text-[12px] uppercase tracking-[0.25em] text-ink/40 sm:text-[13px]">
              03 — Engagements
            </p>
            <h2 className="text-[clamp(32px,6vw,60px)] font-light leading-[1.05] tracking-[-0.03em] text-ink">
              Pick the scope.
              <br />
              We handle the rest.
            </h2>
          </div>

          <p className="max-w-xs text-[13px] leading-relaxed text-ink/50 sm:text-[15px] md:text-right">
            Three ways in, ordered by how much ground they cover. Every one ends with a site you
            own outright.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-ink/10 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              className={`group relative flex flex-col p-8 backdrop-blur-sm transition-colors duration-500 sm:p-10 ${
                pkg.featured ? 'bg-[#E9E7EE]' : 'bg-[#F6F5F8]'
              } hover:bg-[#E3E1E9]`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
            >
              {pkg.featured && (
                <span className="absolute right-8 top-8 text-[10px] uppercase tracking-[0.2em] text-ink/35 sm:right-10 sm:top-10">
                  Most taken
                </span>
              )}

              <span className="text-[12px] tabular-nums tracking-[0.15em] text-ink/30">
                {pkg.num}
              </span>

              <h3 className="mt-5 text-[26px] font-light leading-none tracking-[-0.02em] text-ink sm:text-[30px]">
                {pkg.name}
              </h3>

              <p className="mt-4 text-[13px] leading-relaxed text-ink/55 sm:text-[14px]">
                {pkg.fit}
              </p>

              <ul className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-8">
                {pkg.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[13px] leading-snug text-ink/70 sm:text-[14px]"
                  >
                    <span aria-hidden="true" className="mt-[0.45em] h-px w-3 shrink-0 bg-ink/30" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Pushes the footer of every card to the same baseline. */}
              <div className="flex-1" />

              <dl className="mt-10 flex items-end justify-between border-t border-ink/10 pt-6">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-ink/35">Timeline</dt>
                  <dd className="mt-1.5 text-[14px] text-ink/75">{pkg.timeline}</dd>
                </div>
                <div className="text-right">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-ink/35">From</dt>
                  <dd className="mt-1.5 text-[14px] text-ink/75">{pkg.price}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/20 text-[14px] text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone"
              >
                Start with {pkg.name}
                <i className="bi bi-arrow-right text-[15px] leading-none" aria-hidden="true" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-10 text-center text-[13px] text-ink/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Not sure which fits? Tell us what you are launching and we will say so plainly.
        </motion.p>
      </div>
    </section>
  );
}
