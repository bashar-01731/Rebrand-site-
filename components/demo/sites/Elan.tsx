"use client";

import { DemoNavLink } from "@/components/demo/DemoNav";
import DemoContactForm from "@/components/demo/DemoContactForm";

/**
 * ÉLAN — jewelry.
 *
 * The design decision is the emptiness. A single narrow column, enormous
 * margins, and three pieces on the whole page — the layout is doing what a
 * vitrine does, which is to give one object more room than it needs so you
 * read it as valuable.
 *
 * Bodoni carries the display type: high stroke contrast is the typographic
 * equivalent of a polished edge, and it is the only concept here that earns it.
 */

const PIECES = [
  {
    ref: "No. 01",
    name: "Meridian Band",
    detail: "18ct recycled yellow gold, 3mm, hand-finished",
    price: "$1,850",
    art: "radial-gradient(52% 52% at 50% 44%, rgba(214,180,116,0.55) 0%, rgba(214,180,116,0) 68%), linear-gradient(180deg,#191510 0%,#0a0809 100%)",
  },
  {
    ref: "No. 02",
    name: "Sable Pendant",
    detail: "Black spinel, 0.9ct, on a 45cm gold chain",
    price: "$2,400",
    art: "radial-gradient(46% 46% at 56% 40%, rgba(198,161,91,0.4) 0%, rgba(198,161,91,0) 64%), linear-gradient(200deg,#141118 0%,#07060a 100%)",
  },
  {
    ref: "No. 03",
    name: "Quiet Signet",
    detail: "Solid 18ct gold, engraved to order",
    price: "$2,950",
    art: "radial-gradient(50% 50% at 44% 52%, rgba(228,196,136,0.48) 0%, rgba(228,196,136,0) 66%), linear-gradient(160deg,#181410 0%,#08070a 100%)",
  },
];

export default function Elan() {
  return (
    <div
      className="font-[family-name:var(--font-bodoni)]"
      style={
        {
          "--demo-bg": "#08070a",
          "--demo-fg": "#f0e9dc",
          "--demo-muted": "#a2937a",
          "--demo-accent": "#c6a15b",
          "--demo-accent-fg": "#0a0906",
          "--demo-line": "rgba(198,161,91,0.2)",
          "--demo-line-strong": "rgba(198,161,91,0.42)",
          background: "var(--demo-bg)",
          color: "var(--demo-fg)",
        } as React.CSSProperties
      }
    >
      {/* --- nav: centred, because the whole page is ------------------- */}
      <header className="sticky top-0 z-20 border-b border-[var(--demo-line)] bg-[#08070a]/94 backdrop-blur">
        <div className="flex flex-col items-center gap-4 px-10 py-6 mv:gap-3 mv:px-5 mv:py-4">
          <DemoNavLink to="elan-hero" className="tap-target text-3xl tracking-[0.34em] mv:text-xl">
            ÉLAN
          </DemoNavLink>
          <nav className="flex items-center gap-9 font-sans text-[10px] uppercase tracking-[0.26em] text-[var(--demo-muted)] mv:gap-5 mv:text-[9px]">
            {[
              ["Collection", "elan-collection"],
              ["Bespoke", "elan-story"],
              ["The house", "elan-story"],
              ["Contact", "elan-contact"],
            ].map(([label, to]) => (
              <DemoNavLink
                key={label}
                to={to}
                className="tap-target transition-colors hover:text-[var(--demo-accent)]"
              >
                {label}
              </DemoNavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* --- hero ------------------------------------------------------ */}
      <section
        id="elan-hero"
        className="px-10 py-32 text-center mv:px-6 mv:py-16"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-[var(--demo-accent)]">
          Est. Antwerp, 1998
        </p>
        <h1 className="mx-auto mt-10 max-w-2xl text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-[1.06] mv:mt-6 mv:text-[2.2rem]">
          Made once,
          <br />
          worn always.
        </h1>
        <div
          aria-hidden="true"
          className="mx-auto mt-12 h-px w-24 mv:mt-8"
          style={{ background: "var(--demo-accent)" }}
        />
        <p className="mx-auto mt-12 max-w-md font-sans text-sm leading-[1.9] text-[var(--demo-muted)] mv:mt-8">
          Eleven pieces. Each one cast, filed and polished by a single
          goldsmith, who signs the inside of the band. We do not run seasons and
          we do not discount.
        </p>
        <DemoNavLink
          to="elan-collection"
          className="mt-12 inline-flex min-h-11 items-center border-b pb-1.5 font-sans text-[10px] uppercase tracking-[0.28em] mv:mt-8"
          style={{ borderColor: "var(--demo-accent)", color: "var(--demo-accent)" }}
        >
          View the collection
        </DemoNavLink>
      </section>

      {/* --- collection: one piece per screen, alternating -------------- */}
      <section id="elan-collection" className="scroll-mt-24">
        {PIECES.map((p, i) => (
          <article
            key={p.ref}
            className="border-t border-[var(--demo-line)] px-10 py-24 mv:px-6 mv:py-14"
          >
            <div
              className={`mx-auto grid max-w-4xl grid-cols-12 items-center gap-14 mv:gap-8 ${
                i % 2 === 1 ? "dv:[direction:rtl]" : ""
              }`}
            >
              <div className="col-span-5 [direction:ltr] mv:col-span-12">
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-full mv:aspect-[4/3] mv:rounded-[2rem]"
                  style={{ background: p.art }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{
                      backgroundImage: "var(--grain-src)",
                      backgroundSize: "150px 150px",
                    }}
                  />
                </div>
              </div>

              <div className="col-span-7 [direction:ltr] mv:col-span-12">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--demo-accent)]">
                  {p.ref}
                </p>
                <h2 className="mt-6 text-[clamp(1.75rem,3.6vw,3rem)] leading-tight mv:mt-4 mv:text-2xl">
                  {p.name}
                </h2>
                <p className="mt-5 max-w-sm font-sans text-sm leading-[1.9] text-[var(--demo-muted)]">
                  {p.detail}
                </p>
                <p className="mt-8 text-2xl tabular-nums mv:mt-6">{p.price}</p>
                <button
                  type="button"
                  className="mt-8 inline-flex min-h-11 items-center px-7 font-sans text-[10px] uppercase tracking-[0.26em] transition-opacity hover:opacity-88 mv:mt-6 mv:w-full mv:justify-center"
                  style={{
                    background: "var(--demo-accent)",
                    color: "var(--demo-accent-fg)",
                  }}
                >
                  Enquire about this piece
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* --- the house --------------------------------------------------- */}
      <section
        id="elan-story"
        className="scroll-mt-24 border-t border-[var(--demo-line)] px-10 py-28 mv:px-6 mv:py-14"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-[var(--demo-accent)]">
            The house
          </p>
          <p className="mt-10 text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.45] mv:mt-6 mv:text-lg">
            &ldquo;A piece of jewellery should outlive the person who
            commissioned it. Everything we do follows from that one
            sentence.&rdquo;
          </p>
          <p className="mt-8 font-sans text-[10px] uppercase tracking-[0.26em] text-[var(--demo-muted)]">
            Margot Vandenberghe — Founder & Goldsmith
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-16 h-px w-16 mv:mt-10"
            style={{ background: "var(--demo-line-strong)" }}
          />

          <p className="mx-auto mt-16 max-w-lg font-sans text-sm leading-[1.9] text-[var(--demo-muted)] mv:mt-10">
            All gold is recycled and refined in Belgium. Stones are bought
            directly, and we will tell you the mine on request. Every piece
            carries a lifetime of free re-polishing and re-sizing, in the
            workshop it was made in.
          </p>
        </div>
      </section>

      {/* --- contact ----------------------------------------------------- */}
      <section
        id="elan-contact"
        className="scroll-mt-24 border-t border-[var(--demo-line)] px-10 py-24 mv:px-6 mv:py-14"
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-[clamp(1.75rem,3.6vw,3rem)] leading-tight">
            Make an appointment
          </h2>
          <p className="mx-auto mt-6 max-w-md text-center font-sans text-sm leading-[1.9] text-[var(--demo-muted)]">
            The workshop is open by appointment only, Tuesday to Friday.
            Hoogstraat 12, Antwerp — appointments@elan-fine.com
          </p>

          <div className="mt-12">
            <DemoContactForm
              subjectLabel="Reason for visit"
              submitLabel="Request appointment"
              subjects={[
                "A piece from the collection",
                "A bespoke commission",
                "Re-sizing or repair",
                "An engagement ring",
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
