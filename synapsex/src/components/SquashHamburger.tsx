import { motion } from 'framer-motion';

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 20 };

interface SquashHamburgerProps {
  isOpen: boolean;
  /** Mobile uses a tighter 15x10 box with thinner bars. */
  compact?: boolean;
}

/** Three bars that squash into an X. */
export default function SquashHamburger({ isOpen, compact = false }: SquashHamburgerProps) {
  const width = compact ? 15 : 18;
  const height = compact ? 10 : 12;
  const bar = compact ? 1.2 : 1.5;
  const center = height / 2 - bar / 2;

  const barStyle = {
    height: bar,
    width,
    borderRadius: bar,
  };

  return (
    <div className="relative" style={{ width, height }}>
      <motion.span
        className="absolute left-0 block bg-ink"
        style={{ ...barStyle, top: 0 }}
        animate={isOpen ? { rotate: 45, y: center } : { rotate: 0, y: 0 }}
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 block bg-ink"
        style={{ ...barStyle, top: center }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 block bg-ink"
        style={{ ...barStyle, bottom: 0 }}
        animate={isOpen ? { rotate: -45, y: -center } : { rotate: 0, y: 0 }}
        transition={SPRING}
      />
    </div>
  );
}
