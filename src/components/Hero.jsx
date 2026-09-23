import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import LazyVideo from './LazyVideo';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from('.hero-text', {
        opacity: 0,
        y: 56,
        filter: 'blur(12px)',
        duration: 1.05,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.1,
      });
    }, heroRef);
    return () => context.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative flex min-h-[700px] h-[100svh] w-full items-center overflow-hidden">
      <div className="absolute inset-0">
        <LazyVideo
          src="/media/takkeru-boba-commercial.mp4"
          poster="/images/boba.jpg"
          fallbackImage="/images/boba.jpg"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-primary/15" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.28)_0%,transparent_38%,rgba(10,10,10,0.62)_100%)]" />
        <div className="absolute inset-0 hero-grid pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-20 md:px-12">
        <div className="max-w-5xl text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-accent/10">
              <MapPin className="h-3.5 w-3.5 text-accent" />
            </span>
            <span className="font-jp text-sm tracking-[0.3em] text-accent">タッケル・カート</span>
            <span className="hidden sm:inline text-[10px] font-inter font-semibold tracking-[0.24em] text-white/45 uppercase">Made to move</span>
          </motion.div>

          <h1 className="hero-text text-balance font-bebas text-6xl leading-[0.82] tracking-tight text-white sm:text-8xl md:text-9xl lg:text-[12rem]">
            TAKKERU
          </h1>
          <h2 className="hero-text mt-6 font-inter text-lg font-medium uppercase tracking-[0.19em] text-white/85 md:text-2xl">
            Your business. <span className="text-accent">On wheels.</span>
          </h2>
          <p className="hero-text mt-7 max-w-xl font-inter text-base leading-relaxed text-white/60 md:text-lg">
            A sharp Japanese street-food concept, designed to turn a small footprint into a business people notice.
          </p>

          <div className="hero-text mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <a
              href="https://rzp.io/rzp/sQz9KDq"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 font-bebas text-xl tracking-[0.12em] text-white shadow-[0_18px_45px_rgba(214,40,40,0.25)] transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:text-primary"
            >
              CHOOSE YOUR CART <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-3 border border-white/25 bg-white/[0.03] px-8 py-4 font-bebas text-xl tracking-[0.12em] text-white backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white hover:bg-white/10"
            >
              EXPLORE THE MENU <ArrowDownRight className="h-5 w-5" />
            </a>
          </div>

          <div className="hero-text mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-inter font-semibold uppercase tracking-[0.18em] text-white/55">
            <span className="text-white/80">Boba</span><span className="h-1 w-1 rounded-full bg-accent" />
            <span>Ramen</span><span className="h-1 w-1 rounded-full bg-accent" />
            <span>Mandu</span><span className="h-1 w-1 rounded-full bg-accent" />
            <span>Street energy</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 right-6 z-10 flex items-end justify-between md:left-12 md:right-12">
        <div className="hidden items-center gap-3 border-l border-white/25 pl-4 text-[10px] font-inter uppercase tracking-[0.18em] text-white/50 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Franchise applications open
        </div>
        <div className="ml-auto hidden flex-col items-end gap-4 md:flex">
          <span className="text-[10px] font-inter uppercase tracking-[0.5em] text-white/45">Scroll to explore</span>
          <div className="relative h-12 w-px overflow-hidden bg-white/20">
            <div className="absolute left-0 top-0 h-full w-full -translate-y-full bg-accent animate-[scrollIndicator_2s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
