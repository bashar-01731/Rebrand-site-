import { motion } from 'framer-motion';
import ScrambleIn from './ScrambleIn';

const EASE_OUT = [0.215, 0.61, 0.355, 1.0] as const;

interface HeroProps {
  entranceComplete: boolean;
}

export default function Hero({ entranceComplete }: HeroProps) {
  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#16151A 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.07,
        }}
      />

      {/* Watermark */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ transform: 'translateY(50px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 0.22 : 0 }}
        transition={{ duration: 1.8, ease: EASE_OUT }}
      >
        <span
          className="select-none whitespace-nowrap uppercase leading-none"
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            letterSpacing: '-4px',
            background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Identity
        </span>
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col px-4 pb-8 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8"
        initial={{ opacity: 0, y: 18 }}
        animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
      >
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-ink">
              <ScrambleIn text="Brand" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Build" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              className="max-w-sm text-[13px] leading-relaxed text-ink/60 sm:text-[15px]"
              initial={{ opacity: 0, y: 25 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.35 }}
            >
              Built at the intersection of craft and commerce. RE:BRAND designs premium
              websites that make a business look established, modern, and genuinely worth
              trusting — from first sketch to shipped build.
            </motion.p>
          </div>

          <h1 className="text-left text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-ink md:text-right">
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Studio" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
