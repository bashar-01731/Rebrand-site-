import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  visible: boolean;
}

/** Hairline that fills and empties, hinting the page keeps going. */
export default function ScrollIndicator({ visible }: ScrollIndicatorProps) {
  return (
    <motion.div
      className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
      <div className="h-10 w-px overflow-hidden bg-white/15">
        <motion.div
          className="h-4 w-full bg-white/70"
          animate={{ y: [-16, 40] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
