import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ITEMS = [
  {
    num: '01',
    title: 'TAKKERU CART',
    description: 'A compact, mobile food cart designed for high-traffic locations. Eye-catching branding, built for business.',
  },
  {
    num: '02',
    title: 'MENU SYSTEM',
    description: 'Complete boba tea, mandu, and ramen menu with recipes, suppliers, and pricing guidance.',
  },
  {
    num: '03',
    title: 'BRAND IDENTITY',
    description: 'Logo, packaging, social media templates — everything you need to look professional from day one.',
  },
  {
    num: '04',
    title: 'OPERATIONAL GUIDANCE',
    description: 'Training, setup support, and ongoing guidance to help you run your cart business successfully.',
  },
];

export default function WhatYouGet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-40 bg-primary relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-accent font-jp tracking-[0.4em] block mb-6"
          >
            提供物
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-8xl"
          >
            WHAT YOU GET
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
              className="group p-8 border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-all duration-500"
            >
              <span className="text-accent font-bebas text-5xl opacity-30 group-hover:opacity-100 transition-opacity">
                {item.num}
              </span>
              <h3 className="text-2xl md:text-3xl font-bebas tracking-wider mt-4 mb-4 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-subtle/50 font-inter text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/images/halftone.png')]" />
    </section>
  );
}
