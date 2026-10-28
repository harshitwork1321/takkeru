import { Pencil, RotateCcw, ShoppingBag, X } from 'lucide-react';
import { PRICE_NOTE } from '../../data/ramenCatalog';
import { formatPrice } from '../../lib/cart';

const GROUP_LABEL = {
  bowl: 'Bowl',
  base: 'Base',
  broth: 'Broth',
  spice: 'Spice level',
  topping: 'Toppings',
  extra: 'Extras',
};

const GROUP_STEP = {
  base: 'base',
  broth: 'broth',
  spice: 'spice',
  topping: 'toppings',
  extra: 'extras',
};

function amountLabel(line) {
  if (line.amountInr == null) return 'NOT ON MENU';
  if (line.group === 'bowl') return formatPrice(line.amountInr);
  if (line.included || line.amountInr === 0) return 'INCLUDED';
  return `+ ${formatPrice(line.amountInr)}`;
}

function blockMessage(quote) {
  if (quote.unpricedNames.length > 0) {
    return `${quote.unpricedNames.join(', ')} ${quote.unpricedNames.length > 1 ? 'are' : 'is'} not on the published menu, so this bowl cannot be added.`;
  }
  return 'Choose a published base, broth and spice level before adding this bowl.';
}

export default function BowlSummary({
  quote,
  variant = 'card',
  onEdit,
  onRemoveTopping,
  onRemoveExtra,
  onReset,
  onAddToCart,
}) {
  const isCard = variant === 'card';
  const singles = quote.lines.filter((line) => ['base', 'broth', 'spice'].includes(line.group));
  const toppings = quote.lines.filter((line) => line.group === 'topping');
  const extras = quote.lines.filter((line) => line.group === 'extra');
  const bowl = quote.lines.find((line) => line.group === 'bowl');

  const surface = isCard
    ? 'bg-cream text-primary border-primary/10'
    : 'bg-white/[0.03] border-white/10';
  const label = isCard ? 'text-primary/50' : 'text-subtle/50';
  const value = isCard ? 'text-primary' : 'text-white';
  const rule = isCard ? 'border-primary/10' : 'border-white/10';

  return (
    <section
      aria-label="Your bowl"
      className={`rounded-2xl border p-5 ${surface} ${isCard ? '' : 'w-full'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className={`font-bebas text-sm uppercase tracking-[0.2em] ${isCard ? 'text-primary' : 'text-white'}`}>
          Your bowl
        </h2>
        <button
          type="button"
          onClick={() => onEdit('base')}
          className={`inline-flex min-h-11 items-center gap-1 font-inter text-sm ${label} hover:text-accent transition-colors`}
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Edit
        </button>
      </div>

      <ul className={`mt-2 divide-y ${rule}`}>
        {singles.map((line) => {
          const step = GROUP_STEP[line.group];
          return (
            <li key={`${line.group}-${line.id}`}>
              <button
                type="button"
                onClick={() => step && onEdit(step)}
                className={`flex min-h-14 w-full items-center justify-between gap-3 py-2 text-left ${value} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
              >
                <span>
                  <span className={`block font-bebas text-xs uppercase tracking-[0.15em] ${label}`}>
                    {GROUP_LABEL[line.group]}
                  </span>
                  <span className={`block font-inter text-sm font-medium ${value}`}>{line.name}</span>
                </span>
                <span className={`shrink-0 font-bebas text-xs tracking-[0.1em] ${label}`}>
                  {amountLabel(line)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={`border-t ${rule} py-3`}>
        <p className={`font-bebas text-xs uppercase tracking-[0.15em] ${label}`}>Toppings</p>
        {toppings.length === 0 ? (
          <p className={`mt-1 font-inter text-sm ${label}`}>None selected</p>
        ) : isCard ? (
          <p className={`mt-1 font-inter text-sm font-medium ${value}`}>
            {toppings.map((line) => line.name).join(', ')}
          </p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-2">
            {toppings.map((line) => (
              <li key={line.id}>
                <button
                  type="button"
                  onClick={() => onRemoveTopping(line.id)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 font-inter text-sm text-white hover:border-accent transition-colors"
                >
                  {line.name}
                  <span className="text-xs text-subtle/50">{amountLabel(line)}</span>
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">Remove {line.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`border-t ${rule} py-3`}>
        <p className={`font-bebas text-xs uppercase tracking-[0.15em] ${label}`}>Extras</p>
        {extras.length === 0 ? (
          <p className={`mt-1 font-inter text-sm ${label}`}>None selected</p>
        ) : isCard ? (
          <p className={`mt-1 font-inter text-sm font-medium ${value}`}>
            {extras.map((line) => line.name).join(', ')}
          </p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-2">
            {extras.map((line) => (
              <li key={line.id}>
                <button
                  type="button"
                  onClick={() => onRemoveExtra(line.id)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 font-inter text-sm text-white hover:border-accent transition-colors"
                >
                  {line.name}
                  <span className="text-xs text-subtle/50">{amountLabel(line)}</span>
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">Remove {line.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {variant === 'review' && bowl && (
        <ul className={`border-t ${rule} py-3 font-inter text-sm text-white`}>
          <li className="flex justify-between gap-3">
            <span>{bowl.name}</span>
            <span className="tabular-nums">{formatPrice(bowl.amountInr ?? 0)}</span>
          </li>
          {quote.lines
            .filter((line) => line.group !== 'bowl' && line.amountInr != null && line.amountInr > 0)
            .map((line) => (
              <li key={`${line.group}-${line.id}`} className="mt-1 flex justify-between gap-3">
                <span>{line.name}</span>
                <span className="tabular-nums">+ {formatPrice(line.amountInr)}</span>
              </li>
            ))}
        </ul>
      )}

      <div className={`border-t ${rule} pt-4`}>
        <p className="flex items-end justify-between gap-4">
          <span className={`font-bebas text-xs uppercase tracking-[0.15em] ${label}`}>
            Est. price
          </span>
          <span className={`font-bebas text-4xl leading-none tabular-nums ${value}`}>
            {quote.purchasable ? formatPrice(quote.totalInr) : '—'}
          </span>
        </p>
        <p className={`mt-2 font-inter text-xs leading-relaxed ${label}`}>
          {variant === 'review' ? PRICE_NOTE : 'Published Signature Ramen price.'}
        </p>
      </div>

      {!quote.purchasable && (
        <p className="mt-3 font-inter text-sm text-accent">{blockMessage(quote)}</p>
      )}

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          disabled={!quote.purchasable}
          onClick={onAddToCart}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 font-bebas text-base uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed ${
            isCard ? 'disabled:bg-primary/10 disabled:text-primary/40' : 'disabled:bg-white/10 disabled:text-subtle/50'
          }`}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Add to cart
        </button>
        <button
          type="button"
          onClick={onReset}
          className={`inline-flex min-h-11 items-center justify-center gap-2 font-inter text-sm ${label} hover:text-accent transition-colors`}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset bowl
        </button>
      </div>
    </section>
  );
}
