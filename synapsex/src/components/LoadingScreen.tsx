import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  /** True once the WebGL context exists. */
  ready: boolean;
  onDone: () => void;
}

/** Never hold the page hostage, even if the canvas never reports ready. */
const HARD_TIMEOUT = 4000;
/** Long enough to read as intentional rather than a flash. */
const MIN_DURATION = 900;

export default function LoadingScreen({ ready, onDone }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const started = Date.now();

    const tick = setInterval(() => {
      const elapsed = Date.now() - started;
      // Climb toward 90 on its own, then finish once the scene is ready.
      const floor = Math.min(90, (elapsed / MIN_DURATION) * 90);
      setPercent((p) => Math.max(p, Math.round(ready ? 100 : floor)));
    }, 40);

    const finish = () => {
      setPercent(100);
      setVisible(false);
      onDone();
    };

    const timer = setTimeout(finish, HARD_TIMEOUT);
    return () => {
      clearInterval(tick);
      clearTimeout(timer);
    };
  }, [ready, onDone]);

  useEffect(() => {
    if (!ready) return;
    const remaining = Math.max(0, MIN_DURATION - 0);
    const timer = setTimeout(() => {
      setVisible(false);
      onDone();
    }, remaining);
    return () => clearTimeout(timer);
  }, [ready, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 sm:text-[12px]">
            Loading Experience
          </p>

          <p className="mt-6 text-[clamp(48px,12vw,96px)] font-light leading-none tracking-[-0.04em] text-white tabular-nums">
            {String(percent).padStart(3, '0')}
          </p>

          <div className="mt-8 h-px w-40 overflow-hidden bg-white/15 sm:w-56">
            <motion.div
              className="h-full bg-white"
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.3, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
