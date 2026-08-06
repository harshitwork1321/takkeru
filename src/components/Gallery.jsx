import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { url: '/images/Lady.jpeg',  title: 'Elegance in 2D', jp: 'エレガンス' },
  { url: '/images/girl.png',   title: 'Tokyo Dreamer',  jp: '夢見る人'   },
  { url: '/images/boy.jpeg',   title: 'Urban Youth',    jp: '都市の若者'  },
  { url: '/images/men.png',    title: 'Noir Shadows',   jp: 'ノワールの影' },
];

// Number of "screens" to scroll (intro + 4 images = 5 panels, but we move 4 panels worth)
const PANELS = GALLERY_IMAGES.length; // 4 image panels

export default function Gallery() {
  const wrapperRef  = useRef(null); // scroll trigger target
  const stripRef    = useRef(null); // moving element

  useEffect(() => {
    const strip   = stripRef.current;
    const wrapper = wrapperRef.current;

    const ctx = gsap.context(() => {
      /**
       * Scroll distance = PANELS * 100vw
       * We move the strip left by exactly that distance.
       * IMPORTANT: never put overflow:hidden on the pinned element
       * or its ancestors – it breaks GSAP's position:fixed pin.
       */
      gsap.to(strip, {
        x: () => -(PANELS * window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          pin: wrapper,           // pin the wrapper, not the strip
          scrub: 1,
          start: 'top top',
          end: () => `+=${PANELS * window.innerWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    /*
     * NO overflow-hidden here — that breaks GSAP pin.
     * html + body + main already clip horizontal overflow
     * so the strip never causes a page-level scrollbar.
     */
    <div ref={wrapperRef} className="bg-primary">
      {/* Moving strip: (1 + PANELS) × 100vw wide */}
      <div
        ref={stripRef}
        className="flex h-screen will-change-transform"
        style={{ width: `${(PANELS + 1) * 100}vw` }}
      >
        {/* ── Intro panel ── */}
        <div
          className="flex-shrink-0 h-full flex flex-col justify-center px-12 md:px-32"
          style={{ width: '100vw' }}
        >
          <span className="text-accent font-jp tracking-[0.4em] mb-4 block">体験</span>
          <h2 className="text-6xl md:text-[8rem] leading-none mb-8 font-bebas">
            2D EXPERIENCE<br />GALLERY
          </h2>
          <div className="flex items-center gap-6">
            <div className="w-20 h-[1px] bg-white/30" />
            <p className="text-subtle/40 uppercase tracking-[0.3em] text-sm font-inter">
              Scroll to traverse the dream
            </p>
          </div>
          <div className="mt-12 flex items-center gap-3 text-subtle/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              style={{ animation: 'bounce-x 1.2s ease-in-out infinite' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="font-inter text-xs tracking-[0.25em] uppercase">Keep scrolling</span>
          </div>
        </div>

        {/* ── Image panels ── */}
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 h-full flex items-stretch"
            style={{ width: '100vw', padding: '5vh 5vw' }}
          >
            {/* Inner card — overflow:hidden here is fine, it's not a pinned ancestor */}
            <div className="relative flex-1 rounded-2xl overflow-hidden">
              <img
                src={img.url}
                alt={`${img.title} – Takkeru 2D gallery`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-90 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-10 pb-12 z-10">
                <p className="text-accent font-jp text-2xl mb-2">{img.jp}</p>
                <h3 className="text-5xl md:text-7xl font-bebas tracking-widest text-white">
                  {img.title}
                </h3>
                <p className="mt-3 text-white/30 font-inter text-xs tracking-[0.3em] uppercase">
                  {i + 1} / {GALLERY_IMAGES.length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
