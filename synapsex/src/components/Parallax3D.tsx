import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface Parallax3DProps {
  children: ReactNode;
  /** Degrees of tilt at the extremes. Larger reads as a steeper fall. */
  tilt?: number;
  /** How far the content travels on the depth axis, in px. */
  depth?: number;
  className?: string;
}

/**
 * Tilts its content through 3D space as the section scrolls past: content
 * arrives leaning back from below, comes upright while it holds the viewport,
 * and leans away as it leaves — so scrolling reads as moving through depth
 * rather than sliding a flat page.
 *
 * The transform sits on an inner element, never on the <section> itself, so
 * the scroll-snap targets and the fixed navbar are unaffected.
 */
export default function Parallax3D({
  children,
  tilt = 12,
  depth = 90,
  className = '',
}: Parallax3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Heavy spring: the tilt trails the scroll, which is what makes it read as
  // weight rather than a value being set.
  const p = useSpring(scrollYProgress, { stiffness: 42, damping: 26, mass: 1.1 });

  const rotateX = useTransform(p, [0, 0.42, 0.58, 1], [tilt, 0, 0, -tilt]);
  const z = useTransform(p, [0, 0.5, 1], [-depth, 0, -depth]);
  const scale = useTransform(p, [0, 0.5, 1], [0.94, 1, 0.94]);
  const opacity = useTransform(p, [0, 0.18, 0.82, 1], [0.35, 1, 1, 0.35]);

  return (
    <div ref={ref} style={{ perspective: 1200 }} className={className}>
      <motion.div
        style={{ rotateX, z, scale, opacity, transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
