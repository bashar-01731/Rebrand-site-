import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export type Align = 'left' | 'right' | 'center';

interface SectionProps {
  id: string;
  /** Sequential marker; the page is one ordered narrative, so it is real information. */
  num: string;
  eyebrow: string;
  heading: ReactNode;
  body?: string;
  align?: Align;
  children?: ReactNode;
}

const COLUMN: Record<Align, string> = {
  left: 'items-start text-left',
  right: 'items-end text-right ml-auto',
  center: 'items-center text-center mx-auto',
};

/**
 * One full-viewport stage of the experience.
 *
 * The brief asks for text animation tied to the scroll timeline rather than
 * fired on entry, so opacity, lift, blur and scale are all read from this
 * section's own scroll progress: the copy resolves as the section takes the
 * viewport and dissolves as it leaves, and scrolling back up reverses it.
 */
export default function Section({
  id,
  num,
  eyebrow,
  heading,
  body,
  align = 'left',
  children,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 26, mass: 0.6 });

  // Peaks while the section holds the viewport, falls away at both edges.
  const opacity = useTransform(p, [0.12, 0.34, 0.66, 0.88], [0, 1, 1, 0]);
  const y = useTransform(p, [0.12, 0.38, 0.62, 0.88], [70, 0, 0, -70]);
  const scale = useTransform(p, [0.12, 0.38, 0.62, 0.88], [0.97, 1, 1, 0.99]);
  const blurPx = useTransform(p, [0.12, 0.34, 0.66, 0.88], [7, 0, 0, 7]);
  const filter = useTransform(blurPx, (v) => `blur(${v.toFixed(2)}px)`);

  return (
    <section
      ref={ref}
      id={id}
      className="relative flex h-screen h-[100dvh] w-full items-center px-6 sm:px-10 md:px-16"
    >
      <motion.div
        className={`flex w-full max-w-xl flex-col gap-5 ${COLUMN[align]}`}
        style={{ opacity, y, scale, filter }}
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink/40 sm:text-[12px]">
          <span className="tabular-nums">{num}</span>
          <span className="mx-2 text-ink/25">—</span>
          {eyebrow}
        </p>

        <h2 className="text-[clamp(34px,6.5vw,68px)] font-light leading-[1.02] tracking-[-0.035em] text-ink text-balance">
          {heading}
        </h2>

        {body && (
          <p className="max-w-md text-[14px] leading-relaxed text-ink/55 sm:text-[16px]">{body}</p>
        )}

        {children}
      </motion.div>
    </section>
  );
}
