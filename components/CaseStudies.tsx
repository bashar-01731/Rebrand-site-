import Link from "next/link";
import { CASE_STUDIES } from "@/lib/concepts";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";

/**
 * Deliberately free of invented numbers. These are fictional clients, so any
 * "+240% conversion" would be a fabrication — the honest thing a studio can
 * show for concept work is the reasoning, not made-up results.
 */
export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="scroll-mt-24 border-t border-line py-section"
    >
      <div className="u-container">
        <Reveal className="max-w-3xl">
          <h2 className="t-h2">The thinking behind three of them.</h2>
          <p className="mt-6 max-w-xl text-dim">
            These are concept projects, so there are no conversion numbers to
            quote and we won&apos;t invent any. What we can show you is the brief
            and the decisions — which is the part you&apos;re actually hiring.
          </p>
        </Reveal>

        <div className="mt-16 sm:mt-24">
          {CASE_STUDIES.map((c) => (
            <Reveal
              key={c.slug}
              as="article"
              className="border-t border-line py-12 first:border-t-0 first:pt-0 sm:py-16"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <div
                    className="relative aspect-[5/4] w-full max-w-xs overflow-hidden border border-line"
                    style={{ background: c.tile.background }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
                      style={{
                        backgroundImage: "var(--grain-src)",
                        backgroundSize: "160px 160px",
                      }}
                    />
                    <span
                      className="absolute inset-0 flex items-center justify-center font-display text-4xl tracking-tight"
                      style={{ color: c.tile.ink }}
                    >
                      {c.name}
                    </span>
                  </div>

                  <p className="t-label mt-6 text-silver">
                    {c.num} — {c.industry}
                  </p>
                  <p className="mt-3 max-w-xs text-sm text-dim">{c.mood}</p>

                  <Link
                    href={`/concepts/${c.slug}`}
                    data-cursor="VIEW"
                    className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-bone underline-offset-8 hover:underline"
                  >
                    Open the live concept
                    <ArrowUpRight className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:col-span-8">
                  <div>
                    <h3 className="t-label text-silver">The brief</h3>
                    <p className="mt-4 text-dim">{c.caseStudy!.brief}</p>
                  </div>
                  <div>
                    <h3 className="t-label text-silver">The approach</h3>
                    <p className="mt-4 text-dim">{c.caseStudy!.approach}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
