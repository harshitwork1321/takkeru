import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LazyVideo from './LazyVideo';

const ITEMS = [
  { name: 'BOBA TEA', japanese: 'ボバティー', image: '/images/boba.jpg', caption: 'Creamy. Bold. Instagram-ready.' },
  { name: 'RAMEN', japanese: 'ラーメン', image: '/images/Ramen.jpeg', caption: 'Rich broth. Perfect noodles.' },
  { name: 'MANDU', japanese: 'マンドゥ', image: '/images/mandu.jpg', caption: 'Crispy Korean dumplings.' },
  { name: 'STREET ENERGY', japanese: 'ストリートエネルギー', image: '/images/takkeru-cart.jpg', caption: 'Bold brand. Any location.' },
];

export default function RealFood() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-primary relative overflow-hidden">
      {/* Food Macro Video Hero */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <LazyVideo
          src="/media/takkeru-food-macro.mp4"
          poster="/images/Ramen.jpeg"
          fallbackImage="/images/Ramen.jpeg"
          containerClassName="w-full h-full"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/30" />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div ref={headerRef} className="text-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-jp text-accent tracking-[0.4em] block mb-4 text-sm"
            >
              味
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-bebas leading-[0.9] tracking-tight text-white"
            >
              SEE THE<br />FLAVOR.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-subtle/60 font-inter text-sm md:text-base tracking-widest uppercase"
            >
              SHOT CLOSE. SERVED BOLD.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Food Grid */}
      <div className="py-24 md:py-40 relative">
        <div className="halftone-bg absolute inset-0 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bebas leading-[0.9] tracking-tight text-white">
              REAL FOOD.<br />REAL CART.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                className="group relative overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="font-jp text-[10px] text-accent/80 tracking-[0.3em] block mb-1">
                      {item.japanese}
                    </span>
                    <h3 className="font-bebas text-3xl tracking-wide text-white mb-1">
                      {item.name}
                    </h3>
                    <p className="font-inter text-sm text-white/60">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-16 -right-16 text-[14rem] md:text-[20rem] font-bebas text-white/[0.03] select-none pointer-events-none whitespace-nowrap leading-none">
          TAKKERU
        </div>
      </div>
    </section>
  );
}
