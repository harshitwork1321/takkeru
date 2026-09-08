import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import LazyVideo from './LazyVideo';

export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        opacity: 0,
        y: 80,
        filter: 'blur(16px)',
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Full-bleed video background */}
      <div className="absolute inset-0 w-full h-full">
        <LazyVideo
          src="/media/takkeru-cart-business.mp4"
          poster="/images/takkeru-cart.jpg"
          fallbackImage="/images/takkeru-cart.jpg"
          containerClassName="w-full h-full"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/50 to-primary/30" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={contentRef}>
        <div className="max-w-4xl text-left">
          {/* Japanese label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-accent" />
            <span className="font-jp text-accent tracking-[0.3em] text-sm">
              タッケル・カート
            </span>
          </motion.div>

          {/* Main headline */}
          <h1 className="hero-text text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] leading-none mb-4 tracking-tighter font-bebas text-white">
            TAKKERU
          </h1>
          <h2 className="hero-text text-xl md:text-3xl font-inter font-light text-subtle/80 tracking-widest uppercase mb-8">
            YOUR BUSINESS. ON WHEELS.
          </h2>

          {/* Supporting text */}
          <p className="hero-text text-subtle/50 font-inter text-base md:text-lg mb-10 max-w-xl leading-relaxed">
            A Japanese-inspired food cart business built for bold street-food experiences.
          </p>

          {/* CTA Buttons */}
          <div className="hero-text flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a
              href="https://tally.so/r/XxaDyj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-accent text-primary font-bebas text-xl tracking-widest hover:bg-white transition-all duration-500 transform hover:-translate-y-1"
            >
              CHOOSE YOUR CART →
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-white/30 text-white font-bebas text-xl tracking-widest hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-500 transform hover:-translate-y-1 backdrop-blur-sm"
            >
              VIEW MENU ↓
            </a>
          </div>

          {/* Category tags */}
          <div className="hero-text flex items-center gap-4 mt-12 text-xs font-inter tracking-widest uppercase text-subtle/60">
            <span>BOBA</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>RAMEN</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>MANDU</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>STREET ENERGY</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-end gap-4">
        <div className="flex items-center gap-4 group cursor-pointer">
          <span className="text-[10px] font-inter tracking-[0.5em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
            Scroll to explore
          </span>
          <div className="w-1 h-12 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent -translate-y-full animate-[scrollIndicator_2s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
