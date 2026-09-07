"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import HeroScene from "@/components/HeroScene";
import MagneticButton from "@/components/MagneticButton";
import { useLeadForm } from "@/components/LeadForm";
import { gsap, useGsap, prefersReducedMotion } from "@/lib/motion";
import { ArrowDown, ArrowRight } from "@/components/icons";

/* Broken by hand rather than by SplitText: these three lines are the intended
   composition at every width, and each is short enough never to wrap at
   375px — which is what makes the per-line mask reveal safe. */
const LINES = ["Your business", "deserves a", "better website."];

export default function Hero() {
  const { open } = useLeadForm();
  const rootRef = useRef<HTMLElement>(null);
  const ready = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!ready || !root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      tl.set("[data-hero-line] > span", { yPercent: 108 })
        .set("[data-hero-fade]", { opacity: 0, y: 18 })
        .to("[data-hero-line] > span", {
          yPercent: 0,
          duration: 1.25,
          stagger: 0.085,
        })
        .to(
          "[data-hero-fade]",
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 },
          "-=0.75",
        );
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-24 sm:pb-28"
    >
      {/* Ambient art direction, layered behind and dimmed so the headline
          always wins the contrast fight. */}
      <HeroScene className="pointer-events-none absolute inset-0 z-0 opacity-70 sm:opacity-100" />
      {/* Two scrims rather than one. The vertical wash blends the scene into
          the section below at every width; the horizontal one only exists from
          lg up, where it darkens the left column the headline occupies and
          leaves the right half — where the device now sits — legible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink/55 via-transparent to-ink"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-[linear-gradient(to_right,var(--color-ink)_0%,var(--color-ink)_26%,transparent_64%)] lg:block"
      />

      <div className="u-container relative z-10">
        <h1 className="t-display max-w-[16ch]">
          {LINES.map((line) => (
            <span key={line} data-hero-line className="block overflow-hidden pb-[0.06em]">
              <span className="block">{line}</span>
            </span>
          ))}
        </h1>

        <p data-hero-fade className="mt-8 max-w-xl text-base text-dim sm:text-lg">
          RE:BRAND designs premium websites — built to make businesses look
          established, modern, and worth trusting.
        </p>

        <div data-hero-fade className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <MagneticButton>
            <Link
              href="#work"
              className="group inline-flex min-h-13 w-full items-center justify-center gap-2.5 bg-bone px-8 py-3.5 text-sm font-medium tracking-wide text-ink transition-opacity hover:opacity-88 sm:w-auto"
            >
              Explore our concepts
              <ArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </MagneticButton>

          <MagneticButton>
            <button
              type="button"
              onClick={() => open()}
              className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 border border-line-strong px-8 py-3.5 text-sm tracking-wide text-bone transition-colors duration-300 hover:border-bone hover:bg-bone/5 sm:w-auto"
            >
              Start a project
            </button>
          </MagneticButton>
        </div>
      </div>

      <div
        data-hero-fade
        className="u-container relative z-10 mt-16 hidden sm:mt-24 sm:block"
      >
        <Link
          href="#work"
          className="tap-target t-label inline-flex items-center gap-2.5 text-silver transition-colors duration-300 hover:text-bone"
        >
          Explore our concepts
          <ArrowDown className="animate-[bob_2.4s_ease-in-out_infinite] text-base" />
        </Link>
      </div>
    </section>
  );
}
