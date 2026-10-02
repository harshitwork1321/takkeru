import { ArrowUpRight, Plus } from 'lucide-react';
import Reveal from './Reveal';
import useCart from '../hooks/useCart';

const MANDU_DETAILS = ['Steamed or pan-fried', 'Juicy filling', 'Signature dip'];
const RAMEN_DETAILS = ['Rich broth', 'Chewy noodles', 'Warm steam'];
const TTEOK_DETAILS = ['Chewy rice cakes', 'Gochujang heat', 'Street-food fire'];

export default function FoodStory() {
  const { addItem } = useCart();

  return (
    <>
      {/* ── MANDU ─────────────────────────────────────────── */}
      <section id="food" className="relative overflow-hidden bg-cream text-[#111111] py-20 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 bottom-0 hidden select-none font-bebas text-[20vw] leading-none text-accent/[0.07] md:block"
        >
          MANDU
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-6">
              <div className="relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-[#111111] sm:aspect-[5/4]">
                  <img
                    src="/images/mandu.jpg"
                    alt="TAKKERU Mandu — golden pan-fried Korean dumplings"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 right-4 flex items-baseline gap-2 bg-[#111111] px-5 py-3 text-cream shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:right-8">
                  <span className="font-bebas text-xl tracking-[0.14em]">MANDU</span>
                  <span className="font-bebas text-3xl leading-none text-accent">₹99</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-6">
              <span className="font-jp text-sm tracking-[0.4em] text-accent">マンドゥ</span>
              <p className="mt-4 font-bebas text-lg tracking-[0.35em] text-[#111111]/45">02 — THE DUMPLING</p>

              <h2 className="mt-4 font-bebas text-6xl leading-[0.86] tracking-tight sm:text-7xl md:text-8xl">
                MANDU
              </h2>

              <p className="mt-6 max-w-lg font-inter text-base leading-relaxed text-[#111111]/70 md:text-lg">
                Steamed or pan-fried to order. Golden outside, juicy inside, finished with our
                signature dip.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {MANDU_DETAILS.map((item) => (
                  <span
                    key={item}
                    className="border border-[#111111]/15 bg-white px-3.5 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-[#111111]/70"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <span className="flex items-baseline gap-2 bg-accent px-6 py-4 text-white">
                  <span className="font-bebas text-2xl tracking-[0.12em]">MANDU</span>
                  <span className="font-bebas text-3xl leading-none">₹99</span>
                </span>
                <button
                  type="button"
                  onClick={() => addItem('mandu')}
                  className="group inline-flex items-center gap-2 border border-[#111111] px-6 py-4 font-bebas text-lg tracking-[0.14em] text-[#111111] transition-all duration-300 hover:bg-[#111111] hover:text-cream"
                >
                  ADD TO CART
                  <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE RAMEN ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#111111] py-24 md:py-36">
        <div className="absolute inset-0">
          <img
            src="/images/Ramen.jpeg"
            alt="TAKKERU signature ramen bowl with rich broth, noodles and toppings"
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-[#111111]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/60" />
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <Reveal className="max-w-3xl">
            <span className="font-jp text-sm tracking-[0.4em] text-accent">ラーメン</span>
            <p className="mt-4 font-bebas text-lg tracking-[0.35em] text-white/45">03 — THE BOWL</p>

            <h2 className="mt-4 font-bebas text-6xl leading-[0.84] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              SIGNATURE<br />RAMEN
            </h2>

            <p className="mt-6 max-w-xl font-inter text-base leading-relaxed text-white/65 md:text-lg">
              Rich broth. Chewy noodles. Warm steam rising off the bowl. Built for cold nights and
              long queues.
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {RAMEN_DETAILS.map((item, index) => (
                <div key={item} className="flex items-center gap-3 border-l-2 border-accent/70 bg-white/[0.04] px-4 py-3">
                  <span className="font-bebas text-2xl leading-none text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="flex items-baseline gap-2 bg-cream px-6 py-4 text-[#111111]">
                <span className="font-bebas text-2xl tracking-[0.12em]">SIGNATURE RAMEN</span>
                <span className="font-bebas text-3xl leading-none text-accent">₹199</span>
              </span>
              <button
                type="button"
                onClick={() => addItem('ramen-signature')}
                className="group inline-flex items-center gap-2 border border-white/30 px-6 py-4 font-bebas text-lg tracking-[0.14em] text-white transition-all duration-300 hover:border-accent hover:bg-accent"
              >
                ADD TO CART
                <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TTEOKBOKKI ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-accent py-20 text-white md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-bebas text-[22vw] leading-none text-white/10"
        >
          HOT
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-6">
              <span className="font-jp text-sm tracking-[0.4em] text-white/85">トッポッキ</span>
              <p className="mt-4 font-bebas text-lg tracking-[0.35em] text-white/60">04 — THE FIRE</p>

              <h2 className="mt-4 font-bebas text-5xl leading-[0.86] tracking-tight sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                TTEOKBOKKI<br />BOWL
              </h2>

              <p className="mt-6 max-w-lg font-inter text-base leading-relaxed text-white/85 md:text-lg">
                Chewy rice cakes tossed in gochujang heat. Bold, spicy, unapologetically street.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {TTEOK_DETAILS.map((item) => (
                  <span
                    key={item}
                    className="border border-white/30 bg-white/10 px-3.5 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <span className="flex items-baseline gap-2 bg-[#111111] px-6 py-4 text-cream">
                  <span className="font-bebas text-xl tracking-[0.12em]">TTEOKBOKKI BOWL</span>
                  <span className="font-bebas text-3xl leading-none text-accent">₹249</span>
                </span>
                <button
                  type="button"
                  onClick={() => addItem('tteokbokki')}
                  className="group inline-flex items-center gap-2 border border-white/60 px-6 py-4 font-bebas text-lg tracking-[0.14em] text-white transition-all duration-300 hover:bg-white hover:text-accent"
                >
                  ADD TO CART
                  <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="md:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-[#111111] sm:aspect-[5/4]">
                <img
                  src="/images/tteokbokki.jpg"
                  alt="TAKKERU tteokbokki bowl — spicy Korean rice cakes"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent" />
              </div>
              <a
                href="#menu"
                className="group mt-6 inline-flex items-center gap-2 font-bebas text-lg tracking-[0.16em] text-white underline decoration-white/40 underline-offset-[6px] transition-colors duration-300 hover:decoration-white"
              >
                SEE THE FULL MENU
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
