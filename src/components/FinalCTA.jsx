import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-40 bg-accent relative overflow-hidden"
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 halftone-bg opacity-[0.06] pointer-events-none" />

      {/* Large decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-white/[0.1] font-bebas text-[12rem] md:text-[18rem] lg:text-[22rem] whitespace-nowrap leading-none tracking-wider">
          TAKKERU
        </span>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="font-jp text-white/60 tracking-[0.4em] block mb-6 text-lg md:text-xl"
        >
          始めよう
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl text-primary font-bebas tracking-wide mb-8"
        >
          READY TO BUILD YOUR TAKKERU?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-primary/70 font-inter text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          <strong>Choose your cart. Understand your numbers. Start your journey.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
        >
          <a
            href="https://tally.so/r/XxaDyj"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 bg-primary text-white font-bebas text-xl tracking-[0.2em] uppercase hover:bg-primary/80 transition-all duration-500 transform hover:-translate-y-1"
          >
            START YOUR TAKKERU →
          </a>
          <a
            href="#contact"
            className="px-12 py-5 border border-primary/30 text-primary font-bebas text-xl tracking-[0.2em] uppercase hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 transform hover:-translate-y-1"
          >
            TALK TO THE TEAM
          </a>
        </motion.div>
      </div>
    </section>
  );
}
