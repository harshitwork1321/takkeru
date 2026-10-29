import { quoteRamen } from './ramenPrice.js';
import { RAMEN_CATALOG } from '../data/ramenCatalog.js';
import { selectionKey } from './ramenSelection.js';

/**
 * Adapter between the pricing engine and the existing product cart.
 *
 * A cart line is still keyed by productId (so every existing catalog
 * behavior is untouched). A custom bowl rides along as an optional
 * `bowl` payload: { key, selection, unitPrice } where unitPrice is always
 * re-derived from the pricing engine — never trusted from storage.
 */

/**
 * Build a bowl payload for `addItem`, or null when the selection is not
 * purchasable (missing/unpublished/invalid choices).
 * @param {import('./ramenPrice.js').RamenSelection} selection
 * @returns {{ key: string, selection: object, unitPrice: number } | null}
 */
export function makeBowl(selection) {
  let quote;
  try {
    quote = quoteRamen(RAMEN_CATALOG, selection);
  } catch {
    return null;
  }
  if (!quote.purchasable) return null;
  return {
    key: selectionKey(selection),
    selection,
    unitPrice: quote.totalInr,
  };
}

/**
 * Validate a bowl payload (fresh from the builder or reloaded from
 * storage). Returns a cleaned payload whose unitPrice matches the pricing
 * engine, or null when the line must not live in the cart.
 * @param {unknown} bowl
 * @returns {{ key: string, selection: object, unitPrice: number } | null}
 */
export function normalizeBowl(bowl) {
  if (!bowl || typeof bowl !== 'object') return null;
  const selection = /** @type {{ selection?: unknown }} */ (bowl).selection;
  if (!selection || typeof selection !== 'object') return null;
  const { baseId, brothId, spiceLevelId, toppingIds, extraIds } = /** @type {object} */ (selection);
  if (baseId != null && typeof baseId !== 'string') return null;
  if (brothId != null && typeof brothId !== 'string') return null;
  if (spiceLevelId != null && typeof spiceLevelId !== 'string') return null;
  if (!Array.isArray(toppingIds) || !Array.isArray(extraIds)) return null;
  return makeBowl(/** @type {object} */ (selection));
}

/**
 * Identity of a cart line: plain products keep their productId, custom
 * bowls get productId#selectionKey so different bowls stay separate lines
 * and identical bowls merge. A custom boba drink rides the same scheme.
 * @param {{ productId: string, bowl?: { key?: string } | null, boba?: { key?: string } | null }} item
 * @returns {string}
 */
export function lineKey(item) {
  const payload = item.bowl ?? item.boba;
  return payload && payload.key ? `${item.productId}#${payload.key}` : item.productId;
}
