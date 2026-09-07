"use client";

import { DemoNavLink } from "@/components/demo/DemoNav";
import DemoContactForm from "@/components/demo/DemoContactForm";
import { Clock, MapPin } from "@/components/icons";

/**
 * FORM — coffee.
 *
 * The only light concept in the set, and that is the decision: cream ground,
 * espresso text, copper for anything clickable. Soft radii throughout, where
 * every other concept is hard-cornered — a roastery is the one brand here that
 * should feel warm rather than sharp.
 *
 * Roast date and tasting notes carry the same weight as price, because that is
 * what a returning customer re-reads before buying the same bag again.
 */

const BAGS = [
  {
    name: "Cascade",
    origin: "Huila, Colombia",
    process: "Washed",
    notes: "Red apple, brown sugar, cocoa",
    roast: "Roasted 3 Oct",
    price: "$19",
    art: "linear-gradient(158deg,#c98f5c 0%,#8c5731 60%,#4d2f19 100%)",
  },
  {
    name: "Low Tide",
    origin: "Yirgacheffe, Ethiopia",
    process: "Natural",
    notes: "Blueberry, jasmine, stone fruit",
    roast: "Roasted 3 Oct",
    price: "$23",
    art: "linear-gradient(158deg,#d6b98f 0%,#a67c53 55%,#5a3b23 100%)",
  },
  {
    name: "Anvil",
    origin: "Blend — Brazil & Sumatra",
    process: "Espresso",
    notes: "Dark chocolate, walnut, molasses",
    roast: "Roasted 1 Oct",
    price: "$17",
    art: "linear-gradient(158deg,#8a6748 0%,#4e3320 58%,#291a10 100%)",
  },
];

const BREW = [
  ["V60", "22g in, 360g out, 2:45"],
  ["Aeropress", "18g in, 250g out, 1:30"],
  ["Espresso", "18g in, 40g out, 28s"],
  ["Batch brew", "60g per litre, 4:00"],
];

export default function FormCoffee() {
  return (
    <div
      className="font-sans"
      style={
        {
          "--demo-bg": "#f3ece1",
          "--demo-fg": "#2a1d13",
          "--demo-muted": "#6b5540",
          "--demo-accent": "#8a4f26",
          "--demo-accent-fg": "#faf5ec",
          "--demo-line": "rgba(42,29,19,0.14)",
          "--demo-line-strong": "rgba(42,29,19,0.3)",
          background: "var(--demo-bg)",
          color: "var(--demo-fg)",
        } as React.CSSProperties
      }
    >
      {/* --- nav ------------------------------------------------------- */}
      <header className="sticky top-0 z-20 border-b border-[var(--demo-line)] bg-[#f3ece1]/94 backdrop-blur">
        <div className="flex items-center justify-between px-9 py-4 mv:px-4 mv:py-3">
          <DemoNavLink to="form-hero" className="tap-target font-display text-2xl tracking-tight mv:text-xl">
            Form
            <span className="text-[var(--demo-accent)]">.</span>
          </DemoNavLink>

          <nav className="flex items-center gap-8 text-[13px] mv:hidden">
            {[
              ["Shop", "form-shop"],
              ["Subscriptions", "form-shop"],
              ["Brew guides", "form-brew"],
              ["Our café", "form-contact"],
            ].map(([label, to]) => (
              <DemoNavLink
                key={label}
                to={to}
                className="tap-target text-[var(--demo-muted)] transition-colors hover:text-[var(--demo-accent)]"
              >
                {label}
              </DemoNavLink>
            ))}
          </nav>

          <DemoNavLink
            to="form-shop"
            className="inline-flex min-h-11 items-center rounded-full px-5 text-[13px] transition-opacity hover:opacity-88 mv:px-4"
            style={{ background: "var(--demo-accent)", color: "var(--demo-accent-fg)" }}
          >
            Cart <span className="ml-1.5 opacity-80">(2)</span>
          </DemoNavLink>
        </div>
      </header>

      {/* --- hero: split, warm, rounded -------------------------------- */}
      <section id="form-hero" className="px-9 pb-16 pt-16 mv:px-4 mv:pb-10 mv:pt-9">
        <div className="grid grid-cols-12 items-center gap-12 mv:gap-8">
          <div className="col-span-6 mv:col-span-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--demo-accent)]">
              Roasted in small batches, Thursdays
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,6.4cqw,5rem)] leading-[0.98] tracking-[-0.03em] mv:mt-4 mv:text-[2.6rem]">
              Coffee that
              <br />
              tastes like
              <br />
              somewhere.
            </h1>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-[var(--demo-muted)] mv:mt-5">
              We buy from eleven farms and roast about ninety kilos a week. Every
              bag leaves the roastery within four days of the roast date printed
              on the label.
            </p>
            <div className="mt-9 flex gap-3 mv:mt-6 mv:flex-col">
              <DemoNavLink
                to="form-shop"
                className="inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm transition-opacity hover:opacity-88 mv:w-full"
                style={{ background: "var(--demo-accent)", color: "var(--demo-accent-fg)" }}
              >
                Shop the coffee
              </DemoNavLink>
              <DemoNavLink
                to="form-brew"
                className="inline-flex min-h-12 items-center justify-center rounded-full border px-7 text-sm mv:w-full"
                style={{ borderColor: "var(--demo-line-strong)" }}
              >
                Brew guides
              </DemoNavLink>
            </div>
          </div>

          <div className="col-span-6 mv:col-span-12">
            <div
              className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] mv:aspect-[4/3] mv:rounded-3xl"
              style={{
                background:
                  "radial-gradient(58% 62% at 72% 22%, #e8d3b4 0%, rgba(232,211,180,0) 66%), linear-gradient(150deg,#c49b6d 0%,#8b5f38 52%,#4a3120 100%)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
                style={{ backgroundImage: "var(--grain-src)", backgroundSize: "150px 150px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- shop ------------------------------------------------------- */}
      <section
        id="form-shop"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-9 py-16 mv:px-4 mv:py-11"
      >
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(1.75rem,3.4cqw,2.75rem)] tracking-tight">
            On the shelf
          </h2>
          <p className="text-[13px] text-[var(--demo-muted)]">
            Free shipping over $40
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-7 mv:grid-cols-1 mv:gap-6">
          {BAGS.map((b) => (
            <article
              key={b.name}
              className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-[var(--demo-line)] bg-[#faf5ec]"
            >
              <div
                className="relative aspect-[4/3] w-full overflow-hidden mv:aspect-[16/9]"
                style={{ background: b.art }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
                  style={{ backgroundImage: "var(--grain-src)", backgroundSize: "150px 150px" }}
                />
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]"
                  style={{ background: "var(--demo-bg)", color: "var(--demo-fg)" }}
                >
                  {b.process}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 mv:p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl tracking-tight">{b.name}</h3>
                  <p className="font-display text-xl tabular-nums">{b.price}</p>
                </div>
                <p className="mt-1.5 text-[13px] text-[var(--demo-muted)]">{b.origin}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed">{b.notes}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[var(--demo-accent)]">
                  {b.roast}
                </p>
                <button
                  type="button"
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border text-sm transition-colors hover:bg-[var(--demo-accent)] hover:text-[var(--demo-accent-fg)]"
                  style={{ borderColor: "var(--demo-line-strong)" }}
                >
                  Add 250g to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- brew guides + story ---------------------------------------- */}
      <section
        id="form-brew"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-9 py-16 mv:px-4 mv:py-11"
      >
        <div className="grid grid-cols-12 gap-12 mv:gap-8">
          <div className="col-span-7 mv:col-span-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--demo-accent)]">
              Our recipes
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.6rem,3cqw,2.5rem)] leading-[1.15] tracking-tight">
              Start here, then change one thing at a time.
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--demo-muted)]">
              These are the recipes we use on the bar every morning. They are a
              starting point, not a rule — grind finer if it tastes thin, coarser
              if it tastes bitter, and change nothing else until you have tasted
              the difference.
            </p>
          </div>

          <div className="col-span-5 mv:col-span-12">
            <dl className="rounded-[1.5rem] border border-[var(--demo-line)] bg-[#faf5ec]">
              {BREW.map(([method, recipe], i) => (
                <div
                  key={method}
                  className={`flex items-baseline justify-between gap-4 px-6 py-4 ${
                    i > 0 ? "border-t border-[var(--demo-line)]" : ""
                  }`}
                >
                  <dt className="font-display text-lg">{method}</dt>
                  <dd className="text-[13px] tabular-nums text-[var(--demo-muted)]">
                    {recipe}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* --- café + contact --------------------------------------------- */}
      <section
        id="form-contact"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-9 py-16 mv:px-4 mv:py-11"
      >
        <div className="grid grid-cols-12 gap-12 mv:gap-9">
          <div className="col-span-5 mv:col-span-12">
            <h2 className="font-display text-[clamp(1.75rem,3.4cqw,2.75rem)] tracking-tight">
              The café
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--demo-muted)]">
              One room, six seats, and the roaster in the back. Come in the
              morning if you want to talk to whoever roasted your bag.
            </p>
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 shrink-0 text-lg text-[var(--demo-accent)]" />
                <span>
                  41 Wharf Lane
                  <br />
                  Bristol BS1 4QA
                </span>
              </li>
              <li className="flex gap-3.5">
                <Clock className="mt-0.5 shrink-0 text-lg text-[var(--demo-accent)]" />
                <span>
                  Mon – Fri, 7:30 – 16:00
                  <br />
                  Sat – Sun, 9:00 – 16:00
                </span>
              </li>
            </ul>
          </div>

          <div className="col-span-7 mv:col-span-12">
            <DemoContactForm
              tone="light"
              subjectLabel="How can we help?"
              submitLabel="Send"
              subjects={[
                "Wholesale enquiry",
                "A subscription",
                "An existing order",
                "Something else",
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
