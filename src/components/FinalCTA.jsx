import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-40 bg-primary relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-accent font-jp tracking-[0.4em] block mb-6"
        >
          å§‹ã‚ã‚ˆã†
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-5xl md:text-8xl lg:text-9xl mb-8"
        >
          READY TO<br />START?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-subtle/50 font-inter text-lg md:text-xl max-w-xl mx-auto mb-12"
        >
          Take the first step towards your own mobile boba business. The cart is waiting.
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
            className="px-12 py-5 bg-accent text-primary font-bebas text-xl tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 transform hover:-translate-y-1"
          >
            START YOUR CART
          </a>
          <a
            href="#contact"
            className="px-12 py-5 border border-white/20 text-white font-bebas text-xl tracking-[0.2em] uppercase hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-500 transform hover:-translate-y-1"
          >
            TALK TO US
          </a>
        </motion.div>
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/images/halftone.png')]" />

      {/* Large decorative text */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[10rem] md:text-[16rem] font-bebas text-white/[0.02] select-none pointer-events-none whitespace-nowrap leading-none">
        TAKKERU CART
      </div>
    </section>
  );
}
