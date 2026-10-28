import { Check } from 'lucide-react';
import { formatPrice } from '../../lib/cart';

function badgeFor(option) {
  if (option.priceStatus === 'unpublished' || option.surchargeInr === null) {
    return { label: 'NOT ON MENU', tone: 'bg-white/10 text-subtle/60' };
  }
  if (option.surchargeInr === 0) return { label: 'INCLUDED', tone: 'bg-golden text-primary' };
  return { label: `+ ${formatPrice(option.surchargeInr)}`, tone: 'bg-golden text-primary' };
}

export default function OptionCard({ option, name, mode, selected, onToggle }) {
  const badge = badgeFor(option);
  const inputId = `${name}-${option.id}`;

  return (
    <div className={`relative ${selected ? 'z-10' : ''}`}>
      <input
        id={inputId}
        type={mode}
        name={name}
        checked={selected}
        onChange={onToggle}
        className="sr-only"
      />
      <label
        htmlFor={inputId}
        className={`flex min-h-44 cursor-pointer flex-col items-center rounded-2xl border px-3 py-4 text-center transition-colors duration-200 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-accent ${
          selected
            ? 'border-golden bg-golden/[0.07]'
            : 'border-white/10 bg-white/[0.03] hover:border-white/30'
        }`}
      >
        {selected && (
          <span className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-golden text-primary">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
        <span className="grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-white/[0.05]">
          {option.image ? (
            <img src={option.image} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <span className="font-bebas text-3xl text-subtle/50">{option.name.slice(0, 1)}</span>
          )}
        </span>
        <span className="mt-3 font-bebas text-xl leading-none text-white">{option.name}</span>
        <span className="mt-1 font-inter text-sm text-subtle/50">{option.description}</span>
        <span
          className={`mt-3 inline-flex min-h-7 items-center rounded-full px-3 font-bebas text-xs tracking-[0.15em] ${badge.tone}`}
        >
          {badge.label}
        </span>
      </label>
    </div>
  );
}
