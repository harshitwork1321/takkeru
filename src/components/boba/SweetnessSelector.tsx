import SegmentedControl from './SegmentedControl';
import { BOBA_CATALOG } from '../../data/bobaCatalog';

interface SweetnessSelectorProps {
  value: string | null;
  onChange: (id: string) => void;
}

export default function SweetnessSelector({ value, onChange }: SweetnessSelectorProps) {
  return (
    <SegmentedControl
      legend="Sugar level"
      hint="From barely sweet to dessert sweet — every level is included."
      name="boba-sweetness"
      options={BOBA_CATALOG.sweetnessLevels}
      value={value}
      onChange={onChange}
    />
  );
}
