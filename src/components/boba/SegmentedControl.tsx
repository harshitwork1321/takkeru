export interface SegmentedOption {
  id: string;
  name: string;
  description?: string;
  surchargeInr?: number | null;
}

interface SegmentedControlProps {
  legend: string;
  hint?: string;
  name: string;
  options: SegmentedOption[];
  value: string | null;
  onChange: (id: string) => void;
}

export default function SegmentedControl({
  legend,
  hint,
  name,
  options,
  value,
  onChange,
}: SegmentedControlProps) {
  const selected = options.find((option) => option.id === value) ?? null;

  return (
    <fieldset>
      <legend className="font-bebas text-sm uppercase tracking-[0.22em] text-primary/60">
        {legend}
      </legend>
      {hint && <p className="mt-1 font-inter text-xs text-primary/45">{hint}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.id} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={option.id === value}
              onChange={() => onChange(option.id)}
              className="sr-only peer"
            />
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/15 bg-white px-5 font-bebas text-base uppercase tracking-[0.12em] text-primary/70 transition-colors duration-200 hover:border-primary/45 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white">
              {option.name}
              {typeof option.surchargeInr === 'number' && option.surchargeInr > 0 && (
                <span className="font-inter text-xs font-semibold tracking-normal">
                  +₹{option.surchargeInr}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
      {selected?.description && (
        <p className="mt-2 font-inter text-sm text-primary/55">{selected.description}</p>
      )}
    </fieldset>
  );
}
