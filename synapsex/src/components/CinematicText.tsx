import { useRef } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion';

const SCROLL_SPRING = { stiffness: 15, damping: 32, mass: 1.8 };

export default function CinematicText() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);
  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const transform = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen h-[100dvh] w-full overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[180px]"
        style={{ background: 'linear-gradient(to bottom, #010103, transparent)' }}
      />

      <div
        className="relative z-20 flex h-full items-center justify-center"
        style={{ perspective: '400px' }}
      >
        <motion.div className="max-w-5xl" style={{ transform, opacity }}>
          <p className="select-none px-6 text-center font-sans text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-white sm:px-12 sm:text-[30px] md:text-[36px] lg:text-[42px]">
            A neural-AI interface built on the architecture of the human nervous system. RE:BRAND
            translates synaptic activity into computational intelligence. Every signal becomes
            measurable, structured, and visible. It continuously reconstructs internal state as a
            dynamic neural map. Biological noise is filtered into actionable cognitive patterns.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
