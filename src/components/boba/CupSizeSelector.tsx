import SegmentedControl from './SegmentedControl';
import { BOBA_CATALOG } from '../../data/bobaCatalog';

interface CupSizeSelectorProps {
  value: string | null;
  onChange: (id: string) => void;
}

export default function CupSizeSelector({ value, onChange }: CupSizeSelectorProps) {
  return (
    <SegmentedControl
      legend="Cup size"
      hint="Regular is the classic cup; Large adds ₹50 to the published price."
      name="boba-size"
      options={BOBA_CATALOG.sizes}
      value={value}
      onChange={onChange}
    />
  );
}
