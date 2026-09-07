"use client";

import { DemoNavLink } from "@/components/demo/DemoNav";
import DemoContactForm from "@/components/demo/DemoContactForm";
import { MapPin, Clock, Phone } from "@/components/icons";

/**
 * EMBER — restaurant.
 *
 * Lit the way the room is: one warm source low on the left, everything else
 * falling off into charcoal. The menu is a typed list with dot leaders rather
 * than photo cards — a kitchen that rewrites its menu weekly cannot keep a
 * photograph per dish true, and a list scans faster anyway. Booking is the only
 * high-contrast element on the page, so the one action that matters is the one
 * thing that glows.
 */

const MENU = [
  {
    course: "To begin",
    items: [
      ["Flatbread, ember butter, wild garlic", "9"],
      ["Grilled sardine, burnt lemon, parsley", "14"],
      ["Charred leeks, hazelnut, aged sheep's cheese", "12"],
      ["Beef tartare, smoked yolk, sourdough crisp", "17"],
    ],
  },
  {
    course: "From the fire",
    items: [
      ["Whole plaice, brown butter, capers", "34"],
      ["Dry-aged sirloin, bone marrow, watercress", "42"],
      ["Half chicken, fermented chilli, charred lime", "29"],
      ["Hispi cabbage, black garlic, pine nut", "21"],
    ],
  },
  {
    course: "To finish",
    items: [
      ["Burnt basque cheesecake", "11"],
      ["Smoked chocolate tart, crème fraîche", "12"],
      ["Poached quince, bay leaf ice cream", "10"],
    ],
  },
];

export default function Ember() {
  return (
    <div
      className="font-sans"
      style={
        {
          "--demo-bg": "#0d0b0a",
          "--demo-fg": "#f6ece4",
          "--demo-muted": "#bd9e8a",
          "--demo-accent": "#e2661f",
          "--demo-accent-fg": "#140b06",
          "--demo-line": "rgba(246,236,228,0.12)",
          "--demo-line-strong": "rgba(246,236,228,0.26)",
          background: "var(--demo-bg)",
          color: "var(--demo-fg)",
        } as React.CSSProperties
      }
    >
      {/* --- nav ------------------------------------------------------- */}
      <header className="sticky top-0 z-20 border-b border-[var(--demo-line)] bg-[#0d0b0a]/93 backdrop-blur">
        <div className="flex items-center justify-between px-9 py-4 mv:px-4 mv:py-3">
          <DemoNavLink to="ember-hero" className="tap-target font-display text-xl tracking-[0.3em]">
            EMBER
          </DemoNavLink>

          <nav className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] mv:hidden">
            {[
              ["Menu", "ember-menu"],
              ["Wine", "ember-menu"],
              ["The room", "ember-about"],
              ["Find us", "ember-contact"],
            ].map(([label, to]) => (
              <DemoNavLink
                key={label}
                to={to}
                className="tap-target text-[var(--demo-muted)] transition-colors hover:text-[var(--demo-fg)]"
              >
                {label}
              </DemoNavLink>
            ))}
          </nav>

          <DemoNavLink
            to="ember-contact"
            className="inline-flex min-h-11 items-center px-5 text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-88 mv:min-h-10 mv:px-3.5 mv:text-[10px]"
            style={{ background: "var(--demo-accent)", color: "var(--demo-accent-fg)" }}
          >
            Book a table
          </DemoNavLink>
        </div>
      </header>

      {/* --- hero ------------------------------------------------------- */}
      <section
        id="ember-hero"
        className="relative overflow-hidden px-9 pb-24 pt-28 text-center mv:px-4 mv:pb-14 mv:pt-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 62% at 18% 104%, rgba(226,102,31,0.38) 0%, rgba(226,102,31,0) 62%), radial-gradient(46% 46% at 88% 6%, rgba(140,52,20,0.3) 0%, rgba(140,52,20,0) 60%)",
          }}
        />
        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--demo-muted)]">
            Open fire kitchen — Lisbon
          </p>
          <h1 className="mx-auto mt-7 max-w-4xl font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.03em] mv:mt-5 mv:text-[3.1rem]">
            Everything here
            <br />
            touches fire.
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-[var(--demo-muted)] mv:mt-5">
            One grill, one oven, no gas. The menu changes every Tuesday
            depending on what the boats and the farms send us, and we write it
            out by hand that afternoon.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 mv:mt-7 mv:flex-col">
            <DemoNavLink
              to="ember-contact"
              className="inline-flex min-h-12 items-center px-8 text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-88 mv:w-full mv:justify-center"
              style={{ background: "var(--demo-accent)", color: "var(--demo-accent-fg)" }}
            >
              Reserve a table
            </DemoNavLink>
            <DemoNavLink
              to="ember-menu"
              className="inline-flex min-h-12 items-center border px-8 text-[11px] uppercase tracking-[0.2em] mv:w-full mv:justify-center"
              style={{ borderColor: "var(--demo-line-strong)" }}
            >
              See this week&apos;s menu
            </DemoNavLink>
          </div>
        </div>
      </section>

      {/* --- menu -------------------------------------------------------- */}
      <section
        id="ember-menu"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-9 py-20 mv:px-4 mv:py-12"
      >
        <div className="mb-12 flex items-baseline justify-between mv:mb-8 mv:flex-col mv:items-start mv:gap-2">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-tight">
            This week
          </h2>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--demo-muted)]">
            Written Tuesday, 14 October
          </p>
        </div>

        {/* Two columns of a printed menu on desktop; one on mobile, where dot
            leaders across a 320px line stop being legible. */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-12 mv:grid-cols-1 mv:gap-y-9">
          {MENU.map((group) => (
            <div key={group.course} className={group.course === "To finish" ? "dv:col-span-2 dv:max-w-[calc(50%-2rem)]" : ""}>
              <h3 className="border-b border-[var(--demo-line)] pb-3 text-[11px] uppercase tracking-[0.26em] text-[var(--demo-accent)]">
                {group.course}
              </h3>
              <ul className="mt-5 space-y-4">
                {group.items.map(([dish, price]) => (
                  <li key={dish} className="flex items-baseline gap-3">
                    <span className="text-[15px] leading-snug mv:text-sm">{dish}</span>
                    <span
                      aria-hidden="true"
                      className="mt-auto mb-1 min-w-4 flex-1 border-b border-dotted border-[var(--demo-line-strong)]"
                    />
                    <span className="shrink-0 font-display text-lg tabular-nums">
                      {price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-lg text-xs leading-relaxed text-[var(--demo-muted)]">
          Prices in euro. A discretionary 10% is added for tables of six or
          more. Please tell us about allergies when you book — the whole kitchen
          runs on one fire and we would rather plan around it than improvise.
        </p>
      </section>

      {/* --- about ------------------------------------------------------- */}
      <section
        id="ember-about"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-9 py-20 mv:px-4 mv:py-12"
      >
        <div className="grid grid-cols-12 items-center gap-12 mv:gap-8">
          <div className="col-span-5 mv:col-span-12">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden mv:aspect-[4/3]"
              style={{
                background:
                  "radial-gradient(70% 70% at 30% 92%, #c85a22 0%, rgba(200,90,34,0) 62%), linear-gradient(160deg,#241a15 0%,#0c0908 100%)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
                style={{ backgroundImage: "var(--grain-src)", backgroundSize: "150px 150px" }}
              />
            </div>
          </div>
          <div className="col-span-7 mv:col-span-12">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--demo-muted)]">
              The room
            </p>
            <p className="mt-6 font-display text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.25] tracking-tight mv:text-xl">
              Thirty-four seats, one long counter, and a fire you can feel from
              the door.
            </p>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-[var(--demo-muted)]">
              <p>
                We took over a former tile warehouse in Alcântara in 2019 and
                built the grill first. Everything else — the counter, the
                lighting, the wine list — was arranged around it afterwards.
              </p>
              <p>
                Sit at the counter if you want to watch, at the back if you want
                to talk. There is no dress code and there is no tasting menu.
                Order two things each and share them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- contact ----------------------------------------------------- */}
      <section
        id="ember-contact"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-9 py-20 mv:px-4 mv:py-12"
      >
        <div className="grid grid-cols-12 gap-12 mv:gap-9">
          <div className="col-span-5 mv:col-span-12">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-tight">
              Find us
            </h2>
            <ul className="mt-9 space-y-6 text-sm">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 shrink-0 text-lg text-[var(--demo-accent)]" />
                <span>
                  Rua da Cozinha Velha 24
                  <br />
                  1300-088 Alcântara, Lisbon
                </span>
              </li>
              <li className="flex gap-3.5">
                <Clock className="mt-0.5 shrink-0 text-lg text-[var(--demo-accent)]" />
                <span>
                  Wednesday – Saturday, 18:00 – 23:00
                  <br />
                  Sunday lunch, 12:30 – 16:00
                  <br />
                  <span className="text-[var(--demo-muted)]">Closed Monday & Tuesday</span>
                </span>
              </li>
              <li className="flex gap-3.5">
                <Phone className="mt-0.5 shrink-0 text-lg text-[var(--demo-accent)]" />
                <a href="tel:+351210000000" className="hover:underline">
                  +351 21 000 0000
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-7 mv:col-span-12">
            <DemoContactForm
              subjectLabel="What is this about?"
              submitLabel="Send request"
              subjects={[
                "A table for 2–4",
                "A table for 5+",
                "Private dining",
                "Dietary requirements",
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
