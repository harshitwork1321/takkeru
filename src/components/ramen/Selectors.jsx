import { RAMEN_CATALOG } from '../../data/ramenCatalog';
import OptionCard from './OptionCard';
import RadioGroup from './RadioGroup';

export function BaseSelector({ value, onChange }) {
  return (
    <fieldset>
      <legend className="sr-only">Choose your base</legend>
      <div className="grid grid-cols-2 gap-3">
        {RAMEN_CATALOG.bases.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            name="ramen-base"
            mode="radio"
            selected={option.id === value}
            onToggle={() => onChange(option.id)}
          />
        ))}
      </div>
      <p className="mt-4 max-w-md font-inter text-sm text-subtle/50">
        Ramen Noodles is the base of the published Signature Ramen. Veg Noodles has no published
        price yet, so it can be previewed but not ordered.
      </p>
    </fieldset>
  );
}

export function BrothSelector({ value, onChange }) {
  return (
    <fieldset>
      <legend className="sr-only">Choose your broth</legend>
      <div className="grid grid-cols-2 gap-3">
        {RAMEN_CATALOG.broths.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            name="ramen-broth"
            mode="radio"
            selected={option.id === value}
            onToggle={() => onChange(option.id)}
          />
        ))}
      </div>
      <p className="mt-4 max-w-sm font-inter text-sm text-subtle/50">
        Tonkotsu is the broth on the published Signature Ramen. Other broths are not on the menu.
      </p>
    </fieldset>
  );
}

export function SpiceSelector({ value, onChange }) {
  return (
    <RadioGroup
      legend="Spice level"
      options={RAMEN_CATALOG.spiceLevels}
      value={value}
      onChange={onChange}
    />
  );
}

export function ToppingSelector({ value, onToggle }) {
  return (
    <fieldset>
      <legend className="sr-only">Add toppings</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {RAMEN_CATALOG.toppings.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            name="ramen-topping"
            mode="checkbox"
            selected={value.includes(option.id)}
            onToggle={() => onToggle(option.id)}
          />
        ))}
      </div>
      <p className="mt-4 max-w-md font-inter text-sm text-subtle/50">
        These come with Signature Ramen. Taking one off does not change the published price.
      </p>
    </fieldset>
  );
}

export function ExtrasSelector({ value, onChange }) {
  const selected =
    RAMEN_CATALOG.extras.find((option) => value.includes(option.id))?.id ?? null;
  return (
    <div>
      <RadioGroup
        legend="Noodle firmness"
        options={RAMEN_CATALOG.extras}
        value={selected}
        onChange={onChange}
      />
      <p className="mt-4 max-w-md font-inter text-sm text-subtle/50">
        Firmness is the published extra, and it is included. Paid upgrades such as extra noodles
        are not on the menu, so they are not offered here.
      </p>
    </div>
  );
}
