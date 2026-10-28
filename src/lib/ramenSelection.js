import { RAMEN_CATALOG } from '../data/ramenCatalog.js';

/**
 * Selection state for the ramen builder and its helper operations.
 * The default is the published Signature Ramen bowl, exactly as served.
 *
 * @typedef {import('./ramenPrice.js').RamenSelection} RamenSelection
 */

/** @type {RamenSelection} */
export const DEFAULT_SELECTION = {
  baseId: 'ramen-noodles',
  brothId: 'tonkotsu',
  spiceLevelId: 'medium',
  toppingIds: ['chashu-pork', 'soft-boiled-egg', 'nori', 'spring-onions', 'sesame-seeds'],
  extraIds: ['firmness-regular'],
};

/** @returns {RamenSelection} */
export function resetSelection() {
  return {
    baseId: DEFAULT_SELECTION.baseId,
    brothId: DEFAULT_SELECTION.brothId,
    spiceLevelId: DEFAULT_SELECTION.spiceLevelId,
    toppingIds: [...DEFAULT_SELECTION.toppingIds],
    extraIds: [...DEFAULT_SELECTION.extraIds],
  };
}

/**
 * @param {string[]} ids
 * @param {string} id
 * @returns {string[]}
 */
export function toggleId(ids, id) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

/**
 * Firmness choices replace each other. Other extras toggle independently.
 * @param {object} catalog
 * @param {string[]} ids
 * @param {string} id
 * @returns {string[]}
 */
export function selectExtra(catalog, ids, id) {
  const option = catalog.extras.find((item) => item.id === id);
  if (!option) return ids;
  if (option.exclusiveGroup) {
    const groupIds = new Set(
      catalog.extras
        .filter((item) => item.exclusiveGroup === option.exclusiveGroup)
        .map((item) => item.id),
    );
    const without = ids.filter((item) => !groupIds.has(item));
    if (ids.includes(id)) return without;
    return [...without, id];
  }
  return toggleId(ids, id);
}

/**
 * Order-insensitive identity of a selection — used to merge identical
 * bowls in the cart and to detect tampered persisted bowls.
 * @param {RamenSelection} selection
 * @returns {string}
 */
export function selectionKey(selection) {
  return JSON.stringify({
    baseId: selection.baseId,
    brothId: selection.brothId,
    spiceLevelId: selection.spiceLevelId,
    toppingIds: [...(selection.toppingIds ?? [])].sort(),
    extraIds: [...(selection.extraIds ?? [])].sort(),
  });
}

/**
 * Resolve a selection to display names for cart lines and summaries.
 * @param {RamenSelection} selection
 * @returns {{ base: string | null, broth: string | null, spice: string | null, toppings: string[], extras: string[] }}
 */
export function describeSelection(selection) {
  const nameOf = (list, id) => list.find((item) => item.id === id)?.name ?? null;
  return {
    base: nameOf(RAMEN_CATALOG.bases, selection.baseId),
    broth: nameOf(RAMEN_CATALOG.broths, selection.brothId),
    spice: nameOf(RAMEN_CATALOG.spiceLevels, selection.spiceLevelId),
    toppings: (selection.toppingIds ?? [])
      .map((id) => nameOf(RAMEN_CATALOG.toppings, id))
      .filter(Boolean),
    extras: (selection.extraIds ?? [])
      .map((id) => nameOf(RAMEN_CATALOG.extras, id))
      .filter(Boolean),
  };
}
