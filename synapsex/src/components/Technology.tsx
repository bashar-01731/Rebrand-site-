import { motion } from 'framer-motion';

const CAPABILITIES = [
  {
    title: 'Brand Strategy',
    description: 'Positioning, voice, and the story the work has to carry.',
  },
  {
    title: 'Visual Identity',
    description: 'Type, colour, and motion that hold across every surface.',
  },
  {
    title: 'Interface Design',
    description: 'Layouts built around how people actually read and act.',
  },
  {
    title: 'Production Build',
    description: 'Hand-written front-end, fast on real devices and networks.',
  },
];

export default function Technology() {
  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden">
      {/* Top padding clears the fixed 80px navbar, which overlays this section. */}
      <div className="relative z-10 flex h-full flex-col px-8 pb-12 pt-24 sm:px-12 sm:pb-16 sm:pt-28 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <motion.h2
            className="text-[clamp(36px,8vw,72px)] font-light leading-[0.95] tracking-[-0.03em] text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
          >
            Considered
            <br />
            Throughout
          </motion.h2>

          <motion.p
            className="max-w-xs text-[13px] leading-relaxed text-white/50 sm:text-[15px] md:pt-2 md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            We learn how your business actually wins work before drawing a single frame.
            Everything after that is in service of making that argument obvious.
          </motion.p>
        </div>

        <div className="flex-1" />

        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          {CAPABILITIES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <h3 className="mb-2 text-[14px] font-normal text-white sm:text-[16px]">
                {item.title}
              </h3>
              <p className="text-[12px] leading-relaxed text-white/40 sm:text-[14px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
