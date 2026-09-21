import { motion } from 'framer-motion';

const METRICS = [
  { value: '0.9s', label: 'Time To First Paint' },
  { value: '100', label: 'Lighthouse Performance' },
  { value: '6', label: 'Concept Builds Shipped' },
];

export default function Metrics() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-32 pt-32">
        <motion.p
          className="mb-20 text-center text-[13px] uppercase tracking-[0.2em] text-ink/40 sm:text-[14px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          02 — Studio Standards
        </motion.p>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <div className="text-[clamp(48px,10vw,96px)] font-light leading-none tracking-[-0.04em] text-ink">
                {metric.value}
              </div>
              <div className="mt-4 text-[13px] tracking-wide text-ink/40 sm:text-[15px]">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
