import { motion } from 'framer-motion';

const LAYERS = [
  { index: 'Phase 1', name: 'Define' },
  { index: 'Phase 2', name: 'Design' },
  { index: 'Phase 3', name: 'Ship' },
];

export default function Architecture() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <p className="mb-8 text-[13px] uppercase tracking-[0.2em] text-ink/40 sm:text-[14px]">
            Process
          </p>
          <h2 className="mb-10 text-[clamp(28px,6vw,56px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
            Three phases. Zero guesswork.
          </h2>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-ink/45 sm:text-[17px]">
            Define sets the positioning and what the site has to prove. Design turns that
            into type, colour, and motion. Ship hands over a fast, hand-built front-end you
            own outright.
          </p>
        </motion.div>

        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {LAYERS.map((layer) => (
            <div
              key={layer.index}
              className="flex h-[72px] w-full max-w-md items-center justify-between rounded-lg border border-ink/10 px-6"
            >
              <span className="text-[12px] uppercase tracking-[0.15em] text-ink/30">
                {layer.index}
              </span>
              <span className="text-[16px] font-light text-ink sm:text-[18px]">{layer.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
