import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import LazyVideo from './LazyVideo';
import Button from './ui/button';
import { CART_ENQUIRY_URL } from '../lib/links';

const CHIPS = ['Boba', 'Mandu', 'Ramen', 'Tteokbokki'];

export default function Hero() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    try {
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
    } catch {
      // Animation unavailable — content is already visible in the DOM.
    }
  }, [reduceMotion]);

  return (
    <section id="home" ref={heroRef} className="relative flex min-h-[700px] h-[100svh] w-full items-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <LazyVideo
            src="/media/takkeru-boba-tea-commercial.mp4"
            poster="/media/posters/takkeru-boba-tea-commercial.jpg"
            fallbackImage="/images/boba.jpg"
            containerClassName="w-full h-full"
            fit="contain"
            backdrop
            preload="auto"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-primary/15" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.35)_0%,transparent_38%,rgba(10,10,10,0.7)_100%)]" />
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
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-jp text-sm tracking-[0.3em] text-accent">ボバティー</span>
            <span className="hidden sm:inline text-[10px] font-inter font-semibold tracking-[0.24em] text-white/45 uppercase">Japanese-inspired street food</span>
          </motion.div>

          <p className="hero-text font-bebas text-xl md:text-2xl tracking-[0.4em] text-accent">
            SIP THE HYPE
          </p>
          <h1 className="hero-text mt-3 text-balance font-bebas text-5xl leading-[0.86] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]">
            BOBA THAT<br className="hidden sm:block" /> HITS DIFFERENT.
          </h1>
          <p className="hero-text mt-7 max-w-xl font-inter text-base leading-relaxed text-white/65 md:text-lg">
            Bold flavours. Chewy pearls. Japanese-inspired street culture.
          </p>

          <div className="hero-text mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <Button asChild variant="accent">
              <a href="#menu">
                EXPLORE THE MENU <ArrowDownRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={CART_ENQUIRY_URL} target="_blank" rel="noopener noreferrer">
                START YOUR CART <ArrowUpRight className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="hero-text mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-inter font-semibold uppercase tracking-[0.18em] text-white/55">
            {CHIPS.map((chip, index) => (
              <span key={chip} className="flex items-center gap-4">
                <span className={index === 0 ? 'text-white/85' : ''}>{chip}</span>
                {index < CHIPS.length - 1 && <span className="h-1 w-1 rounded-full bg-accent" />}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 right-6 z-10 flex items-end justify-between md:left-12 md:right-12">
        <div className="hidden items-center gap-3 border-l border-accent/60 pl-4 text-[10px] font-inter uppercase tracking-[0.18em] text-white/60 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Boba Tea — ₹99
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
