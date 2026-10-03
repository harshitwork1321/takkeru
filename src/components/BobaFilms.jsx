import LazyVideo from './LazyVideo';
import Reveal from './Reveal';

const FEATURED = {
  src: '/media/takkeru-boba-commercial.mp4',
  poster: '/media/posters/takkeru-boba-commercial.jpg',
  label: 'THE POUR',
  japanese: 'ボバティー',
};

const CARDS = [
  { src: '/media/takkeru-boba-01.mp4', poster: '/media/posters/takkeru-boba-01.jpg', label: 'BROWN SUGAR', japanese: '黒糖', fallback: '/images/boba.jpg' },
  { src: '/media/takkeru-boba-03.mp4', poster: '/media/posters/takkeru-boba-03.jpg', label: 'MILK TEA', japanese: 'ミルクティー', fallback: '/images/boba.jpg' },
  { src: '/media/takkeru-matcha-boba.mp4', poster: '/media/posters/takkeru-matcha-boba.jpg', label: 'MATCHA BOBA', japanese: '抹茶ボバ', fallback: '/media/posters/takkeru-matcha-boba.jpg' },
  { src: '/media/takkeru-soda-bubble-drink.mp4', poster: '/media/posters/takkeru-soda-bubble-drink.jpg', label: 'SODA BUBBLE', japanese: 'ソーダ', fallback: '/media/posters/takkeru-soda-bubble-drink.jpg' },
];

const STRIP = [
  { src: '/media/takkeru-boba-05.mp4', poster: '/media/posters/takkeru-boba-05.jpg', label: 'STRAIGHT FROM THE CART', fallback: '/images/boba.jpg' },
  { src: '/media/takkeru-boba-tea-commercial.mp4', poster: '/media/posters/takkeru-boba-tea-commercial.jpg', label: 'THE COMMERCIAL', fallback: '/images/boba.jpg' },
  { src: '/media/takkeru-matcha-boba.mp4', poster: '/media/posters/takkeru-matcha-boba.jpg', label: 'MATCHA BOBA', fallback: '/media/posters/takkeru-matcha-boba.jpg' },
  { src: '/media/takkeru-soda-bubble-drink.mp4', poster: '/media/posters/takkeru-soda-bubble-drink.jpg', label: 'SODA BUBBLE DRINK', fallback: '/media/posters/takkeru-soda-bubble-drink.jpg' },
  { src: '/media/takkeru-boba-01.mp4', poster: '/media/posters/takkeru-boba-01.jpg', label: 'BROWN SUGAR', fallback: '/images/boba.jpg' },
  { src: '/media/takkeru-boba-04.mp4', poster: '/media/posters/takkeru-boba-04.jpg', label: 'FIRST SIP', fallback: '/images/boba.jpg' },
];

export default function BobaFilms() {
  return (
    <section id="drinks" className="relative overflow-hidden bg-primary py-24 md:py-36">
      <div className="halftone-bg pointer-events-none absolute inset-0" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-jp text-sm tracking-[0.4em] text-accent">飲み物</span>
              <h2 className="mt-4 max-w-3xl font-bebas text-5xl leading-[0.88] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                THREE DRINKS.<br />ONE CART.
              </h2>
            </div>
            <p className="max-w-xs font-inter text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/45 md:text-right">
              Brown sugar, matcha and carbonated soda — real pours, shot close,
              served cold.
            </p>
          </div>
          <div className="food-rule mt-8 w-40" />
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          <Reveal className="col-span-2 md:col-span-2 md:row-span-2">
            <div className="group relative aspect-[4/5] w-full overflow-hidden border border-white/10 transition-colors duration-500 hover:border-accent/60 md:aspect-auto md:h-full">
              <LazyVideo
                src={FEATURED.src}
                poster={FEATURED.poster}
                fallbackImage="/images/boba.jpg"
                containerClassName="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <span className="font-jp text-[10px] tracking-[0.3em] text-accent">{FEATURED.japanese}</span>
                <h3 className="font-bebas text-3xl leading-none tracking-wide text-white md:text-5xl">
                  {FEATURED.label}
                </h3>
              </div>
              <span className="pointer-events-none absolute left-4 top-4 font-bebas text-5xl leading-none text-white/15 select-none md:text-7xl">
                00
              </span>
            </div>
          </Reveal>

          {CARDS.map((card, index) => (
            <Reveal key={card.src} delay={0.06 * index}>
              <div className="group relative aspect-[9/16] w-full overflow-hidden border border-white/10 transition-colors duration-500 hover:border-accent/60">
                <LazyVideo
                  src={card.src}
                  poster={card.poster}
                  fallbackImage={card.fallback}
                  containerClassName="h-full w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
                  <span className="font-jp text-[9px] tracking-[0.3em] text-accent">{card.japanese}</span>
                  <h3 className="font-bebas text-xl leading-tight tracking-wide text-white md:text-2xl">
                    {card.label}
                  </h3>
                </div>
                <span className="pointer-events-none absolute left-3 top-3 font-bebas text-3xl leading-none text-white/15 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Horizontal / marquee video strip */}
      <div className="boba-marquee-mask relative z-10 mt-8 md:mt-12">
        <div className="boba-marquee-track gap-4 md:gap-5">
          {[...STRIP, ...STRIP].map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              className="relative aspect-[9/16] w-[58vw] shrink-0 overflow-hidden border border-white/10 sm:w-[34vw] md:w-[19vw]"
            >
              <LazyVideo
                src={item.src}
                poster={item.poster}
                fallbackImage={item.fallback}
                containerClassName="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent" />
              <span className="pointer-events-none absolute bottom-3 left-3 right-3 font-bebas text-sm tracking-[0.16em] text-white/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
