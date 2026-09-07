"use client";

import { DemoNavLink } from "@/components/demo/DemoNav";
import DemoContactForm from "@/components/demo/DemoContactForm";
import { ArrowRight } from "@/components/icons";

/**
 * NOIR — fashion.
 *
 * Monochrome by rule: the only chroma allowed on the page is the garment
 * itself. The grid is deliberately asymmetric — three pieces at three scales —
 * so the collection reads like a lookbook spread rather than a product feed,
 * and the label decides what leads. Prices are set small under oversized
 * garment names, reversing the usual e-commerce hierarchy.
 */

const PIECES = [
  {
    name: "Wool Overcoat",
    detail: "Double-faced Italian wool, charcoal",
    price: "$1,240",
    art: "linear-gradient(168deg,#2e2e2c 0%,#141413 60%,#242422 100%)",
    span: "wide",
  },
  {
    name: "Silk Column Dress",
    detail: "Bias-cut sandwashed silk, ink",
    price: "$890",
    art: "linear-gradient(200deg,#3a3a37 0%,#0f0f0e 72%)",
    span: "tall",
  },
  {
    name: "Cashmere Crew",
    detail: "Two-ply Mongolian cashmere, bone",
    price: "$460",
    art: "linear-gradient(150deg,#e9e6df 0%,#b8b4ab 55%,#8d8a82 100%)",
    span: "tall",
  },
  {
    name: "Tailored Trouser",
    detail: "High-twist wool, pleated front, black",
    price: "$520",
    art: "linear-gradient(120deg,#1b1b1a 0%,#333331 48%,#0d0d0c 100%)",
    span: "wide",
  },
];

export default function Noir() {
  return (
    <div
      className="font-sans"
      style={
        {
          "--demo-bg": "#0b0b0a",
          "--demo-fg": "#f2f0ec",
          "--demo-muted": "#a8a5a0",
          "--demo-accent": "#f2f0ec",
          "--demo-accent-fg": "#0b0b0a",
          "--demo-line": "rgba(242,240,236,0.13)",
          "--demo-line-strong": "rgba(242,240,236,0.3)",
          background: "var(--demo-bg)",
          color: "var(--demo-fg)",
        } as React.CSSProperties
      }
    >
      {/* --- nav ------------------------------------------------------- */}
      <header className="sticky top-0 z-20 border-b border-[var(--demo-line)] bg-[#0b0b0a]/92 backdrop-blur">
        <div className="flex items-center justify-between px-10 py-5 mv:px-5 mv:py-3.5">
          <DemoNavLink
            to="noir-hero"
            className="tap-target font-display text-2xl tracking-[0.22em] mv:text-lg"
          >
            NOIR
          </DemoNavLink>

          <nav className="flex items-center gap-8 text-[11px] tracking-[0.2em] mv:hidden">
            {[
              ["Shop", "noir-shop"],
              ["Collection", "noir-shop"],
              ["About", "noir-about"],
              ["Contact", "noir-contact"],
            ].map(([label, to]) => (
              <DemoNavLink
                key={label}
                to={to}
                className="tap-target uppercase text-[var(--demo-muted)] transition-colors hover:text-[var(--demo-fg)]"
              >
                {label}
              </DemoNavLink>
            ))}
          </nav>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-[var(--demo-muted)] mv:gap-4">
            <span className="mv:hidden">Search</span>
            <span>
              Bag <span className="text-[var(--demo-fg)]">(0)</span>
            </span>
          </div>
        </div>

        {/* Mobile gets its own scrolling category strip rather than a hamburger
            — four destinations do not earn a menu. */}
        <nav className="u-hide-scrollbar hidden gap-6 overflow-x-auto border-t border-[var(--demo-line)] px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] mv:flex">
          {[
            ["Shop", "noir-shop"],
            ["Collection", "noir-shop"],
            ["About", "noir-about"],
            ["Contact", "noir-contact"],
          ].map(([label, to]) => (
            <DemoNavLink key={label} to={to} className="tap-target whitespace-nowrap text-[var(--demo-muted)]">
              {label}
            </DemoNavLink>
          ))}
        </nav>
      </header>

      {/* --- hero ------------------------------------------------------ */}
      <section id="noir-hero" className="px-10 pb-20 pt-24 mv:px-5 mv:pb-12 mv:pt-14">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--demo-muted)]">
          Autumn / Winter 26
        </p>
        <h1 className="mt-8 font-display text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.86] tracking-[-0.03em] mv:mt-5 mv:text-[3.6rem]">
          Nothing
          <br />
          decorative.
        </h1>
        <div className="mt-12 flex items-end justify-between gap-10 border-t border-[var(--demo-line)] pt-7 mv:mt-8 mv:flex-col mv:items-start mv:gap-6">
          <p className="max-w-md text-sm leading-relaxed text-[var(--demo-muted)]">
            Twenty-two pieces, cut from four cloths. Made in a single atelier in
            Porto and finished by hand. We release two collections a year and
            nothing in between.
          </p>
          <DemoNavLink
            to="noir-shop"
            className="group inline-flex min-h-11 shrink-0 items-center gap-3 border-b border-[var(--demo-fg)] pb-1.5 text-[11px] uppercase tracking-[0.24em] mv:w-full mv:justify-between"
          >
            View the collection
            <ArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </DemoNavLink>
        </div>
      </section>

      {/* --- collection ------------------------------------------------ */}
      <section id="noir-shop" className="scroll-mt-20 px-10 pb-24 mv:px-5 mv:pb-14">
        <div className="mb-10 flex items-baseline justify-between border-b border-[var(--demo-line)] pb-4">
          <h2 className="text-[11px] uppercase tracking-[0.28em] text-[var(--demo-muted)]">
            The collection
          </h2>
          <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--demo-muted)]">
            04 / 22
          </span>
        </div>

        {/* Asymmetric on desktop; a single full-bleed column on mobile, where a
            lookbook rhythm has nowhere to breathe. */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 mv:gap-y-10">
          {PIECES.map((p, i) => (
            <article
              key={p.name}
              className={`group col-span-6 mv:col-span-12 ${
                p.span === "wide" ? "dv:col-span-7" : "dv:col-span-5"
              } ${i % 2 === 1 ? "dv:mt-20" : ""}`}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  background: p.art,
                  aspectRatio: p.span === "wide" ? "4 / 3" : "3 / 4",
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
                  style={{
                    backgroundImage: "var(--grain-src)",
                    backgroundSize: "150px 150px",
                  }}
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight tracking-tight mv:text-2xl">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--demo-muted)]">{p.detail}</p>
                </div>
                <p className="shrink-0 pt-1 text-xs tracking-wide text-[var(--demo-muted)]">
                  {p.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- about ------------------------------------------------------ */}
      <section
        id="noir-about"
        className="scroll-mt-20 border-t border-[var(--demo-line)] px-10 py-24 mv:px-5 mv:py-14"
      >
        <div className="grid grid-cols-12 gap-10 mv:gap-8">
          <div className="col-span-4 mv:col-span-12">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--demo-muted)]">
              The atelier
            </p>
          </div>
          <div className="col-span-8 mv:col-span-12">
            <p className="font-display text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.28] tracking-tight mv:text-xl">
              We started NOIR because we were tired of buying clothes that were
              designed to be photographed rather than worn.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 text-sm leading-relaxed text-[var(--demo-muted)] mv:grid-cols-1 mv:gap-6">
              <p>
                Everything is made within forty kilometres of the mill that
                weaves the cloth. Our patterns are graded on real bodies, in
                five sizes, and we would rather cut a piece from the collection
                than ship one that only works on one of them.
              </p>
              <p>
                Two collections a year, no seasonal discounting, and a repair
                service for anything we have ever sold. If a seam goes in year
                six, send it back and we will fix it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- contact ----------------------------------------------------- */}
      <section
        id="noir-contact"
        className="scroll-mt-20 border-t border-[var(--demo-line)] px-10 py-24 mv:px-5 mv:py-14"
      >
        <div className="grid grid-cols-12 gap-12 mv:gap-9">
          <div className="col-span-5 mv:col-span-12">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-tight">
              Get in touch
            </h2>
            <dl className="mt-9 space-y-6 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.24em] text-[var(--demo-muted)]">
                  Atelier
                </dt>
                <dd className="mt-2">Rua das Flores 118, Porto</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.24em] text-[var(--demo-muted)]">
                  Email
                </dt>
                <dd className="mt-2">atelier@noir-atelier.com</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.24em] text-[var(--demo-muted)]">
                  Instagram
                </dt>
                <dd className="mt-2">@noir.atelier</dd>
              </div>
            </dl>
          </div>

          <div className="col-span-7 mv:col-span-12">
            <DemoContactForm
              tone="dark"
              subjectLabel="Enquiry"
              subjects={["Sizing & fit", "An existing order", "Repairs", "Press"]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
