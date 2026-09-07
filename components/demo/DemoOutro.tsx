"use client";

import Link from "next/link";
import type { Concept } from "@/lib/concepts";
import { useLeadForm } from "@/components/LeadForm";
import { ArrowRight, ArrowLeft } from "@/components/icons";

/**
 * Closing conversion block, appended to every concept demo.
 *
 * It reads its colours from the CSS custom properties each concept site sets on
 * its root (--demo-bg / --demo-fg / --demo-muted / --demo-accent / --demo-line),
 * so it belongs to whichever world it is sitting in instead of snapping the
 * viewer back to RE:BRAND's palette one section early.
 */
export default function DemoOutro({ concept }: { concept: Concept }) {
  const { open } = useLeadForm();

  return (
    <section
      className="border-t px-6 py-16 text-center mv:px-5 mv:py-12"
      style={{
        background: "var(--demo-bg)",
        color: "var(--demo-fg)",
        borderColor: "var(--demo-line)",
      }}
    >
      <p
        className="t-label"
        style={{ color: "var(--demo-muted)" }}
      >
        Like this design?
      </p>

      <h2 className="mx-auto mt-5 max-w-xl font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-tight">
        This is a {concept.industry.toLowerCase()} concept. Yours would be built
        from scratch.
      </h2>

      <p
        className="mx-auto mt-5 max-w-md text-sm"
        style={{ color: "var(--demo-muted)" }}
      >
        {concept.name} is a fictional brand, designed and built by RE:BRAND to
        show what this industry can look like when the website is taken
        seriously.
      </p>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row mv:flex-col">
        <button
          type="button"
          onClick={() =>
            open({
              need: `A website like the ${concept.name} concept`,
              industry: industryForConcept(concept.slug),
            })
          }
          className="group inline-flex min-h-13 w-full items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-medium tracking-wide transition-opacity hover:opacity-88 sm:w-auto mv:w-full"
          style={{ background: "var(--demo-accent)", color: "var(--demo-accent-fg)" }}
        >
          Get your website
          <ArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <Link
          href="/#work"
          className="group inline-flex min-h-13 w-full items-center justify-center gap-2.5 border px-8 py-3.5 text-sm tracking-wide transition-colors sm:w-auto mv:w-full"
          style={{ borderColor: "var(--demo-line-strong)", color: "var(--demo-fg)" }}
        >
          <ArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
          Back to RE:BRAND
        </Link>
      </div>
    </section>
  );
}

/** Maps a concept onto the industry list the lead form's select actually uses. */
function industryForConcept(slug: Concept["slug"]): string {
  switch (slug) {
    case "noir":
      return "Fashion / Retail";
    case "ember":
      return "Restaurant / Café";
    case "form":
      return "Coffee / Roastery";
    case "elan":
      return "Jewelry / Luxury";
    case "arc":
      return "Real Estate";
    case "void":
      return "Barbershop / Salon";
  }
}
