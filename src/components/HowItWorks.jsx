import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'CHOOSE YOUR MODEL',
    description: 'Pick the TAKKERU cart format that fits your market and budget.',
  },
  {
    num: '02',
    title: 'GET YOUR CART',
    description: 'We help you set up a fully equipped, branded food cart.',
  },
  {
    num: '03',
    title: 'SET UP LOCATION',
    description: 'Place your cart in high-footfall areas — markets, colleges, malls, events.',
  },
  {
    num: '04',
    title: 'START SERVING',
    description: 'Launch your menu, attract customers, and grow your business.',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="how-it-works"
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
            仕組み
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-8xl"
          >
            HOW IT WORKS
          </motion.h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting line — horizontal on desktop, vertical on mobile */}
          <div className="hidden md:block absolute top-[40px] left-[12.5%] right-[12.5%] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="h-full bg-gradient-to-r from-accent/40 via-accent to-accent/40 origin-left"
            />
          </div>
          <div className="md:hidden absolute left-[32px] top-0 bottom-0 w-[2px]">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="w-full h-full bg-gradient-to-b from-accent/40 via-accent to-accent/40 origin-top"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.15 }}
                className="relative flex md:flex-col items-start md:items-center md:text-center gap-6 md:gap-0 pl-16 md:pl-0"
              >
                {/* Step dot on line */}
                <div className="absolute left-[24px] md:left-1/2 md:-top-[4px] -translate-x-1/2 md:-translate-x-1/2 top-[40px] md:top-[36px] w-3 h-3 rounded-full bg-accent border-4 border-primary z-10" />

                <div className="md:mb-6">
                  <span className="font-bebas text-7xl leading-none text-white/[0.08]">
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-bebas text-xl tracking-wider mb-2">
                    {step.title}
                  </h3>
                  <p className="font-inter text-sm text-subtle/50 leading-relaxed max-w-[220px] md:mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="halftone-bg absolute inset-0 opacity-[0.03] pointer-events-none" />
    </section>
  );
}
