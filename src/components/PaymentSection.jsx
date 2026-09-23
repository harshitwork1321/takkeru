import { ArrowUpRight, Lock } from 'lucide-react';
import { PAYMENT_URL } from '../lib/links';

export default function PaymentSection() {
  return (
    <section
      id="pay"
      aria-labelledby="pay-heading"
      className="relative overflow-hidden bg-[#111111] py-24 md:py-32"
      style={{ scrollMarginTop: '88px' }}
    >
      <div className="pointer-events-none absolute inset-0 halftone-bg opacity-[0.04]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-jp mb-6 block text-sm tracking-[0.4em] text-golden">
            タッケル・カート
          </span>

          <h2
            id="pay-heading"
            className="font-bebas text-5xl leading-[0.9] tracking-wide text-white md:text-7xl lg:text-8xl"
          >
            READY TO PAY?
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-inter text-base leading-relaxed text-white/60 md:text-lg">
            Complete your TAKKERU payment securely through our payment partner.
          </p>

          <div
            className="mx-auto mt-12 w-full max-w-md border border-white/10 bg-[#181818] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:p-8"
          >
            <div className="flex items-center justify-center gap-3 border-b border-white/10 pb-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-golden/40 bg-golden/10">
                <Lock className="h-4 w-4 text-golden" aria-hidden="true" />
              </span>
              <span className="font-inter text-xs font-semibold uppercase tracking-[0.28em] text-cream/90">
                Secure Payment
              </span>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
              <span className="font-jp text-[11px] tracking-[0.3em] text-white/40">
                タッケル・カート
              </span>

              <a
                href={PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full min-h-[56px] items-center justify-center gap-3 bg-accent px-10 py-4 font-bebas text-xl tracking-[0.16em] text-cream shadow-[0_16px_40px_rgba(214,40,40,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:text-[#111111] active:translate-y-0 sm:w-auto"
              >
                PAY NOW
                <ArrowUpRight
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <p className="font-inter text-[10px] uppercase tracking-[0.22em] text-white/35">
                Opens our payment partner securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
