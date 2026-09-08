import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LazyVideo from './LazyVideo';

const MEDIA_ITEMS = [
  {
    number: '01',
    label: 'BOBA TEA',
    japanese: 'ボバティー',
    text: 'COLD. CREAMY. BOLD.',
    src: '/media/takkeru-boba-commercial.mp4',
    poster: '/images/boba.jpg',
    fallback: '/images/boba.jpg',
  },
  {
    number: '02',
    label: 'THE CART',
    japanese: 'タッケル・カート',
    text: 'YOUR BUSINESS. ON WHEELS.',
    src: '/media/takkeru-cart-business.mp4',
    poster: '/images/takkeru-cart.jpg',
    fallback: '/images/takkeru-cart.jpg',
  },
  {
    number: '03',
    label: 'THE FOOD',
    japanese: 'ラーメン • マンドゥ',
    text: 'ZOOM INTO THE FLAVOR.',
    src: '/media/takkeru-food-macro.mp4',
    poster: '/images/Ramen.jpeg',
    fallback: '/images/Ramen.jpeg',
  },
];

export default function TakkeruInMotion() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent font-jp tracking-[0.4em] block mb-4 text-sm uppercase"
          >
            動き
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-tight text-white"
          >
            TAKKERU IN MOTION
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-subtle/50 font-inter text-sm md:text-base tracking-widest uppercase"
          >
            THE CART. THE FOOD. THE ENERGY.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 h-[2px] w-24 bg-accent mx-auto"
          />
        </div>

        {/* Media Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {MEDIA_ITEMS.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 50 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              className="group relative border-2 border-white/5 hover:border-accent/40 transition-colors duration-500 overflow-hidden"
            >
              {/* Video */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <LazyVideo
                  src={item.src}
                  poster={item.poster}
                  fallbackImage={item.fallback}
                  containerClassName="w-full h-full"
                />
                {/* Dark gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

                {/* Number overlay */}
                <span className="absolute top-4 left-4 text-white/20 font-bebas text-6xl md:text-7xl leading-none select-none drop-shadow-lg">
                  {item.number}
                </span>

                {/* Japanese label */}
                <span className="absolute top-4 right-4 font-jp text-[10px] text-accent/80 tracking-[0.3em]">
                  {item.japanese}
                </span>
              </div>

              {/* Text content */}
              <div className="p-6 bg-white/[0.02]">
                <span className="text-[10px] font-inter font-semibold tracking-[0.3em] text-white/40 block mb-1">
                  {item.number} — {item.label}
                </span>
                <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-white">
                  {item.text}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
