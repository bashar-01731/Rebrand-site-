"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Custom cursor: a small dot that gains a labelled pill over interactive
 * elements. Opt in per element with `data-cursor="VIEW"`.
 *
 * Deliberate constraints:
 * - Fine pointers only; touch devices never mount it and never lose the OS cursor.
 * - The dot tracks the pointer with a 60ms follow, so pointing stays accurate
 *   even though the native cursor is hidden. Only the label lags.
 * - Text fields keep the native I-beam (see `cursor: auto` rule below): losing
 *   the caret affordance in a form is a real usability cost for no visual gain.
 * - Never the only signal for anything — every hover state it accompanies also
 *   has a non-cursor counterpart.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!fine || prefersReducedMotion()) return;

    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [fine]);

  useEffect(() => {
    const dot = dotRef.current;
    const pill = pillRef.current;
    if (!fine || !dot || !pill || prefersReducedMotion()) return;

    const x = gsap.quickTo(dot, "x", { duration: 0.06, ease: "none" });
    const y = gsap.quickTo(dot, "y", { duration: 0.06, ease: "none" });
    const px = gsap.quickTo(pill, "x", { duration: 0.32, ease: "power3.out" });
    const py = gsap.quickTo(pill, "y", { duration: 0.32, ease: "power3.out" });

    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.to([dot, pill], { autoAlpha: 1, duration: 0.2 });
      }
      x(e.clientX);
      y(e.clientY);
      px(e.clientX);
      py(e.clientY);
    };

    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      const hit = target?.closest?.("[data-cursor]") as HTMLElement | null;
      if (hit) {
        setLabel(hit.dataset.cursor || "OPEN");
        return;
      }
      const interactive = target?.closest?.(
        "a, button, [role='button'], input, select, textarea",
      );
      setLabel(interactive ? "" : null);
    };

    const onDown = () => gsap.to(dot, { scale: 0.6, duration: 0.18 });
    const onUp = () => gsap.to(dot, { scale: 1, duration: 0.3 });
    const onLeave = () => {
      visible = false;
      gsap.to([dot, pill], { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([dot, pill]);
    };
  }, [fine]);

  if (!fine) return null;

  const expanded = label !== null && label !== "";

  return (
    <>
      {/* aria-hidden throughout: this is pure decoration layered over the real
          hover/focus states, and must never be announced. */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone opacity-0 md:block"
        style={{
          width: label === null ? 6 : 10,
          height: label === null ? 6 : 10,
          transition: "width 220ms var(--ease-out-expo), height 220ms var(--ease-out-expo)",
        }}
      />
      <div
        ref={pillRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden opacity-0 md:block"
      >
        <div
          className="t-label flex items-center justify-center whitespace-nowrap rounded-full bg-bone px-3 text-ink"
          style={{
            transform: `translate(18px, 14px) scale(${expanded ? 1 : 0.4})`,
            opacity: expanded ? 1 : 0,
            height: 30,
            transition:
              "transform 320ms var(--ease-out-expo), opacity 220ms var(--ease-out-expo)",
          }}
        >
          {label || ""}
        </div>
      </div>
    </>
  );
}
