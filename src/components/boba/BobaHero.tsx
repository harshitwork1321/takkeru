import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import scrollToId from './scrollToId';

const STATS = [
  { value: '04', label: 'Published flavors' },
  { value: '₹99', label: 'Base price' },
  { value: '+₹50', label: 'Large cup' },
];

const HERO_IMAGE = '/media/posters/takkeru-taro-boba.jpg';
const HERO_ALT =
  'TAKKERU Taro Boba Tea splash — purple taro drink pouring over ice with boba pearls';

export default function BobaHero() {
  return (
    <section className="relative overflow-hidden bg-cream text-primary">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-4 select-none font-bebas text-[16rem] leading-none text-primary/[0.045] sm:text-[22rem]"
      >
        BOBA
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-1 w-1/3 bg-accent"
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-20 lg:pt-14">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 bg-accent px-3 py-1.5 font-bebas text-xs uppercase tracking-[0.32em] text-white sm:text-sm"
          >
            Takkeru Boba Lab
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
            className="mt-5 font-serif text-6xl font-semibold leading-[0.94] tracking-tight text-primary sm:text-7xl xl:text-8xl"
          >
            Your boba.
            <span className="mt-1 block italic text-accent">Your rules.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
            className="mt-5 max-w-xl font-inter text-base leading-relaxed text-primary/70 sm:text-lg"
          >
            Four published flavors, real tapioca pearls, and a cup built exactly how you
            like it — every combination prices at the published menu rate.
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: 'easeOut' }}
            className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-primary/10 border-y border-primary/10 py-4"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="px-4 first:pl-0 last:pr-0">
                <dt className="font-bebas text-[11px] uppercase tracking-[0.2em] text-primary/50">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-bebas text-3xl leading-none text-primary sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={() => scrollToId('flavors')}
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-7 font-bebas text-lg uppercase tracking-[0.15em] text-cream transition-colors duration-200 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Find your flavor
              <ArrowDown
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-accent"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-[0_30px_80px_rgba(10,10,10,0.18)]">
            <img
              src={HERO_IMAGE}
              alt={HERO_ALT}
              loading="eager"
              fetchPriority="high"
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="flex items-center justify-between gap-3 border-t border-primary/10 bg-white px-5 py-4">
              <span>
                <span className="block font-bebas text-xl uppercase tracking-[0.1em] text-primary">
                  Taro Boba Tea
                </span>
                <span className="mt-0.5 block font-inter text-xs text-primary/55">
                  タロボバ · one of four flavors
                </span>
              </span>
              <span className="rounded-full bg-accent px-3 py-1 font-bebas text-sm tracking-[0.12em] text-white">
                ₹99
              </span>
            </div>
          </div>
          <div className="absolute -left-3 -top-3 rotate-[-8deg] rounded-full bg-golden px-4 py-2 font-bebas text-xs tracking-[0.16em] text-primary shadow-[0_8px_24px_rgba(10,10,10,0.2)] sm:text-sm">
            Made to order
          </div>
        </motion.div>
      </div>
    </section>
  );
}
