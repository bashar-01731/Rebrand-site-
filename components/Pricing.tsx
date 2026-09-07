"use client";

import { TIERS } from "@/lib/concepts";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { useLeadForm } from "@/components/LeadForm";
import { ArrowRight, Check } from "@/components/icons";

export default function Pricing() {
  const { open } = useLeadForm();

  return (
    <section id="pricing" className="scroll-mt-24 border-t border-line py-section">
      <div className="u-container">
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="t-h2">Clear pricing. No retainers to escape from.</h2>
            <p className="mt-6 max-w-lg text-dim">
              Fixed scope, fixed starting price, quoted properly after we
              understand the business. Every project starts with the same
              conversation.
            </p>
          </div>
        </Reveal>

        <Reveal stagger each={0.1} className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:mt-20 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.id}
              className={`flex flex-col p-8 sm:p-10 ${
                t.featured ? "bg-ink-3" : "bg-ink"
              }`}
            >
              <div className="flex items-center gap-3">
                <h3 className="t-label text-bone">{t.name}</h3>
                {t.featured && (
                  <span className="t-label rounded-full border border-line-strong px-2.5 py-1 text-[10px] text-silver">
                    Most chosen
                  </span>
                )}
              </div>

              <p className="mt-7 font-display text-5xl tracking-tight">
                <span className="text-lg align-super text-silver">from </span>
                {t.from}
              </p>

              <p className="mt-5 text-sm text-dim">{t.summary}</p>

              <ul className="mt-8 flex-1 space-y-3.5 border-t border-line pt-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-dim">
                    <Check className="mt-0.5 shrink-0 text-base text-bone" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <p className="t-label mt-8 text-silver">{t.delivery}</p>

              <MagneticButton className="mt-6 block">
                <button
                  type="button"
                  onClick={() => open({ need: `${t.name} package` })}
                  className={`group inline-flex min-h-13 w-full items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    t.featured
                      ? "bg-bone text-ink hover:opacity-88"
                      : "border border-line-strong text-bone hover:border-bone hover:bg-bone/5"
                  }`}
                >
                  Start a project
                  <ArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </MagneticButton>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <p className="text-sm text-dim">
            Prices are starting points, not quotes. Complex e-commerce, custom
            integrations and ongoing content work are scoped separately.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
