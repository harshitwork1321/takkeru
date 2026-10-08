import { useState, useCallback } from 'react';
import { ArrowDownRight, ArrowRight, Check, Play } from 'lucide-react';

const FEATURED = {
  title: 'CLEANING & EQUIPMENT MAINTENANCE',
  duration: '0:10',
  src: '/media/takkeru-training-cleaning.mp4',
  poster: '/media/posters/takkeru-training-cleaning.jpg',
  fallback: '/images/takkeru-cart.jpg',
  alt: 'TAKKERU staff cleaning around the boba tea cart',
  covers: [
    'Before-opening cleaning',
    'During-operation cleaning',
    'End-of-day cleaning',
    'Shaker cleaning',
    'Measuring equipment',
    'Worktable cleaning',
    'Storage container cleaning',
  ],
};

const PREPARATION = {
  title: 'BOBA TEA PREPARATION',
  duration: '0:29',
  src: '/media/takkeru-training-preparation.mp4',
  poster: '/media/posters/takkeru-training-preparation.jpg',
  fallback: '/images/boba.jpg',
  alt: 'Step-by-step TAKKERU boba tea preparation tutorial',
  blurb:
    'The numbered build, start to finish — ingredients, measurements and pour, in the same order every time.',
};

const MODULES = [
  {
    n: '01',
    phase: 'OPENING',
    title: 'OPENING',
    subtitle: 'Personal hygiene & workstation',
    body: 'Start every shift with hygiene. Wash and sanitize your hands, wear your uniform and cap, and make sure the workstation is clean and ready.',
    checks: ['Personal Hygiene', 'Clean Workstation'],
    duration: '10 SEC',
  },
  {
    n: '02',
    phase: 'OPENING',
    title: 'INGREDIENTS',
    subtitle: 'Equipment & ingredients',
    body: 'Check all equipment and essential ingredients. Confirm ice, milk, soda and boba are available, fresh and stored correctly.',
    checks: ['Check Equipment', 'Ice', 'Milk', 'Soda', 'Boba'],
    duration: '10 SEC',
  },
  {
    n: '03',
    phase: 'OPENING',
    title: 'PREPARATION',
    subtitle: 'Syrups, packaging & final check',
    body: 'Check syrups, cups and straws. Verify expiry dates, prepare required ingredients, and test all equipment before opening.',
    checks: ['Syrups & Packaging', 'Expiry Check', 'Prepare & Test'],
    duration: '10 SEC',
  },
  {
    n: '04',
    phase: 'CLOSING',
    title: 'CLEANING',
    subtitle: 'Clean, store & dispose',
    body: 'At closing, dispose of expired or unsafe ingredients. Store all ingredients correctly and thoroughly clean equipment, shakers and utensils.',
    checks: ['Dispose Safely', 'Store Correctly', 'Clean Equipment'],
    duration: '10 SEC',
  },
  {
    n: '05',
    phase: 'CLOSING',
    title: 'CLOSING',
    subtitle: 'Final outlet check',
    body: 'Finish with a complete outlet check. Clean the floor and workstation, empty waste, check storage, record remaining stock, and switch off equipment.',
    checks: ['Clean', 'Stock', 'Store', 'Switch Off'],
    duration: '10 SEC',
    outro: 'Ready for the next shift.',
  },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
}

/**
 * Click-to-play training video. Renders poster + play button first so the
 * card is fully visible even before any media loads; a failed video falls
 * back to a still image instead of breaking the layout.
 */
function TrainingPlayer({ video, className = '', frameClassName = '' }) {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  const handlePlay = useCallback(() => setStarted(true), []);

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      {/* Blurred backdrop fills the empty sides of portrait footage */}
      <img
        src={video.poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl opacity-70"
      />

      {failed ? (
        <img
          src={video.fallback}
          alt={`${video.title} — video unavailable, showing fallback image`}
          className={`absolute inset-0 h-full w-full object-cover ${frameClassName}`}
        />
      ) : started ? (
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          aria-label={video.title}
          className={`absolute inset-0 h-full w-full ${frameClassName}`}
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Play ${video.title}`}
          className="group absolute inset-0 flex w-full items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C542]"
        >
          <img
            src={video.poster}
            alt={video.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${frameClassName}`}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35" />

          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-black/45 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#F4C542] group-hover:bg-[#D62828] md:h-20 md:w-20">
            <Play className="ml-1 h-6 w-6 fill-white text-white md:h-7 md:w-7" />
          </span>

          <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-left">
            <span className="font-bebas text-xl leading-none tracking-[0.08em] text-white sm:text-2xl">
              {video.title}
            </span>
            <span className="shrink-0 border border-white/40 bg-black/50 px-2 py-1 font-bebas text-xs tracking-[0.16em] text-white/90">
              {video.duration}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function ModuleCard({ module, onWatch }) {
  return (
    <article className="group relative flex flex-col border border-white/10 bg-[#181818] p-5 transition-colors duration-300 hover:border-[#D62828]/70 sm:p-6">
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-px w-full bg-gradient-to-r from-[#D62828] via-[#F4C542]/40 to-transparent opacity-60"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="font-bebas text-5xl leading-none text-white/15 transition-colors duration-300 group-hover:text-[#D62828]/70 sm:text-6xl">
          {module.n}
        </span>
        <span className="border border-white/15 px-2 py-1 font-bebas text-[10px] tracking-[0.2em] text-white/55">
          {module.phase}
        </span>
      </div>

      <h3 className="mt-4 font-bebas text-2xl leading-none tracking-[0.06em] text-[#FFF8EE] sm:text-3xl">
        {module.title}
      </h3>
      <p className="mt-1 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-[#F4C542]">
        {module.subtitle}
      </p>

      <p className="mt-3 flex-1 font-inter text-sm leading-relaxed text-[#FFF8EE]/60">
        {module.body}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {module.checks.map((check) => (
          <li
            key={check}
            className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.04] px-2 py-1 font-inter text-[11px] font-medium text-[#FFF8EE]/80"
          >
            <Check className="h-3 w-3 shrink-0 text-[#F4C542]" aria-hidden="true" />
            {check}
          </li>
        ))}
      </ul>

      {module.outro && (
        <p className="mt-4 font-bebas text-lg tracking-[0.12em] text-[#F4C542]">
          {module.outro}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
          {module.duration}
        </span>
        <button
          type="button"
          onClick={onWatch}
          aria-label={`Watch the training video for module ${module.n}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-300 hover:border-[#F4C542] hover:bg-[#D62828] hover:text-white"
        >
          <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
        </button>
      </div>
    </article>
  );
}

export default function TrainingSection() {
  const watchFeatured = useCallback(() => scrollToId('training-video'), []);

  return (
    <section id="training" className="relative overflow-hidden bg-[#111111] py-20 text-[#FFF8EE] md:py-32">
      <div className="halftone-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-jp text-sm tracking-[0.4em] text-[#D62828]">研修</span>
            <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFF8EE]/50">
              TAKKERU ACADEMY — Food Operations
            </span>
          </div>

          <h2 className="mt-5 font-bebas text-6xl leading-[0.86] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[6.5rem]">
            LEARN HOW TO
            <br />
            MAKE BOBA TEA.
          </h2>

          <p className="mt-6 max-w-xl font-inter text-base leading-relaxed text-[#FFF8EE]/65 md:text-lg">
            Step-by-step training for consistent preparation, clean operations
            and better service.
          </p>

          <button
            type="button"
            onClick={watchFeatured}
            className="group mt-8 inline-flex items-center gap-3 bg-[#D62828] px-8 py-4 font-bebas text-xl tracking-[0.12em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#FFF8EE] hover:text-[#111111]"
          >
            START TRAINING
            <ArrowDownRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
          </button>
        </header>

        {/* ── Featured training videos ───────────────────────── */}
        <div id="training-video" className="mt-14 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="border border-white/10 bg-[#181818] p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F4C542]">
                    Featured training video
                  </span>
                  <h3 className="mt-1 font-bebas text-3xl leading-none tracking-[0.05em] text-white sm:text-4xl">
                    {FEATURED.title}
                  </h3>
                </div>
                <span className="border border-[#D62828]/60 px-3 py-1.5 font-bebas text-sm tracking-[0.18em] text-[#D62828]">
                  {FEATURED.duration}
                </span>
              </div>

              <TrainingPlayer
                video={FEATURED}
                className="aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[16/11]"
                frameClassName="object-contain"
              />

              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {FEATURED.covers.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-2.5 font-inter text-[13px] text-[#FFF8EE]/65"
                  >
                    <span className="font-bebas text-xs text-[#F4C542]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex h-full flex-col border border-white/10 bg-[#181818] p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F4C542]">
                    Module video
                  </span>
                  <h3 className="mt-1 font-bebas text-3xl leading-none tracking-[0.05em] text-white sm:text-4xl">
                    {PREPARATION.title}
                  </h3>
                </div>
                <span className="border border-[#D62828]/60 px-3 py-1.5 font-bebas text-sm tracking-[0.18em] text-[#D62828]">
                  {PREPARATION.duration}
                </span>
              </div>

              <TrainingPlayer
                video={PREPARATION}
                className="aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-auto lg:flex-1"
                frameClassName="object-contain"
              />

              <p className="mt-4 font-inter text-sm leading-relaxed text-[#FFF8EE]/60">
                {PREPARATION.blurb}
              </p>

              <a
                href="#training-modules"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId('training-modules');
                }}
                className="group mt-5 inline-flex items-center gap-2 self-start font-bebas text-lg tracking-[0.14em] text-[#F4C542] underline decoration-[#F4C542]/40 underline-offset-[6px] transition-colors duration-300 hover:decoration-[#F4C542]"
              >
                OPENING &amp; CLOSING SOP
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Module timeline ────────────────────────────────── */}
        <div id="training-modules" className="mt-16 md:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-white/15 pb-6">
            <div>
              <span className="font-jp text-sm tracking-[0.4em] text-[#D62828]">ボバティー研修</span>
              <h3 className="mt-3 font-bebas text-5xl leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl">
                BOBA TEA TRAINING
              </h3>
            </div>
            <p className="max-w-xs font-inter text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/45 md:text-right">
              Five modules — opening to closing. Follow TAKKERU&apos;s approved
              SOP at your outlet.
            </p>
          </div>

          {/* Static progress track — visible with or without JS */}
          <ol
            aria-label="Training modules, 1 to 5"
            className="mt-8 hidden md:flex md:items-center"
          >
            {MODULES.map((module, index) => (
              <li key={module.n} className="flex flex-1 items-center last:flex-none">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F4C542]/50 font-bebas text-sm text-[#F4C542]">
                    {module.n}
                  </span>
                  <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                    {module.title}
                  </span>
                </span>
                {index < MODULES.length - 1 && (
                  <span aria-hidden="true" className="mx-3 h-px flex-1 bg-gradient-to-r from-[#F4C542]/45 to-white/15" />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {MODULES.map((module) => (
              <ModuleCard key={module.n} module={module} onWatch={watchFeatured} />
            ))}
          </div>
        </div>

        {/* ── End screen ─────────────────────────────────────── */}
        <div className="mt-16 border border-[#D62828]/40 bg-[#D62828]/[0.07] px-6 py-10 text-center md:mt-24 md:px-12 md:py-14">
          <p className="font-jp text-sm tracking-[0.5em] text-[#F4C542]">TAKKERU BOBA TEA</p>
          <p className="mx-auto mt-5 max-w-3xl font-bebas text-4xl leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl">
            FOLLOW SOP.
            <br />
            MAINTAIN QUALITY.
            <br />
            SERVE CONSISTENTLY.
          </p>

          <p className="mt-8 font-inter text-xs font-semibold uppercase tracking-[0.3em] text-[#FFF8EE]/60">
            Ready for your TAKKERU Cart?
          </p>
          <button
            type="button"
            onClick={() => scrollToId('cart')}
            className="group mt-5 inline-flex items-center gap-3 bg-[#FFF8EE] px-9 py-4 font-bebas text-xl tracking-[0.12em] text-[#111111] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#D62828] hover:text-white"
          >
            START YOUR TAKKERU CART
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <p className="mx-auto mt-9 max-w-xl font-inter text-[11px] leading-relaxed text-[#FFF8EE]/45">
            Follow TAKKERU&apos;s approved SOP, applicable local food-safety
            requirements, and the manufacturer&apos;s instructions for equipment.
          </p>
        </div>
      </div>
    </section>
  );
}
