import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FEATURES = [
  {
    num: '01',
    title: 'LOW STARTUP COST',
    description: 'Designed for entrepreneurs who want to start lean.',
  },
  {
    num: '02',
    title: 'SMALL FOOTPRINT',
    description: 'Suitable for locations where a traditional restaurant isn\'t practical.',
  },
  {
    num: '03',
    title: 'MULTIPLE PRODUCTS',
    description: 'Ramen + Mandu + Boba + more. One cart, many revenue streams.',
  },
  {
    num: '04',
    title: 'STRONG BRAND IDENTITY',
    description: 'TAKKERU provides a recognizable visual food concept.',
  },
  {
    num: '05',
    title: 'FLEXIBLE LOCATIONS',
    description: 'Markets, colleges, malls, food streets, events, high-footfall areas.',
  },
];

export default function BusinessModel() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const leftItems = [FEATURES[0], FEATURES[2], FEATURES[4]];
  const rightItems = [FEATURES[1], FEATURES[3]];

  return (
    <section id="business" className="relative py-24 md:py-40 bg-primary overflow-hidden halftone-bg">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-accent font-jp tracking-[0.4em] block mb-6"
          >
            ビジネス
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-8xl"
          >
            ONE CART. MULTIPLE<br />OPPORTUNITIES.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-subtle/50 font-inter text-lg leading-relaxed max-w-xl mx-auto"
          >
            Built for entrepreneurs who want to start lean and scale fast.
          </motion.p>
        </div>

        {/* Asymmetric staggered grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto items-start">
          {/* Left column — wider */}
          <div className="md:col-span-7 space-y-6">
            {leftItems.map((feature, i) => (
              <motion.div
                key={feature.num}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                className="group relative p-8 md:p-10 border border-white/5 bg-white/[0.02] hover:border-accent/30 hover:bg-accent/5 transition-all duration-500"
              >
                <div className="absolute left-0 top-0 w-[3px] h-full bg-accent/60 group-hover:bg-accent transition-colors duration-500" />
                <span className="text-accent font-bebas text-6xl md:text-7xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 block leading-none">
                  {feature.num}
                </span>
                <h3 className="text-2xl md:text-3xl font-bebas tracking-wider mt-4 mb-3 group-hover:text-accent transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-subtle/50 font-inter text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right column — narrower, offset down */}
          <div className="md:col-span-5 md:mt-24 space-y-6">
            {rightItems.map((feature, i) => (
              <motion.div
                key={feature.num}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.15 }}
                className="group relative p-8 md:p-10 border border-white/5 bg-white/[0.02] hover:border-accent/30 hover:bg-accent/5 transition-all duration-500"
              >
                <div className="absolute left-0 top-0 w-[3px] h-full bg-accent/60 group-hover:bg-accent transition-colors duration-500" />
                <span className="text-accent font-bebas text-6xl md:text-7xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 block leading-none">
                  {feature.num}
                </span>
                <h3 className="text-2xl md:text-3xl font-bebas tracking-wider mt-4 mb-3 group-hover:text-accent transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-subtle/50 font-inter text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
