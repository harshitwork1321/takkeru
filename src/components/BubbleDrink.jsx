import { ArrowDownRight } from 'lucide-react';
import LazyVideo from './LazyVideo';
import Reveal from './Reveal';

const TAGS = ['Red pearls', 'Crushed ice', 'Served cold'];

const PEARLS = [
  { className: 'left-[5%] top-[14%] h-4 w-4', delay: '0s' },
  { className: 'right-[7%] top-[26%] h-6 w-6', delay: '1.1s' },
  { className: 'left-[10%] bottom-[14%] h-5 w-5', delay: '2.3s' },
  { className: 'right-[16%] bottom-[8%] h-3.5 w-3.5', delay: '3.2s' },
];

export default function BubbleDrink() {
  return (
    <section id="bubble-drink" className="relative overflow-hidden bg-golden text-[#111111] py-20 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 top-1/2 hidden -translate-y-1/2 select-none font-bebas text-[22vw] leading-none text-[#111111]/[0.07] md:block"
      >
        BUBBLE
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
        <Reveal className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-[#111111]/25 pb-7">
          <div>
            <span className="font-jp text-sm tracking-[0.4em] text-accent">バブルドリンク</span>
            <p className="mt-3 font-bebas text-lg tracking-[0.35em] text-[#111111]/55">
              02 — THE SECOND POUR
            </p>
          </div>
          <p className="font-bebas text-lg tracking-[0.3em] text-[#111111]/70">
            SMASH • SLURP • SIP
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-5 lg:col-span-5">
            <h2 className="font-bebas text-6xl leading-[0.86] tracking-tight sm:text-7xl md:text-8xl">
              BUBBLE
              <br />
              DRINK
            </h2>

            <p className="mt-6 max-w-md font-inter text-base leading-relaxed text-[#111111]/75 md:text-lg">
              Bright, icy and packed with red pearls. The TAKKERU pour that lands
              straight after the boba — mixed on the cart, built for the street.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {TAGS.map((item) => (
                <span
                  key={item}
                  className="border border-[#111111]/20 bg-[#FFF8EE] px-3.5 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-[#111111]/70"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-3 bg-accent px-6 py-4 text-white">
                <span className="font-bebas text-3xl leading-none tracking-[0.16em]">TAKKERU</span>
                <span className="h-6 w-px bg-white/45" />
                <span className="font-bebas text-lg leading-none tracking-[0.2em]">BUBBLE DRINK</span>
              </span>

              <span className="border border-[#111111]/35 px-5 py-4 font-bebas text-lg tracking-[0.18em] text-[#111111]">
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

          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-5 sm:gap-5">
              {/* ── Main visual — splash artwork, never animated away ── */}
              <Reveal className="sm:col-span-3">
                <div className="bubble-settle relative mx-auto w-full max-w-[460px] border-2 border-[#111111] shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:mx-0">
                  <div className="aspect-[940/1672] w-full overflow-hidden bg-golden">
                    <img
                      src="/media/bubble-drink-splash.png"
                      alt="TAKKERU Bubble Drink — iced red pearl drink in a TAKKERU cup"
                      width="940"
                      height="1672"
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-5 -left-3 bg-[#111111] px-5 py-3.5 text-cream shadow-[0_18px_45px_rgba(0,0,0,0.3)] sm:-left-5">
                    <p className="font-jp text-[10px] tracking-[0.3em] text-accent">バブルドリンク</p>
                    <p className="font-bebas text-2xl leading-none tracking-[0.1em]">SERVED ICE COLD</p>
                  </div>

                  <div className="absolute -right-2 top-5 hidden rotate-3 bg-accent px-4 py-2 font-bebas text-lg tracking-[0.16em] text-white sm:block">
                    SECOND DRINK
                  </div>
                </div>
              </Reveal>

              {/* ── Product film — poster first, video enhances ── */}
              <Reveal delay={0.14} className="sm:col-span-2 sm:mt-20">
                <div className="bubble-drift relative mx-auto w-full max-w-[320px] border-2 border-[#111111] shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:mx-0 sm:max-w-none">
                  <div className="aspect-[9/16] w-full overflow-hidden bg-golden">
                    <LazyVideo
                      src="/media/takkeru-bubble-drink.mp4"
                      poster="/media/posters/takkeru-bubble-drink.jpg"
                      fallbackImage="/media/bubble-drink-splash.png"
                      containerClassName="h-full w-full"
                      preload="metadata"
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111]/85 to-transparent px-4 pb-4 pt-10">
                    <p className="font-bebas text-xl leading-none tracking-[0.16em] text-cream">
                      BUBBLE DRINK IN MOTION
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
