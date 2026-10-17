import { useState } from 'react';
import Reveal from './Reveal';
import FlavorCard from './FlavorCard';
import { FLAVORS } from '../data/flavors';

export default function BobaFlavors() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section
      id="explore-boba"
      className="relative overflow-hidden bg-[#111111] py-20 text-[#FFF8EE] md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-1/2 hidden -translate-y-1/2 select-none font-bebas text-[22vw] leading-none text-white/[0.04] md:block"
      >
        FLAVORS
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-white/15 pb-7">
          <div>
            <span className="font-jp text-sm tracking-[0.4em] text-accent">フレーバー</span>
            <h2 className="mt-4 font-bebas text-6xl leading-[0.86] tracking-tight sm:text-7xl md:text-8xl">
              EXPLORE BOBA TEA
            </h2>
          </div>
          <p className="max-w-sm font-inter text-base leading-relaxed text-white/70">
            Three flavors. Three different cravings. Find your TAKKERU favorite.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 justify-items-center gap-12 md:grid-cols-3 md:gap-8">
          {FLAVORS.map((flavor, index) => (
            <FlavorCard
              key={flavor.id}
              flavor={flavor}
              index={index}
              isActive={activeId === flavor.id}
              onActivate={setActiveId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
