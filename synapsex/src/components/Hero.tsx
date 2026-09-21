import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from './ScrambleIn';
import { VIDEOS } from '../videos';

/** Fraction of the video timeline covered by one full-viewport mouse sweep. */
const SCRUB_SENSITIVITY = 0.8;

const EASE_OUT = [0.215, 0.61, 0.355, 1.0] as const;

interface HeroProps {
  entranceComplete: boolean;
}

export default function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const seeking = useRef(false);
  const lastX = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      video.pause();
      video.currentTime = 0;
      targetTime.current = 0;
    };

    // Chain seeks off `seeked` rather than firing one per mousemove: the
    // decoder only ever has one outstanding request, so frames don't drop.
    const handleSeeked = () => {
      if (Math.abs(video.currentTime - targetTime.current) > 0.01) {
        video.currentTime = targetTime.current;
      } else {
        seeking.current = false;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      if (lastX.current === null) {
        lastX.current = event.clientX;
        return;
      }

      const deltaX = event.clientX - lastX.current;
      lastX.current = event.clientX;

      const next =
        targetTime.current + (deltaX / window.innerWidth) * duration * SCRUB_SENSITIVITY;
      targetTime.current = Math.min(Math.max(next, 0), duration - 0.05);

      if (!seeking.current) {
        seeking.current = true;
        video.currentTime = targetTime.current;
      }
    };

    const handleMouseLeave = () => {
      lastX.current = null;
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    if (video.readyState >= 1) handleLoaded();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden">
      <video
        ref={videoRef}
        src={VIDEOS.hero}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      {/* Watermark */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ transform: 'translateY(50px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 0.1 : 0 }}
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
          Transcendence
        </span>
      </motion.div>

      <motion.div
        className="relative z-20 flex h-full flex-col px-4 pb-8 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8"
        initial={{ opacity: 0, y: 18 }}
        animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
      >
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white">
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              className="max-w-sm text-[13px] leading-relaxed text-white/60 sm:text-[15px]"
              initial={{ opacity: 0, y: 25 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.35 }}
            >
              Built at the intersection of neuroscience and artificial intelligence. RE:BRAND
              continuously maps neural pathways, cognitive load, and physiological states into a
              single adaptive intelligence layer.
            </motion.p>
          </div>

          <h1 className="text-left text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white md:text-right">
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
