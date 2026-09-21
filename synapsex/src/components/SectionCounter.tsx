import { motion } from 'framer-motion';

interface SectionCounterProps {
  index: number;
  total: number;
  visible: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Fixed film-style position counter, bottom-left. */
export default function SectionCounter({ index, total, visible }: SectionCounterProps) {
  return (
    <motion.div
      className="pointer-events-none fixed right-4 top-24 z-40 flex items-baseline gap-1 sm:right-6 md:right-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.span
        key={index}
        className="text-[13px] tabular-nums text-ink sm:text-[15px]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {pad(index + 1)}
      </motion.span>
      <span className="text-[13px] tabular-nums text-ink/35 sm:text-[15px]">
        / {pad(total)}
      </span>
    </motion.div>
  );
}
