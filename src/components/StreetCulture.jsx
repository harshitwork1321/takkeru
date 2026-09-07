import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StreetCulture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 md:py-40 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }} className="font-jp text-accent tracking-[0.4em] block mb-8 text-sm">
          ストリートカルチャー
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-[0.9]">
          STREET CULTURE<br />MEETS FOOD.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="text-subtle/50 font-inter text-lg leading-relaxed max-w-2xl mx-auto mb-16">
          Japanese-inspired branding meets Indian street food energy. A concept that stands out in any crowd.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {['RAMEN', 'BOBA', 'MANDU', 'TTEOKBOKKI'].map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }} className="border border-white/10 p-6 hover:border-accent/30 transition-all duration-500 group">
              <span className="font-bebas text-lg tracking-wider text-white/60 group-hover:text-accent transition-colors">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
