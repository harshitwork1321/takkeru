import { useRef } from 'react';
import { Flame } from 'lucide-react';

export default function RadioGroup({ legend, options, value, onChange }) {
  const buttons = useRef([]);

  const move = (index, direction) => {
    const next = (index + direction + options.length) % options.length;
    const option = options[next];
    if (!option) return;
    onChange(option.id);
    buttons.current[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-label={legend} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {options.map((option, index) => {
        const selected = option.id === value;
        const heat = option.heat ?? 0;
        return (
          <button
            key={option.id}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected || (value == null && index === 0) ? 0 : -1}
            onClick={() => onChange(option.id)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                move(index, 1);
              }
              if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                move(index, -1);
              }
            }}
            className={`flex min-h-32 flex-col items-start justify-between rounded-2xl border px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              selected
                ? 'border-golden bg-golden/[0.07]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/30'
            }`}
          >
            <span className="font-bebas text-2xl leading-none text-white">{option.name}</span>
            {heat > 0 && (
              <span className="mt-2 flex gap-0.5 text-accent" aria-hidden="true">
                {Array.from({ length: heat }, (_, mark) => (
                  <Flame key={mark} className="h-3.5 w-3.5 fill-accent" />
                ))}
              </span>
            )}
            <span className="mt-2 font-inter text-sm text-subtle/50">{option.description}</span>
            <span className="mt-2 font-bebas text-xs tracking-[0.15em] text-golden">INCLUDED</span>
          </button>
        );
      })}
    </div>
  );
}
