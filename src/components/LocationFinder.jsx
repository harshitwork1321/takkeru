import { useState, useCallback } from 'react';
import Reveal from './Reveal';
import LocationCard from './locations/LocationCard';
import { LOCATIONS } from '../data/locations';

/**
 * FIND YOUR TAKKERU — data-driven location discovery with per-location
 * video experiences. All business details come from src/data/locations.js.
 */
export default function LocationFinder() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  const handleActivate = useCallback((id) => setActiveVideoId(id), []);

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="relative overflow-hidden bg-[#111111] py-20 text-[#FFF8EE] md:py-32"
      style={{ scrollMarginTop: '88px' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none font-bebas text-[18vw] leading-none text-white/[0.04] lg:block"
      >
        LOCATIONS
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-white/15 pb-7">
          <div>
            <span className="font-jp text-sm tracking-[0.4em] text-accent">店舗</span>
            <h2
              id="locations-heading"
              className="mt-4 font-bebas text-6xl leading-[0.86] tracking-tight sm:text-7xl md:text-8xl"
            >
              FIND YOUR TAKKERU
            </h2>
          </div>
          <p className="max-w-sm font-inter text-base leading-relaxed text-white/70">
            Delhi, Dehradun and Nagpri — watch the story of each stop and
            discover where TAKKERU is heading next.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((location, index) => (
            <Reveal key={location.id} delay={index * 0.12} className="h-full">
              <LocationCard
                location={location}
                isActive={activeVideoId === location.id}
                onActivate={handleActivate}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
