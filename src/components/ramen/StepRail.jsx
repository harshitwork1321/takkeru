import { STEPS } from '../../data/ramenSteps';

export default function StepRail({ current, onChange }) {
  return (
    <nav aria-label="Bowl steps" className="border-y border-white/10 bg-white/[0.02]">
      <ol className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-4 sm:px-6 scrollbar-thin">
        {STEPS.map((step, index) => {
          const active = step.id === current;
          return (
            <li key={step.id} className="min-w-40 flex-1">
              <button
                type="button"
                aria-current={active ? 'step' : undefined}
                onClick={() => onChange(step.id)}
                className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-bebas text-sm ${
                    active ? 'bg-golden text-primary' : 'border border-white/20 text-subtle/60'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block font-bebas text-sm uppercase tracking-[0.15em] ${
                      active ? 'text-white' : 'text-subtle/60'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="block truncate font-inter text-xs text-subtle/40">{step.hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
