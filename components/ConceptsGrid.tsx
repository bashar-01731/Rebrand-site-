"use client";

import Link from "next/link";
import { CONCEPTS, type Concept } from "@/lib/concepts";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { useLeadForm } from "@/components/LeadForm";
import { ArrowRight } from "@/components/icons";

export default function ConceptsGrid() {
  const { open } = useLeadForm();

  return (
    <section id="work" className="scroll-mt-24 border-t border-line py-section">
      <div className="u-container">
        <Reveal className="max-w-3xl">
          <h2 className="t-h2">
            Don&apos;t just look at our portfolio.{" "}
            <span className="text-silver">Explore it.</span>
          </h2>
          <p className="mt-6 max-w-xl text-dim">
            Six complete concept sites, one per industry. Every one is a real,
            scrollable website — not a screenshot. Open one and use it.
          </p>
        </Reveal>

        <Reveal
          stagger
          each={0.09}
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:mt-20 md:grid-cols-2"
        >
          {CONCEPTS.map((c, i) => (
            <ConceptCard key={c.slug} concept={c} offset={i % 2 === 1} />
          ))}
        </Reveal>

        <Reveal className="mt-24 border-t border-line pt-14 sm:mt-32">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <h3 className="t-h3 max-w-lg">Don&apos;t see your business?</h3>
              <p className="mt-4 max-w-md text-dim">
                Tell us what you do. We&apos;ll design it for you.
              </p>
            </div>
            <MagneticButton className="w-full sm:w-auto">
              <button
                type="button"
                onClick={() => open({ need: "A concept for my industry" })}
                className="group inline-flex min-h-13 w-full items-center justify-center gap-2.5 bg-bone px-8 py-3.5 text-sm font-medium tracking-wide text-ink transition-opacity hover:opacity-88 sm:w-auto"
              >
                Start your project
                <ArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ConceptCard({ concept, offset }: { concept: Concept; offset: boolean }) {
  return (
    <Link
      href={`/concepts/${concept.slug}`}
      data-cursor="VIEW"
      aria-label={`${concept.name} — ${concept.industry}. View the live concept site.`}
      className={`group block ${offset ? "lg:mt-24" : ""}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden border border-line">
        {/* Generated art direction. No stock photography anywhere in this
            project — each tile is a gradient tuned to its industry's mood. */}
        <div
          className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.045]"
          style={{ background: concept.tile.background }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
            style={{ backgroundImage: "var(--grain-src)", backgroundSize: "160px 160px" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-[clamp(2.5rem,7vw,4.75rem)] tracking-tight transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5"
              style={{ color: concept.tile.ink }}
            >
              {concept.name}
            </span>
          </div>
          <span
            className="t-label absolute left-5 top-5"
            style={{ color: concept.tile.inkDim }}
          >
            {concept.num}
          </span>
        </div>

        {/* Hover affordance that does not depend on the custom cursor — the
            cursor label is a flourish, this is the actual signal, and it is
            keyboard-reachable via focus-visible too. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-bone px-5 py-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <span className="t-label flex items-center gap-2 text-ink">
            View website
            <ArrowRight className="text-base" />
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-6">
        <div>
          <p className="t-label text-silver">{concept.industry}</p>
          <h3 className="mt-2 font-display text-2xl tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 sm:text-[1.75rem]">
            {concept.name}
          </h3>
        </div>
        <span className="t-label shrink-0 text-silver">{concept.num}</span>
      </div>
      <p className="mt-2.5 max-w-sm text-sm text-dim">{concept.tagline}</p>
    </Link>
  );
}
