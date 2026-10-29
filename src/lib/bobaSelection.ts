import { BOBA_CATALOG } from '../data/bobaCatalog.ts';
import type { BobaCatalog, BobaSelection } from '../types/boba.ts';

export const DEFAULT_BOBA_SELECTION: BobaSelection = {
  flavorId: 'classic-milk-tea',
  sweetnessId: 'regular',
  iceId: 'regular-ice',
  sizeId: 'regular',
  toppingIds: ['tapioca-pearls', 'brown-sugar-syrup'],
  extraIds: [],
};

export function resetBobaSelection(): BobaSelection {
  return {
    flavorId: DEFAULT_BOBA_SELECTION.flavorId,
    sweetnessId: DEFAULT_BOBA_SELECTION.sweetnessId,
    iceId: DEFAULT_BOBA_SELECTION.iceId,
    sizeId: DEFAULT_BOBA_SELECTION.sizeId,
    toppingIds: [...DEFAULT_BOBA_SELECTION.toppingIds],
    extraIds: [...DEFAULT_BOBA_SELECTION.extraIds],
  };
}

export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export function bobaSelectionKey(selection: BobaSelection): string {
  return JSON.stringify({
    flavorId: selection.flavorId,
    sweetnessId: selection.sweetnessId,
    iceId: selection.iceId,
    sizeId: selection.sizeId,
    toppingIds: [...(selection.toppingIds ?? [])].sort(),
    extraIds: [...(selection.extraIds ?? [])].sort(),
  });
}

export interface BobaDescription {
  flavor: string | null;
  sweetness: string | null;
  ice: string | null;
  size: string | null;
  toppings: string[];
  extras: string[];
}

export function describeBobaSelection(
  selection: BobaSelection,
  catalog: BobaCatalog = BOBA_CATALOG,
): BobaDescription {
  const nameOf = (list: { id: string; name: string }[], id: string | null) =>
    list.find((item) => item.id === id)?.name ?? null;
  return {
    flavor: nameOf(catalog.flavors, selection.flavorId),
    sweetness: nameOf(catalog.sweetnessLevels, selection.sweetnessId),
    ice: nameOf(catalog.iceLevels, selection.iceId),
    size: nameOf(catalog.sizes, selection.sizeId),
    toppings: (selection.toppingIds ?? [])
      .map((id) => nameOf(catalog.toppings, id))
      .filter((name): name is string => name != null),
    extras: (selection.extraIds ?? [])
      .map((id) => nameOf(catalog.extras, id))
      .filter((name): name is string => name != null),
  };
}
