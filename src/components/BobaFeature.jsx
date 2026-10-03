import { ArrowUpRight, Plus } from 'lucide-react';
import LazyVideo from './LazyVideo';
import Reveal from './Reveal';
import useCart from '../hooks/useCart';

const INGREDIENTS = ['Brown sugar syrup', 'Tapioca pearls', 'Ice', 'Milk tea'];

export default function BobaFeature() {
  const { addItem } = useCart();

  return (
    <section id="boba" className="relative overflow-hidden bg-cream text-[#111111] py-20 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-bebas text-[26vw] leading-none text-[#111111]/[0.04] md:block"
      >
        BOBA
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-6 lg:col-span-5">
            <span className="font-jp text-sm tracking-[0.4em] text-accent">ボバティー</span>
            <p className="mt-4 font-bebas text-lg tracking-[0.35em] text-[#111111]/45">
              01 — THE DRINK
            </p>

            <h2 className="mt-4 font-bebas text-6xl leading-[0.86] tracking-tight sm:text-7xl md:text-8xl">
              BOBA<br />TEA
            </h2>

            <p className="mt-6 max-w-md font-inter text-base leading-relaxed text-[#111111]/70 md:text-lg">
              Chewy pearls. Creamy tea. Serious street-food energy.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {INGREDIENTS.map((item) => (
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
                <span className="font-bebas text-2xl tracking-[0.12em]">BOBA TEA</span>
                <span className="font-bebas text-3xl leading-none">₹99</span>
              </span>

              <button
                type="button"
                onClick={() => addItem('boba-tea')}
                className="group inline-flex items-center gap-2 border border-[#111111] px-6 py-4 font-bebas text-lg tracking-[0.14em] text-[#111111] transition-all duration-300 hover:bg-[#111111] hover:text-cream"
              >
                ADD TO CART
                <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              </button>

              <a
                href="#drinks"
                className="group inline-flex items-center gap-2 font-bebas text-lg tracking-[0.14em] text-accent underline decoration-accent/40 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent"
              >
                SEE IT POUR
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-6 lg:col-span-7">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-[#111111] sm:aspect-[3/4] md:aspect-[4/5]">
                <LazyVideo
                  src="/media/takkeru-boba-commercial.mp4"
                  poster="/media/posters/takkeru-boba-commercial.jpg"
                  fallbackImage="/images/boba.jpg"
                  containerClassName="h-full w-full"
                />
              </div>

              <div className="absolute -bottom-5 -left-3 bg-[#111111] px-6 py-4 text-cream shadow-[0_18px_45px_rgba(0,0,0,0.25)] sm:-left-6">
                <p className="font-jp text-[10px] tracking-[0.3em] text-accent">ボバティー</p>
                <p className="font-bebas text-3xl leading-none tracking-[0.1em]">SERVED COLD</p>
              </div>

              <div className="absolute -right-2 top-5 hidden rotate-3 bg-accent px-4 py-2 font-bebas text-lg tracking-[0.16em] text-white sm:block">
                CHEWY PEARLS
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
