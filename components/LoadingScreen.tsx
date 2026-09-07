"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const SESSION_KEY = "rebrand:intro-seen";

/**
 * Intro screen. Short by design — it is a curtain, not an experience.
 *
 * Shown once per browsing session, skipped entirely for reduced-motion users,
 * and `aria-hidden` throughout so assistive tech reads the real page rather
 * than a progress bar it cannot act on.
 */
export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode / storage blocked — treat as seen and skip the curtain.
    }
    if (seen || prefersReducedMotion()) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = rootRef.current;
    if (!root) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        setMounted(false);
      },
    });

    tl.fromTo(
      markRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
        0.15,
      )
      .to(markRef.current, { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" }, "+=0.1")
      .to(root, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, "-=0.2");

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
    >
      <div ref={markRef} className="text-center">
        <div className="font-display text-4xl tracking-tight sm:text-5xl">RE:BRAND</div>
        <div className="t-label mt-4 text-silver">Creative Digital Studio</div>
      </div>
      <div className="mt-12 h-px w-40 overflow-hidden bg-line sm:w-56">
        <div ref={barRef} className="h-full w-full origin-left bg-bone" />
      </div>
    </div>
  );
}
