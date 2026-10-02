import Reveal from './Reveal';

export default function CartTransition() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-bebas text-[26vw] leading-none text-white/[0.03]">TAKKERU</span>
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center md:px-12">
        <Reveal>
          <span className="font-jp text-sm tracking-[0.4em] text-accent">始めよう</span>
          <p className="mt-6 font-bebas text-2xl tracking-[0.3em] text-white/50 md:text-3xl">
            LOVE TAKKERU?
          </p>
          <h2 className="mx-auto mt-4 max-w-5xl font-bebas text-5xl leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[6rem]">
            BRING TAKKERU<br className="hidden sm:block" /> TO YOUR STREET.
          </h2>
          <div className="mx-auto mt-8 h-[2px] w-24 bg-accent" />
          <p className="mx-auto mt-8 max-w-2xl font-inter text-base leading-relaxed text-white/60 md:text-lg">
            Start your own TAKKERU Cart and bring the brand&apos;s food and drinks to your location.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
