import { CupSoda, Droplets, Snowflake } from 'lucide-react';
import OptionCard from '../ramen/OptionCard';
import { BOBA_CATALOG } from '../../data/bobaCatalog';

interface OptionLike {
  id: string;
  name: string;
  description: string;
  surchargeInr: number | null;
  priceStatus: string;
  image?: string;
}

function ChoiceRow({
  legend,
  options,
  value,
  onChange,
  name,
  icon: Icon,
}: {
  legend: string;
  options: OptionLike[];
  value: string | null;
  onChange: (id: string) => void;
  name: string;
  icon: typeof CupSoda;
}) {
  return (
    <fieldset>
      <legend className="mb-4 flex items-center gap-2 font-inter text-sm text-subtle/50">
        <Icon className="h-4 w-4 text-golden" aria-hidden="true" />
        {legend}
      </legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            name={name}
            mode="radio"
            selected={option.id === value}
            onToggle={() => onChange(option.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function FlavorSelector({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  return (
    <ChoiceRow
      legend="Flavor — all included at the published price"
      options={BOBA_CATALOG.flavors}
      value={value}
      onChange={onChange}
      name="boba-flavor"
      icon={CupSoda}
    />
  );
}

export function SweetnessSelector({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  return (
    <ChoiceRow
      legend="Sugar level"
      options={BOBA_CATALOG.sweetnessLevels}
      value={value}
      onChange={onChange}
      name="boba-sweetness"
      icon={Droplets}
    />
  );
}

export function IceSelector({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  return (
    <ChoiceRow
      legend="Ice level"
      options={BOBA_CATALOG.iceLevels}
      value={value}
      onChange={onChange}
      name="boba-ice"
      icon={Snowflake}
    />
  );
}

export function CupSizeSelector({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  return (
    <ChoiceRow
      legend="Cup size"
      options={BOBA_CATALOG.sizes}
      value={value}
      onChange={onChange}
      name="boba-size"
      icon={CupSoda}
    />
  );
}

export function ToppingSelector({
  value,
  onToggle,
}: {
  value: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-4 flex items-center gap-2 font-inter text-sm text-subtle/50">
        <Droplets className="h-4 w-4 text-golden" aria-hidden="true" />
        Toppings — included toppings stay free; anything off-menu blocks checkout
      </legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[...BOBA_CATALOG.toppings, ...BOBA_CATALOG.extras].map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            name="boba-toppings"
            mode="checkbox"
            selected={value.includes(option.id)}
            onToggle={() => onToggle(option.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}
