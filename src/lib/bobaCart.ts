import { quoteBoba } from './bobaPrice.ts';
import { bobaSelectionKey } from './bobaSelection.ts';
import { BOBA_CATALOG } from '../data/bobaCatalog.ts';
import type { BobaDrinkPayload, BobaSelection } from '../types/boba.ts';

export function makeBobaDrink(selection: BobaSelection): BobaDrinkPayload | null {
  let quote;
  try {
    quote = quoteBoba(BOBA_CATALOG, selection);
  } catch {
    return null;
  }
  if (!quote.purchasable) return null;
  return {
    key: bobaSelectionKey(selection),
    selection,
    unitPrice: quote.totalInr,
  };
}

export function normalizeBoba(boba: unknown): BobaDrinkPayload | null {
  if (!boba || typeof boba !== 'object') return null;
  const selection = (boba as { selection?: unknown }).selection;
  if (!selection || typeof selection !== 'object') return null;
  const { flavorId, sweetnessId, iceId, sizeId, toppingIds, extraIds } = selection as Record<string, unknown>;
  if (flavorId != null && typeof flavorId !== 'string') return null;
  if (sweetnessId != null && typeof sweetnessId !== 'string') return null;
  if (iceId != null && typeof iceId !== 'string') return null;
  if (sizeId != null && typeof sizeId !== 'string') return null;
  if (!Array.isArray(toppingIds) || !Array.isArray(extraIds)) return null;
  return makeBobaDrink(selection as unknown as BobaSelection);
}

export function bobaLineKey(item: { productId: string; boba?: { key?: string } | null }): string {
  return item.boba?.key ? `${item.productId}#${item.boba.key}` : item.productId;
}
