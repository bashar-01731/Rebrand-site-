"use client";

import { DemoNavLink } from "@/components/demo/DemoNav";
import DemoContactForm from "@/components/demo/DemoContactForm";
import { ArrowRight } from "@/components/icons";

/**
 * ARC — real estate.
 *
 * Structured on purpose. The grid is visible rather than implied, and listings
 * are data rows — reference, beds, baths, area, price — set in tabular numerals
 * so the columns line up and can actually be compared down the page. Everything
 * an agency site usually hides behind "Enquire for price" is on the row.
 *
 * Space Grotesk is the only technical grotesque in the set; the slightly
 * mechanical letterforms are doing architectural drawing, not luxury.
 */

const LISTINGS = [
  {
    ref: "ARC-114",
    name: "Warehouse Conversion",
    place: "Södermalm, Stockholm",
    beds: 3,
    baths: 2,
    area: "148 m²",
    year: 1912,
    price: "kr 9,450,000",
    status: "For sale",
    art: "linear-gradient(158deg,#3a4653 0%,#1b222b 62%,#0e1218 100%)",
  },
  {
    ref: "ARC-097",
    name: "Concrete House",
    place: "Nacka, Stockholm",
    beds: 4,
    baths: 3,
    area: "212 m²",
    year: 2019,
    price: "kr 14,200,000",
    status: "For sale",
    art: "linear-gradient(148deg,#4a5560 0%,#232b34 58%,#101419 100%)",
  },
  {
    ref: "ARC-131",
    name: "Archive Loft",
    place: "Vasastan, Stockholm",
    beds: 2,
    baths: 1,
    area: "96 m²",
    year: 1928,
    price: "kr 6,800,000",
    status: "Under offer",
    art: "linear-gradient(168deg,#333d47 0%,#1a2029 60%,#0c1015 100%)",
  },
  {
    ref: "ARC-142",
    name: "Boathouse",
    place: "Lidingö, Stockholm",
    beds: 5,
    baths: 3,
    area: "268 m²",
    year: 1974,
    price: "kr 21,900,000",
    status: "New",
    art: "linear-gradient(138deg,#3f4b58 0%,#1f272f 56%,#0d1116 100%)",
  },
];

export default function Arc() {
  return (
    <div
      className="font-[family-name:var(--font-grotesk)]"
      style={
        {
          "--demo-bg": "#0f141a",
          "--demo-fg": "#e6ecf2",
          "--demo-muted": "#9db0c2",
          "--demo-accent": "#6ea8dc",
          "--demo-accent-fg": "#0b1017",
          "--demo-line": "rgba(230,236,242,0.13)",
          "--demo-line-strong": "rgba(230,236,242,0.28)",
          background: "var(--demo-bg)",
          color: "var(--demo-fg)",
        } as React.CSSProperties
      }
    >
      {/* --- nav ------------------------------------------------------- */}
      <header className="sticky top-0 z-20 border-b border-[var(--demo-line)] bg-[#0f141a]/94 backdrop-blur">
        <div className="flex items-center justify-between px-8 py-4 mv:px-4 mv:py-3">
          <DemoNavLink to="arc-hero" className="tap-target text-xl font-bold tracking-[-0.02em]">
            ARC<span className="text-[var(--demo-accent)]">.</span>
          </DemoNavLink>

          <nav className="flex items-center gap-7 text-[13px] mv:hidden">
            {[
              ["Listings", "arc-listings"],
              ["Sold", "arc-listings"],
              ["The practice", "arc-about"],
              ["Contact", "arc-contact"],
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
            to="arc-contact"
            className="inline-flex min-h-11 items-center px-4 text-[13px] font-medium transition-opacity hover:opacity-88 mv:px-3.5 mv:text-xs"
            style={{ background: "var(--demo-accent)", color: "var(--demo-accent-fg)" }}
          >
            Book a viewing
          </DemoNavLink>
        </div>
      </header>

      {/* --- hero: the grid is visible --------------------------------- */}
      <section
        id="arc-hero"
        className="relative border-b border-[var(--demo-line)] px-8 pb-16 pt-20 mv:px-4 mv:pb-10 mv:pt-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mv:hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(230,236,242,0.055) 1px, transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
        />
        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--demo-accent)]">
            Architectural property — Stockholm
          </p>
          <h1 className="mt-7 max-w-4xl text-[clamp(2.5rem,6.6cqw,5.25rem)] font-medium leading-[0.98] tracking-[-0.035em] mv:mt-4 mv:text-[2.4rem]">
            We only sell buildings we would live in.
          </h1>

          <div className="mt-14 grid grid-cols-4 gap-px border border-[var(--demo-line)] bg-[var(--demo-line)] mv:mt-9 mv:grid-cols-2">
            {[
              ["Active listings", "24"],
              ["Sold in 2025", "61"],
              ["Average days listed", "38"],
              ["Districts covered", "9"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[var(--demo-bg)] px-6 py-6 mv:px-4 mv:py-5">
                <p className="text-3xl font-medium tabular-nums tracking-tight mv:text-2xl">
                  {value}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--demo-muted)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- listings: rows, not cards ---------------------------------- */}
      <section id="arc-listings" className="scroll-mt-16 px-8 py-16 mv:px-4 mv:py-11">
        <div className="flex items-end justify-between gap-6 border-b border-[var(--demo-line-strong)] pb-5">
          <h2 className="text-[clamp(1.5rem,3cqw,2.25rem)] font-medium tracking-[-0.02em]">
            Current listings
          </h2>
          <p className="text-[13px] text-[var(--demo-muted)]">
            4 of 24 shown
          </p>
        </div>

        {/* Column headers exist on desktop because these rows are meant to be
            compared vertically. On mobile the same data becomes a stacked card
            with its own spec grid — a four-column table at 360px is unreadable. */}
        <div className="mt-1 hidden grid-cols-24 gap-4 border-b border-[var(--demo-line)] py-3 text-[10px] uppercase tracking-[0.16em] text-[var(--demo-muted)] dv:grid">
          <span className="col-span-3">Ref</span>
          <span className="col-span-8">Property</span>
          <span className="col-span-2 text-right">Beds</span>
          <span className="col-span-2 text-right">Baths</span>
          <span className="col-span-3 text-right">Area</span>
          <span className="col-span-2 text-right">Built</span>
          <span className="col-span-4 text-right">Price</span>
        </div>

        <ul>
          {LISTINGS.map((l) => (
            <li key={l.ref} className="border-b border-[var(--demo-line)]">
              {/* Desktop row */}
              <button
                type="button"
                className="group hidden w-full grid-cols-24 items-center gap-4 py-5 text-left transition-colors hover:bg-white/[0.03] dv:grid"
              >
                <span className="col-span-3 text-[13px] tabular-nums text-[var(--demo-muted)]">
                  {l.ref}
                </span>
                <span className="col-span-8 flex items-center gap-4">
                  <span
                    className="h-12 w-16 shrink-0"
                    style={{ background: l.art }}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-base font-medium">{l.name}</span>
                    <span className="block text-[13px] text-[var(--demo-muted)]">
                      {l.place}
                    </span>
                  </span>
                </span>
                <span className="col-span-2 text-right tabular-nums">{l.beds}</span>
                <span className="col-span-2 text-right tabular-nums">{l.baths}</span>
                <span className="col-span-3 text-right tabular-nums">{l.area}</span>
                <span className="col-span-2 text-right tabular-nums text-[var(--demo-muted)]">
                  {l.year}
                </span>
                <span className="col-span-4 text-right">
                  <span className="block font-medium tabular-nums">{l.price}</span>
                  <span
                    className="block text-[11px] uppercase tracking-[0.14em]"
                    style={{
                      color:
                        l.status === "Under offer"
                          ? "var(--demo-muted)"
                          : "var(--demo-accent)",
                    }}
                  >
                    {l.status}
                  </span>
                </span>
              </button>

              {/* Mobile card — same data, genuinely different structure */}
              <div className="hidden py-5 mv:block">
                <div
                  className="relative aspect-[16/9] w-full"
                  style={{ background: l.art }}
                  aria-hidden="true"
                />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-medium">{l.name}</p>
                    <p className="text-[13px] text-[var(--demo-muted)]">{l.place}</p>
                  </div>
                  <span
                    className="shrink-0 text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      color:
                        l.status === "Under offer"
                          ? "var(--demo-muted)"
                          : "var(--demo-accent)",
                    }}
                  >
                    {l.status}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-4 gap-px border border-[var(--demo-line)] bg-[var(--demo-line)] text-center">
                  {[
                    ["Beds", l.beds],
                    ["Baths", l.baths],
                    ["Area", l.area],
                    ["Built", l.year],
                  ].map(([k, v]) => (
                    <div key={String(k)} className="bg-[var(--demo-bg)] py-2.5">
                      <dt className="text-[9px] uppercase tracking-[0.14em] text-[var(--demo-muted)]">
                        {k}
                      </dt>
                      <dd className="mt-1 text-sm tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-lg font-medium tabular-nums">{l.price}</p>
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center gap-2 border px-4 text-[13px]"
                    style={{ borderColor: "var(--demo-line-strong)" }}
                  >
                    View
                    <ArrowRight className="text-base" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* --- the practice ------------------------------------------------ */}
      <section
        id="arc-about"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-8 py-16 mv:px-4 mv:py-11"
      >
        <div className="grid grid-cols-12 gap-12 mv:gap-8">
          <div className="col-span-4 mv:col-span-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--demo-accent)]">
              The practice
            </p>
          </div>
          <div className="col-span-8 mv:col-span-12">
            <p className="text-[clamp(1.35rem,2.6cqw,2rem)] font-medium leading-[1.28] tracking-[-0.02em] mv:text-xl">
              Two of us are architects. That is the whole difference.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-8 text-[15px] leading-relaxed text-[var(--demo-muted)] mv:grid-cols-1 mv:gap-6">
              <p>
                We survey every property ourselves before we agree to list it,
                and we write the description from the survey rather than from
                the seller&apos;s brief. If a building has a problem, it is in
                the listing.
              </p>
              <p>
                We turn down roughly half of what we are offered. That is not a
                boast — it is the reason the twenty-four properties on this page
                are worth your Saturday.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- contact ------------------------------------------------------ */}
      <section
        id="arc-contact"
        className="scroll-mt-16 border-t border-[var(--demo-line)] px-8 py-16 mv:px-4 mv:py-11"
      >
        <div className="grid grid-cols-12 gap-12 mv:gap-9">
          <div className="col-span-5 mv:col-span-12">
            <h2 className="text-[clamp(1.75rem,3.4cqw,2.75rem)] font-medium tracking-[-0.025em]">
              Book a viewing
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--demo-muted)]">
              Viewings run Thursday evenings and Saturday mornings. Tell us which
              reference you are interested in and we will send three times.
            </p>
            <dl className="mt-9 space-y-5 text-[15px]">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--demo-muted)]">
                  Office
                </dt>
                <dd className="mt-1.5">Hornsgatan 42, 118 21 Stockholm</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--demo-muted)]">
                  Email
                </dt>
                <dd className="mt-1.5">viewings@arc-property.com</dd>
              </div>
            </dl>
          </div>

          <div className="col-span-7 mv:col-span-12">
            <DemoContactForm
              subjectLabel="I'm interested in"
              submitLabel="Request viewing"
              subjects={LISTINGS.map((l) => `${l.ref} — ${l.name}`)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
