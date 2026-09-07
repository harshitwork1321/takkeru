import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ITEMS = [
  { name: 'BOBA TEA', japanese: 'ボバティー', image: '/images/boba.jpg', caption: 'Creamy. Bold. Instagram-ready.' },
  { name: 'RAMEN', japanese: 'ラーメン', image: '/images/Ramen.jpeg', caption: 'Rich broth. Perfect noodles.' },
  { name: 'MANDU', japanese: 'マンドゥ', image: '/images/mandu.jpg', caption: 'Crispy Korean dumplings.' },
  { name: 'STREET ENERGY', japanese: 'ストリートエネルギー', image: '/images/cart-hero.png', caption: 'Bold brand. Any location.' },
];

export default function RealFood() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 md:py-40 bg-cream relative overflow-hidden">
      <div className="halftone-bg absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 md:mb-24">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bebas leading-[0.9] tracking-tight text-primary">
            REAL FOOD.<br />REAL CART.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ITEMS.map((item, i) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }} className="group relative overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
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

      <div className="absolute -bottom-16 -right-16 text-[14rem] md:text-[20rem] font-bebas text-primary/[0.03] select-none pointer-events-none whitespace-nowrap leading-none">
        TAKKERU
      </div>
    </section>
  );
}
