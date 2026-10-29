import { motion } from 'framer-motion';
import { RotateCcw, ShoppingBag } from 'lucide-react';
import { PRICE_NOTE } from '../../data/bobaCatalog';
import { formatPrice } from '../../lib/cart';
import type { BobaQuote } from '../../types/boba';

const GROUP_LABEL: Record<string, string> = {
  drink: 'Drink',
  flavor: 'Flavor',
  sweetness: 'Sweetness',
  ice: 'Ice',
  size: 'Cup size',
  topping: 'Toppings',
  extra: 'Extras',
};

function amountLabel(line: BobaQuote['lines'][number]) {
  if (line.amountInr == null) return 'Not on menu';
  if (line.group === 'drink') return formatPrice(line.amountInr);
  if (line.included || line.amountInr === 0) return 'Included';
  return `+ ${formatPrice(line.amountInr)}`;
}

function blockMessage(quote: BobaQuote) {
  if (quote.unpricedNames.length > 0) {
    return `${quote.unpricedNames.join(', ')} ${
      quote.unpricedNames.length > 1 ? 'are' : 'is'
    } not on the published menu, so this drink cannot be added.`;
  }
  return 'Choose a published flavor, sugar level, ice level and cup size before adding this drink.';
}

interface BobaOrderSummaryProps {
  quote: BobaQuote;
  onReset: () => void;
  onAddToCart: () => void;
}

export default function BobaOrderSummary({ quote, onReset, onAddToCart }: BobaOrderSummaryProps) {
  const singles = quote.lines.filter((line) =>
    ['flavor', 'sweetness', 'ice', 'size'].includes(line.group),
  );
  const toppings = quote.lines.filter((line) => line.group === 'topping');
  const extras = quote.lines.filter((line) => line.group === 'extra');

  return (
    <section
      aria-label="Your boba"
      className="rounded-3xl border border-primary/10 bg-white p-5 shadow-[0_24px_70px_rgba(10,10,10,0.10)] sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bebas text-sm uppercase tracking-[0.24em] text-primary">
          Your order
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 items-center gap-1.5 font-inter text-sm text-primary/50 transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>

      <ul className="mt-3 divide-y divide-primary/10">
        {singles.map((line) => (
          <li
            key={`${line.group}-${line.id}`}
            className="flex min-h-13 items-center justify-between gap-3 py-2.5"
          >
            <span className="min-w-0">
              <span className="block font-bebas text-[11px] uppercase tracking-[0.18em] text-primary/45">
                {GROUP_LABEL[line.group]}
              </span>
              <span className="block truncate font-inter text-sm font-medium text-primary">
                {line.name}
              </span>
            </span>
            <span className="shrink-0 font-bebas text-xs tracking-[0.1em] text-primary/55">
              {amountLabel(line)}
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-primary/10 py-3">
        <p className="font-bebas text-[11px] uppercase tracking-[0.18em] text-primary/45">
          Toppings
        </p>
        <p className="mt-1 font-inter text-sm text-primary">
          {toppings.length > 0 ? toppings.map((line) => line.name).join(', ') : 'None selected'}
        </p>
      </div>

      <div className="border-t border-primary/10 py-3">
        <p className="font-bebas text-[11px] uppercase tracking-[0.18em] text-primary/45">
          Extras
        </p>
        {extras.length === 0 ? (
          <p className="mt-1 font-inter text-sm text-primary/50">None selected</p>
        ) : (
          <ul className="mt-1.5 flex flex-wrap gap-2">
            {extras.map((line) => (
              <li
                key={line.id}
                className="rounded-full border border-accent px-2.5 py-1 font-inter text-xs font-medium text-accent"
              >
                {line.name} · not on menu
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-primary/15 pt-4">
        <p className="flex items-end justify-between gap-4">
          <span className="font-bebas text-xs uppercase tracking-[0.2em] text-primary/50">
            Est. total
          </span>
          <motion.span
            key={quote.purchasable ? quote.totalInr : 'blocked'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="font-bebas text-5xl leading-none tabular-nums text-primary"
          >
            {quote.purchasable ? formatPrice(quote.totalInr) : '—'}
          </motion.span>
        </p>
        <p className="mt-2 font-inter text-[11px] leading-relaxed text-primary/45">
          {PRICE_NOTE}
        </p>
      </div>

      {!quote.purchasable && (
        <p className="mt-3 font-inter text-sm font-medium leading-relaxed text-accent">
          {blockMessage(quote)}
        </p>
      )}

      <button
        type="button"
        disabled={!quote.purchasable}
        onClick={onAddToCart}
        className="mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 font-bebas text-lg uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-primary/10 disabled:text-primary/40"
      >
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
        Add to cart
      </button>
    </section>
  );
}
