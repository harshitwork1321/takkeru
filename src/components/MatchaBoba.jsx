import { ArrowDownRight } from 'lucide-react';
import LazyVideo from './LazyVideo';
import Reveal from './Reveal';

const TAGS = ['Matcha', 'Cold milk', 'Tapioca pearls', 'Ice'];

const PEARLS = [
  { className: 'left-[6%] top-[16%] h-3.5 w-3.5', delay: '0.4s' },
  { className: 'right-[9%] top-[30%] h-5 w-5', delay: '1.6s' },
  { className: 'right-[14%] bottom-[12%] h-4 w-4', delay: '2.7s' },
];

export default function MatchaBoba() {
  return (
    <section id="matcha-boba" className="relative overflow-hidden bg-primary py-20 md:py-32">
      <div className="halftone-bg pointer-events-none absolute inset-0" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-bebas text-[24vw] leading-none text-white/[0.05] md:block"
      >
        MATCHA
      </div>

      {PEARLS.map((pearl) => (
        <span
          key={pearl.delay}
          aria-hidden="true"
          className={`pointer-events-none absolute ${pearl.className} rounded-full bg-accent/70 shadow-[0_6px_18px_rgba(214,40,40,0.35)] bubble-orbit`}
          style={{ animationDelay: pearl.delay }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-white/15 pb-7">
          <div>
            <span className="font-jp text-sm tracking-[0.4em] text-accent">抹茶ボバ</span>
            <p className="mt-3 font-bebas text-lg tracking-[0.35em] text-white/50">
              02 — THE GREEN POUR
            </p>
          </div>
          <p className="font-bebas text-lg tracking-[0.3em] text-white/60">
            WHISK • MILK • PEARLS
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-14">
          {/* ── Product film — the new Matcha Boba asset, poster first ── */}
          <Reveal className="md:col-span-6 lg:col-span-6">
            <div className="relative mx-auto w-full max-w-[520px] md:mx-0">
              <div className="bubble-settle relative aspect-[9/16] w-full overflow-hidden border-2 border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <LazyVideo
                  src="/media/takkeru-matcha-boba.mp4"
                  poster="/media/posters/takkeru-matcha-boba.jpg"
                  fallbackImage="/media/posters/takkeru-matcha-boba.jpg"
                  containerClassName="h-full w-full"
                />
              </div>

              <div className="matcha-sway absolute -bottom-5 -left-3 bg-accent px-5 py-3.5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.4)] sm:-left-5">
                <p className="font-jp text-[10px] tracking-[0.3em] text-white/80">抹茶ボバ</p>
                <p className="font-bebas text-2xl leading-none tracking-[0.1em]">WHISKED TO ORDER</p>
              </div>

              <div className="absolute -right-2 top-5 hidden rotate-3 bg-white px-4 py-2 font-bebas text-lg tracking-[0.16em] text-primary sm:block">
                02 — MATCHA
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-6 lg:col-span-6">
            <p className="font-bebas text-lg tracking-[0.35em] text-white/50">
              02 — THE GREEN POUR
            </p>

            <h2 className="mt-4 font-bebas text-6xl leading-[0.86] tracking-tight text-white sm:text-7xl md:text-8xl">
              MATCHA
              <br />
              BOBA
            </h2>

            <p className="mt-6 max-w-md font-inter text-base leading-relaxed text-white/70 md:text-lg">
              Matcha, cold milk and chewy tapioca pearls over ice. Creamy, grassy
              and clean — the green pour on the TAKKERU cart, sitting right
              between the boba and the fizz.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {TAGS.map((item) => (
                <span
                  key={item}
                  className="border border-white/20 bg-white/[0.06] px-3.5 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-3 bg-accent px-6 py-4 text-white">
                <span className="font-bebas text-3xl leading-none tracking-[0.16em]">TAKKERU</span>
                <span className="h-6 w-px bg-white/45" />
                <span className="font-bebas text-lg leading-none tracking-[0.2em]">MATCHA BOBA</span>
              </span>

              <span className="border border-white/35 px-5 py-4 font-bebas text-lg tracking-[0.18em] text-white">
                MENU NO. 02
              </span>
            </div>

            <a
              href="#menu"
              className="group mt-8 inline-flex items-center gap-2 font-bebas text-lg tracking-[0.14em] text-accent underline decoration-accent/40 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent"
            >
              SEE IT ON THE MENU
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
