import { AnimatePresence, motion } from 'framer-motion';
import { describeBobaSelection } from '../../lib/bobaSelection';
import type { BobaOption, BobaSelection } from '../../types/boba';

interface BobaPreviewProps {
  flavor: BobaOption | null;
  selection: BobaSelection;
  className?: string;
}

export default function BobaPreview({ flavor, selection, className = '' }: BobaPreviewProps) {
  const described = describeBobaSelection(selection);
  const parts = [
    described.flavor,
    described.size ? `${described.size} cup` : null,
    described.sweetness,
    described.ice,
    described.toppings.length > 0 ? described.toppings.join(', ') : null,
    ...described.extras,
  ].filter((part): part is string => Boolean(part));

  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white shadow-[0_24px_70px_rgba(10,10,10,0.12)]">
        <div className="relative aspect-[3/4] overflow-hidden bg-primary/5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={flavor?.id ?? 'none'}
              src={flavor?.image ?? '/images/boba.jpg'}
              alt={flavor ? `${flavor.name} boba tea` : 'TAKKERU boba tea'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/85 via-primary/40 to-transparent"
          />

          <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 font-bebas text-xs tracking-[0.16em] text-primary">
            {selection.sizeId === 'large' ? 'Large cup' : 'Regular cup'}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-primary/80 px-3 py-1 font-bebas text-xs tracking-[0.16em] text-cream">
            {described.ice ?? '—'}
          </span>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="truncate font-bebas text-2xl uppercase leading-none tracking-[0.06em] text-cream">
                {flavor?.name ?? 'Boba Tea'}
              </p>
              <p className="mt-1 font-inter text-[11px] uppercase tracking-[0.18em] text-cream/70">
                {flavor?.japanese ?? ''}
                {flavor?.japanese ? ' · ' : ''}
                {described.sweetness ?? ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 font-inter text-sm leading-relaxed text-primary/60">
        <span className="font-semibold text-primary">In this cup: </span>
        {parts.length > 0 ? `${parts.join(' · ')}.` : 'nothing chosen yet.'}
      </figcaption>
    </figure>
  );
}
