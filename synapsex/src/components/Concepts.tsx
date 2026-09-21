import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONCEPTS } from '../concepts';

const EASE = [0.215, 0.61, 0.355, 1] as const;

/**
 * The visitor picks their trade and sees the page we would build for it —
 * rendered live in that concept's own palette and typeface, not a screenshot.
 */
export default function Concepts() {
  const [activeId, setActiveId] = useState(CONCEPTS[0].id);
  const active = CONCEPTS.find((c) => c.id === activeId) ?? CONCEPTS[0];
  const { palette: pal, preview } = active;

  return (
    <section id="concepts" className="relative w-full py-28 sm:py-32">
      {/* The picker is a tool the visitor operates, not a cinematic stage, so
          it gets its own ground. That also keeps the ink headline off the dark
          mass of the object, which otherwise cuts straight through it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(242,241,244,0) 0%, rgba(242,241,244,0.92) 12%, rgba(242,241,244,0.92) 88%, rgba(242,241,244,0) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-ink/40 sm:text-[12px]">
              <span className="tabular-nums">06</span>
              <span className="mx-2 text-ink/25">—</span>
              Your trade
            </p>
            <h2 className="text-[clamp(30px,5.5vw,56px)] font-light leading-[1.05] tracking-[-0.035em] text-ink">
              Pick what you sell.
              <br />
              See the page.
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-ink/50 sm:text-[15px] md:text-right">
            Four directions, four different sets of decisions. None of them is the same layout in
            another colour.
          </p>
        </motion.div>

        {/* Trade picker */}
        <div
          role="tablist"
          aria-label="Choose a trade"
          className="mb-8 flex flex-wrap gap-2"
        >
          {CONCEPTS.map((c) => {
            const selected = c.id === activeId;
            return (
              <button
                key={c.id}
                role="tab"
                id={`trade-${c.id}`}
                aria-selected={selected}
                aria-controls="concept-preview"
                onClick={() => setActiveId(c.id)}
                className={`h-11 rounded-full px-5 text-[13px] transition-colors duration-300 sm:text-[14px] ${
                  selected
                    ? 'bg-ink text-bone'
                    : 'border border-ink/20 text-ink/70 hover:border-ink/45 hover:text-ink'
                }`}
              >
                {c.trade}
              </button>
            );
          })}
        </div>

        {/* Live preview, rendered in the concept's own art direction */}
        <motion.div
          className="overflow-hidden rounded-xl border border-ink/12"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          {/* Browser chrome, so it reads as a page rather than a poster */}
          <div
            className="flex h-10 items-center gap-2 border-b border-ink/10 px-4"
            style={{ background: 'rgba(22,21,26,0.04)' }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="ml-3 text-[11px] text-ink/35">
              {active.name.toLowerCase()}.example
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id="concept-preview"
              role="tabpanel"
              aria-labelledby={`trade-${active.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ background: pal.ground, color: pal.ink }}
              className="px-7 py-12 sm:px-12 sm:py-16"
            >
              <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <div className="max-w-lg">
                  <p
                    className="mb-5 text-[11px] uppercase tracking-[0.24em]"
                    style={{ color: pal.accent }}
                  >
                    {preview.eyebrow}
                  </p>

                  <h3
                    className="whitespace-pre-line text-[clamp(30px,5vw,54px)] leading-[1.03]"
                    style={{ fontFamily: active.display, letterSpacing: active.tracking }}
                  >
                    {preview.headline}
                  </h3>

                  <p
                    className="mt-5 max-w-sm text-[13px] leading-relaxed sm:text-[15px]"
                    style={{ color: pal.dim }}
                  >
                    {preview.body}
                  </p>

                  <button
                    type="button"
                    tabIndex={-1}
                    className="mt-8 h-11 rounded-full px-6 text-[13px]"
                    style={{ background: pal.accent, color: pal.ground }}
                  >
                    {preview.cta}
                  </button>
                </div>

                <dl className="flex gap-8 sm:gap-12">
                  {preview.stats.map(([value, label]) => (
                    <div key={label}>
                      <dt
                        className="text-[26px] leading-none sm:text-[32px]"
                        style={{ fontFamily: active.display, letterSpacing: active.tracking }}
                      >
                        {value}
                      </dt>
                      <dd
                        className="mt-2 text-[11px] uppercase tracking-[0.14em]"
                        style={{ color: pal.dim }}
                      >
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Palette, so the direction is legible as a decision */}
              <div
                className="mt-12 flex items-center gap-3 border-t pt-6"
                style={{ borderColor: pal.line }}
              >
                {[pal.ground, pal.ink, pal.accent].map((hex) => (
                  <span
                    key={hex}
                    className="h-5 w-5 rounded-full"
                    style={{ background: hex, boxShadow: `inset 0 0 0 1px ${pal.line}` }}
                  />
                ))}
                <p className="text-[11px] leading-relaxed sm:text-[12px]" style={{ color: pal.dim }}>
                  {active.name} — {active.mood}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
