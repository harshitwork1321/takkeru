import { motion } from 'framer-motion';
import type { BobaOption, BobaQuote, BobaSelection } from '../../types/boba';
import BobaPreview from './BobaPreview';
import BobaOrderSummary from './BobaOrderSummary';
import CupSizeSelector from './CupSizeSelector';
import SweetnessSelector from './SweetnessSelector';
import IceSelector from './IceSelector';
import ToppingSelector from './ToppingSelector';

interface BobaCustomizerProps {
  selection: BobaSelection;
  quote: BobaQuote;
  flavor: BobaOption | null;
  onSweetnessChange: (id: string) => void;
  onIceChange: (id: string) => void;
  onSizeChange: (id: string) => void;
  onToppingToggle: (id: string) => void;
  onReset: () => void;
  onAddToCart: () => void;
}

export default function BobaCustomizer({
  selection,
  quote,
  flavor,
  onSweetnessChange,
  onIceChange,
  onSizeChange,
  onToppingToggle,
  onReset,
  onAddToCart,
}: BobaCustomizerProps) {
  return (
    <section
      id="build"
      className="scroll-mt-20 border-t border-primary/10 bg-cream text-primary"
    >
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="font-bebas text-sm uppercase tracking-[0.35em] text-accent">
            02 — Make it yours
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Dial in the cup.
          </h2>
          <p className="mt-3 max-w-xl font-inter text-base leading-relaxed text-primary/65">
            Sweetness, ice, size, and pearls — the live cup and your order total update
            with every choice.
          </p>
        </motion.div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_440px]">
          <div className="space-y-6">
            <div className="space-y-7 rounded-3xl border border-primary/10 bg-white/70 p-5 sm:p-7">
              <CupSizeSelector value={selection.sizeId} onChange={onSizeChange} />
              <div className="h-px bg-primary/10" />
              <SweetnessSelector value={selection.sweetnessId} onChange={onSweetnessChange} />
              <div className="h-px bg-primary/10" />
              <IceSelector value={selection.iceId} onChange={onIceChange} />
            </div>

            <div className="rounded-3xl border border-primary/10 bg-white/70 p-5 sm:p-7">
              <ToppingSelector
                value={[...selection.toppingIds, ...selection.extraIds]}
                onToggle={onToppingToggle}
              />
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto lg:overscroll-contain lg:pb-2 scrollbar-thin">
            <BobaPreview flavor={flavor} selection={selection} />
            <BobaOrderSummary
              quote={quote}
              onReset={onReset}
              onAddToCart={onAddToCart}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
