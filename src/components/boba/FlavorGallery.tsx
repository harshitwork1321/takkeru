import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';
import { BOBA_CATALOG } from '../../data/bobaCatalog';
import scrollToId from './scrollToId';

interface FlavorGalleryProps {
  value: string | null;
  onChange: (id: string) => void;
}

export default function FlavorGallery({ value, onChange }: FlavorGalleryProps) {
  return (
    <section id="flavors" className="scroll-mt-20 border-t border-primary/10 bg-cream text-primary">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="font-bebas text-sm uppercase tracking-[0.35em] text-accent">
              01 — Find your flavor
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
              Four ways to sip.
            </h2>
          </div>
          <p className="max-w-md font-inter text-sm leading-relaxed text-primary/60 sm:text-right sm:text-base">
            All four flavors are included at the published ₹99 price — the menu price
            never changes with flavor.
          </p>
        </motion.div>

        <fieldset className="mt-10">
          <legend className="sr-only">Boba flavor</legend>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BOBA_CATALOG.flavors.map((flavor, index) => {
              const selected = flavor.id === value;
              return (
                <motion.label
                  key={flavor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
                  className="group relative block cursor-pointer"
                >
                  <input
                    type="radio"
                    name="boba-flavor"
                    value={flavor.id}
                    checked={selected}
                    onChange={() => onChange(flavor.id)}
                    className="sr-only peer"
                  />
                  <div
                    className={`overflow-hidden rounded-3xl border-2 bg-white transition-all duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent group-hover:-translate-y-1 ${
                      selected
                        ? 'border-accent shadow-[0_24px_60px_rgba(214,40,40,0.22)]'
                        : 'border-primary/10 shadow-[0_10px_30px_rgba(10,10,10,0.08)]'
                    }`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-primary/5">
                      <img
                        src={flavor.image ?? BOBA_CATALOG.image}
                        alt={`${flavor.name} boba tea`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/70 to-transparent"
                      />
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 font-bebas text-sm tracking-[0.12em] text-primary">
                        ₹99
                      </span>
                      {selected && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 font-bebas text-xs tracking-[0.14em] text-white"
                        >
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                          Selected
                        </motion.span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-bebas text-xl uppercase leading-none tracking-[0.08em] text-primary">
                          {flavor.name}
                        </h3>
                        <span className="shrink-0 font-jp text-[11px] text-primary/45">
                          {flavor.japanese}
                        </span>
                      </div>
                      <p className="mt-2 font-inter text-xs leading-relaxed text-primary/55">
                        {flavor.description}
                      </p>
                    </div>
                  </div>
                </motion.label>
              );
            })}
          </div>
        </fieldset>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <button
            type="button"
            onClick={() => scrollToId('build')}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border-2 border-primary px-7 font-bebas text-lg uppercase tracking-[0.15em] text-primary transition-colors duration-200 hover:bg-primary hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Make it yours
            <ArrowDown
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
