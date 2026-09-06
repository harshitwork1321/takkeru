import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        opacity: 0,
        y: 100,
        filter: 'blur(20px)',
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5,
      });

      gsap.to(videoRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={videoRef}
          src="/images/hero-bg.png"
          alt="TAKKERU CART â€“ mobile boba tea business"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-accent" />
            <span className="font-jp text-accent tracking-[0.3em] text-sm uppercase">ã‚¿ãƒƒã‚±ãƒ« ã‚«ãƒ¼ãƒˆ</span>
          </motion.div>

          <h1 className="hero-text text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] leading-none mb-4 tracking-tighter">
            TAKKERU
          </h1>

          <h2 className="hero-text text-xl md:text-3xl font-inter font-light text-subtle/80 tracking-widest uppercase mb-8">
            YOUR BOBA BUSINESS. ON WHEELS.
          </h2>

          {/* CTA Buttons */}
          <div className="hero-text flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a
              href="https://tally.so/r/XxaDyj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-accent text-primary font-bebas text-xl tracking-widest hover:bg-white transition-all duration-500 transform hover:-translate-y-1"
            >
              START YOUR CART
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-white/30 text-white font-bebas text-xl tracking-widest hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-500 transform hover:-translate-y-1 backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              SEE HOW IT WORKS
            </a>
          </div>
        </div>
      </div>

      {/* Floating scroll indicator */}
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
