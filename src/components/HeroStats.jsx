import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { num: '01', label: 'THE CART', japanese: 'カート' },
  { num: '02', label: 'THE MENU', japanese: 'メニュー' },
  { num: '03', label: 'THE BUSINESS', japanese: 'ビジネス' },
];

export default function HeroStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-16 md:py-20 bg-primary border-t border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 gap-8 md:gap-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <h3 className="font-bebas text-xl md:text-2xl tracking-wider text-white">
                {stat.label}
              </h3>
              <span className="font-jp text-[10px] text-white/30 tracking-[0.3em] block mt-1">
                {stat.japanese}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
