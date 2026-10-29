import SegmentedControl from './SegmentedControl';
import { BOBA_CATALOG } from '../../data/bobaCatalog';

interface IceSelectorProps {
  value: string | null;
  onChange: (id: string) => void;
}

export default function IceSelector({ value, onChange }: IceSelectorProps) {
  return (
    <SegmentedControl
      legend="Ice level"
      hint="Set the chill — no charge for any level."
      name="boba-ice"
      options={BOBA_CATALOG.iceLevels}
      value={value}
      onChange={onChange}
    />
  );
}
