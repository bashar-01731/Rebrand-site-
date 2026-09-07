"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGsap, prefersReducedMotion } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Animate direct children on a stagger instead of the wrapper itself. */
  stagger?: boolean;
  /** Seconds of stagger between children. */
  each?: number;
  delay?: number;
  /** Travel distance in px. 0 gives a pure fade. */
  y?: number;
}

/**
 * Scroll-triggered entrance.
 *
 * The resting state is the *visible* one: GSAP sets the hidden "from" state at
 * runtime and only when motion is allowed. If JS fails, or the user prefers
 * reduced motion, the content is simply there — never a permanently invisible
 * section, which is the usual failure mode of scroll-reveal libraries.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  stagger = false,
  each = 0.08,
  delay = 0,
  y = 26,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const ready = useGsap();

  useEffect(() => {
    const el = ref.current;
    if (!ready || !el || prefersReducedMotion()) return;

    const targets: Element[] = stagger ? Array.from(el.children) : [el];
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? each : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready, stagger, each, delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
