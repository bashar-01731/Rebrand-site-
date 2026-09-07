"use client";

import { DemoNavLink } from "@/components/demo/DemoNav";
import DemoContactForm from "@/components/demo/DemoContactForm";
import { MapPin, Clock } from "@/components/icons";

/**
 * VOID — barbershop.
 *
 * The whole site is a price list. Services are a numbered stack with the price
 * set at display size on the right, readable from arm's length — a walk-in
 * wants the cost, not a story.
 *
 * One accent colour, used once per screen, on the thing you are meant to press.
 * Nothing collapses into a hamburger: there are four destinations, and a
 * barbershop's customers do not browse, they book.
 */

const SERVICES = [
  {
    n: "01",
    name: "Skin Fade",
    time: "45 min",
    price: "£28",
    detail: "Clipper work to the skin, blended by hand, finished with a razor line",
  },
  {
    n: "02",
    name: "Cut & Beard",
    time: "60 min",
    price: "£38",
    detail: "Full haircut with beard shaped, lined and hot-towel finished",
  },
  {
    n: "03",
    name: "Hot Towel Shave",
    time: "40 min",
    price: "£32",
    detail: "Traditional straight razor, two passes, cold towel and balm",
  },
  {
    n: "04",
    name: "The Full Hour",
    time: "75 min",
    price: "£55",
    detail: "Cut, shave, beard oil and a whisky. Booked in the back chair only",
  },
  {
    n: "05",
    name: "Under 12s",
    time: "30 min",
    price: "£18",
    detail: "First haircuts welcome. We keep the clippers quiet and the mirror low",
  },
];

const BARBERS = [
  ["Dez", "Fades, afro texture", "12 years"],
  ["Marek", "Scissor work, classic", "9 years"],
  ["Ollie", "Beards, straight razor", "6 years"],
];

export default function Void() {
  return (
    <div
      className="font-[family-name:var(--font-oswald)]"
      style={
        {
          "--demo-bg": "#000000",
          "--demo-fg": "#ffffff",
          "--demo-muted": "#a8a8a8",
          "--demo-accent": "#e63946",
          "--demo-accent-fg": "#000000",
          "--demo-line": "rgba(255,255,255,0.14)",
          "--demo-line-strong": "rgba(255,255,255,0.32)",
          background: "var(--demo-bg)",
          color: "var(--demo-fg)",
        } as React.CSSProperties
      }
    >
      {/* --- nav: four items, always visible, never a hamburger -------- */}
      <header className="sticky top-0 z-20 border-b border-[var(--demo-line)] bg-black/95 backdrop-blur">
        <div className="flex items-center justify-between px-8 py-3.5 mv:px-4 mv:py-3">
          <DemoNavLink
            to="void-hero"
            className="tap-target text-2xl font-bold uppercase tracking-[0.16em] mv:text-lg"
          >
            VOID
          </DemoNavLink>

          <nav className="flex items-center gap-7 text-[13px] font-medium uppercase tracking-[0.14em] mv:hidden">
            {[
              ["Prices", "void-services"],
              ["Barbers", "void-barbers"],
              ["Shop", "void-about"],
              ["Find us", "void-contact"],
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
            to="void-contact"
            className="inline-flex min-h-11 items-center px-5 text-[13px] font-bold uppercase tracking-[0.14em] transition-opacity hover:opacity-88 mv:px-4 mv:text-xs"
            style={{ background: "var(--demo-accent)", color: "var(--demo-accent-fg)" }}
          >
            Book
          </DemoNavLink>
        </div>

        {/* Mobile keeps the same four items on one row. Nothing hides. */}
        <nav className="hidden justify-between border-t border-[var(--demo-line)] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] mv:flex">
          {[
            ["Prices", "void-services"],
            ["Barbers", "void-barbers"],
            ["Shop", "void-about"],
            ["Find us", "void-contact"],
          ].map(([label, to]) => (
            <DemoNavLink key={label} to={to} className="tap-target min-h-9 text-[var(--demo-muted)]">
              {label}
            </DemoNavLink>
          ))}
        </nav>
      </header>

      {/* --- hero ------------------------------------------------------- */}
      <section id="void-hero" className="px-8 pb-16 pt-20 mv:px-4 mv:pb-10 mv:pt-10">
        <h1 className="text-[clamp(3.5rem,13cqw,8.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.02em] mv:text-[3.5rem]">
          Sharp
          <br />
          <span style={{ color: "var(--demo-accent)" }}>every</span>
          <br />
          time.
        </h1>

        <div className="mt-12 flex items-end justify-between gap-10 border-t-2 border-[var(--demo-fg)] pt-6 mv:mt-8 mv:flex-col mv:items-start mv:gap-5">
          <p className="max-w-md font-sans text-sm leading-relaxed text-[var(--demo-muted)]">
            Three chairs on Bold Street. Walk in before noon or book a chair for
            the afternoon — either way you are out in under an hour.
          </p>
          <DemoNavLink
            to="void-contact"
            className="inline-flex min-h-13 shrink-0 items-center px-8 text-sm font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-88 mv:w-full mv:justify-center"
            style={{ background: "var(--demo-accent)", color: "var(--demo-accent-fg)" }}
          >
            Book a chair
          </DemoNavLink>
        </div>
      </section>

      {/* --- services: the price list is the site ----------------------- */}
      <section
        id="void-services"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-8 py-14 mv:px-4 mv:py-10"
      >
        <h2 className="text-[clamp(1.75rem,4cqw,3rem)] font-bold uppercase tracking-[-0.01em]">
          Prices
        </h2>

        <ul className="mt-8">
          {SERVICES.map((s) => (
            <li
              key={s.n}
              className="group flex items-center gap-8 border-b border-[var(--demo-line)] py-7 transition-colors hover:bg-white/[0.04] mv:gap-4 mv:py-5"
            >
              <span className="w-10 shrink-0 font-sans text-xs tabular-nums text-[var(--demo-muted)] mv:w-7">
                {s.n}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[clamp(1.35rem,2.6cqw,2.25rem)] font-medium uppercase leading-none tracking-[-0.01em] mv:text-xl">
                  {s.name}
                </h3>
                <p className="mt-2.5 font-sans text-[13px] leading-snug text-[var(--demo-muted)]">
                  {s.detail}
                </p>
              </div>
              <span className="shrink-0 text-right">
                <span className="block text-[clamp(1.5rem,3cqw,2.5rem)] font-bold leading-none tabular-nums mv:text-2xl">
                  {s.price}
                </span>
                <span className="mt-2 block font-sans text-[11px] uppercase tracking-[0.14em] text-[var(--demo-muted)]">
                  {s.time}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* --- barbers ------------------------------------------------------ */}
      <section
        id="void-barbers"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-8 py-14 mv:px-4 mv:py-10"
      >
        <h2 className="text-[clamp(1.75rem,4cqw,3rem)] font-bold uppercase tracking-[-0.01em]">
          The chairs
        </h2>

        <div className="mt-8 grid grid-cols-3 gap-6 mv:grid-cols-1 mv:gap-4">
          {BARBERS.map(([name, skill, years], i) => (
            <article key={name} className="border border-[var(--demo-line)] p-6 mv:p-5">
              <div
                className="mb-6 aspect-square w-full mv:mb-4 mv:aspect-[16/9]"
                aria-hidden="true"
                style={{
                  background: [
                    "linear-gradient(150deg,#2a2a2a 0%,#0a0a0a 70%)",
                    "linear-gradient(150deg,#332022 0%,#0a0a0a 70%)",
                    "linear-gradient(150deg,#1f1f22 0%,#0a0a0a 70%)",
                  ][i],
                }}
              />
              <h3 className="text-2xl font-medium uppercase leading-none">{name}</h3>
              <p className="mt-3 font-sans text-[13px] text-[var(--demo-muted)]">{skill}</p>
              <p
                className="mt-4 font-sans text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--demo-accent)" }}
              >
                {years} behind the chair
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* --- shop / story -------------------------------------------------- */}
      <section
        id="void-about"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-8 py-14 mv:px-4 mv:py-10"
      >
        <div className="grid grid-cols-12 gap-10 mv:gap-7">
          <div className="col-span-6 mv:col-span-12">
            <h2 className="text-[clamp(1.5rem,3cqw,2.5rem)] font-bold uppercase leading-[1.05]">
              No appointment,
              <br />
              no problem.
            </h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-[var(--demo-muted)]">
              We hold the front two chairs for walk-ins every morning until
              noon. After that it is bookings only, because we would rather turn
              you away at the door than keep you waiting forty minutes for a
              thirty minute cut.
            </p>
          </div>
          <div className="col-span-6 mv:col-span-12">
            <ul className="font-sans text-sm">
              {[
                ["Sea salt spray, 150ml", "£14"],
                ["Matte clay, 100ml", "£16"],
                ["Beard oil, cedar & lime", "£19"],
                ["Straight razor, carbon steel", "£85"],
              ].map(([item, price]) => (
                <li
                  key={item}
                  className="flex items-center justify-between border-b border-[var(--demo-line)] py-4"
                >
                  <span>{item}</span>
                  <span className="font-medium tabular-nums">{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- contact -------------------------------------------------------- */}
      <section
        id="void-contact"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-8 py-14 mv:px-4 mv:py-10"
      >
        <div className="grid grid-cols-12 gap-12 mv:gap-9">
          <div className="col-span-5 mv:col-span-12">
            <h2 className="text-[clamp(1.75rem,4cqw,3rem)] font-bold uppercase tracking-[-0.01em]">
              Find us
            </h2>
            <ul className="mt-8 space-y-5 font-sans text-sm">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 shrink-0 text-lg" style={{ color: "var(--demo-accent)" }} />
                <span>
                  88 Bold Street
                  <br />
                  Liverpool L1 4HR
                </span>
              </li>
              <li className="flex gap-3.5">
                <Clock className="mt-0.5 shrink-0 text-lg" style={{ color: "var(--demo-accent)" }} />
                <span>
                  Tue – Fri, 9:00 – 19:00
                  <br />
                  Saturday, 8:00 – 17:00
                  <br />
                  <span className="text-[var(--demo-muted)]">Closed Sunday & Monday</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="col-span-7 mv:col-span-12">
            <DemoContactForm
              subjectLabel="Which service?"
              submitLabel="Request booking"
              subjects={SERVICES.map((s) => `${s.name} — ${s.price}`)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
