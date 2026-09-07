"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, useFinePointer, prefersReducedMotion } from "@/lib/motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to drift toward the cursor, in px. */
  strength?: number;
}

/**
 * Cursor-follow with an elastic release. Wrapper-only — it never owns the
 * interactive element itself, so the button/link inside keeps its own
 * semantics, focus ring and 44px hit area.
 *
 * Fine pointers only. On touch there is no cursor to be magnetic toward, and
 * the transform would just fight the tap.
 */
export default function MagneticButton({
  children,
  className,
  strength = 14,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || prefersReducedMotion()) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      quickX(gsap.utils.clamp(-1, 1, dx) * strength);
      quickY(gsap.utils.clamp(-1, 1, dy) * strength);
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [fine, strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
