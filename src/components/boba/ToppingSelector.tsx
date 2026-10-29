import { Check } from 'lucide-react';
import { BOBA_CATALOG } from '../../data/bobaCatalog';

interface ToppingSelectorProps {
  value: string[];
  onToggle: (id: string) => void;
}

const OPTIONS = [...BOBA_CATALOG.toppings, ...BOBA_CATALOG.extras];

export default function ToppingSelector({ value, onToggle }: ToppingSelectorProps) {
  return (
    <fieldset>
      <legend className="font-bebas text-sm uppercase tracking-[0.22em] text-primary/60">
        Toppings
      </legend>
      <p className="mt-1 font-inter text-xs text-primary/45">
        Included toppings stay free. Anything off the published menu can't be ordered —
        we never make up a price.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((option) => {
          const selected = value.includes(option.id);
          const offMenu = option.priceStatus === 'unpublished';
          return (
            <label key={option.id} className="cursor-pointer">
              <input
                type="checkbox"
                name="boba-toppings"
                value={option.id}
                checked={selected}
                onChange={() => onToggle(option.id)}
                className="sr-only peer"
              />
              <div
                className={`flex min-h-16 items-start gap-3 rounded-2xl border bg-white p-4 transition-colors duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                  selected
                    ? offMenu
                      ? 'border-accent bg-accent/[0.04]'
                      : 'border-accent'
                    : 'border-primary/12 hover:border-primary/40'
                }`}
              >
                <span
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-colors duration-200 ${
                    selected ? 'border-accent bg-accent text-white' : 'border-primary/25 text-transparent'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-bebas text-base uppercase leading-none tracking-[0.08em] text-primary">
                      {option.name}
                    </span>
                    {offMenu ? (
                      <span className="rounded-full border border-accent px-2 py-0.5 font-bebas text-[10px] tracking-[0.14em] text-accent">
                        Not on menu
                      </span>
                    ) : (
                      <span className="rounded-full bg-golden/30 px-2 py-0.5 font-bebas text-[10px] tracking-[0.14em] text-primary/70">
                        Included
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block font-inter text-xs leading-relaxed text-primary/55">
                    {option.description}
                  </span>
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
