/**
 * Ramen pricing engine — the only place a bowl total is ever computed.
 *
 * Rule: total = verified Signature Ramen price + sum of verified,
 * non-negative surcharges on the selected choices. Unpublished choices
 * (`priceStatus: 'unpublished'` or `surchargeInr: null`) are never
 * charged and block the bowl from being purchased. Unknown ids add
 * nothing. Negative or non-finite surcharges block instead of discounting.
 */

/**
 * Surcharge that is safe to add.
 * `null` = unpublished, not chargeable.
 * `NaN` = present but not a usable non-negative price.
 * @param {{ priceStatus: string, surchargeInr: number | null }} option
 * @returns {number | null}
 */
function verifiedSurcharge(option) {
  if (option.priceStatus === 'unpublished' || option.surchargeInr === null) return null;
  if (!Number.isFinite(option.surchargeInr) || option.surchargeInr < 0) return Number.NaN;
  return option.surchargeInr;
}

/**
 * @typedef {'base' | 'broth' | 'spice' | 'topping' | 'extra'} RamenGroup
 * @typedef {{ group: RamenGroup | 'bowl', id: string, name: string, amountInr: number | null, included: boolean }} QuoteLine
 * @typedef {{ type: string, group?: RamenGroup, id?: string, name?: string }} QuoteIssue
 * @typedef {{ totalInr: number, purchasable: boolean, lines: QuoteLine[], issues: QuoteIssue[], unpricedNames: string[] }} RamenQuote
 * @typedef {{ baseId: string | null, brothId: string | null, spiceLevelId: string | null, toppingIds: string[], extraIds: string[] }} RamenSelection
 */

/**
 * Price a selection against the catalog.
 * @param {object} catalog
 * @param {RamenSelection} selection
 * @returns {RamenQuote}
 */
export function quoteRamen(catalog, selection) {
  if (
    catalog == null ||
    typeof catalog.signaturePriceInr !== 'number' ||
    !Number.isFinite(catalog.signaturePriceInr) ||
    catalog.signaturePriceInr < 0
  ) {
    throw new Error('Verified signature ramen price is missing from the catalog');
  }

  /** @type {QuoteIssue[]} */
  const issues = [];
  /** @type {QuoteLine[]} */
  const lines = [];
  let surcharge = 0;
  let blocked = false;
  let verifiedBase = false;

  const consumeSingle = (group, list, id) => {
    if (!id) {
      issues.push({ type: 'missing-required', group });
      blocked = true;
      return;
    }
    const option = list.find((item) => item.id === id);
    if (!option) {
      issues.push({ type: 'unknown-id', group, id });
      blocked = true;
      return;
    }
    const amount = verifiedSurcharge(option);
    if (amount === null) {
      issues.push({ type: 'unpublished', group, id, name: option.name });
      lines.push({ group, id: option.id, name: option.name, amountInr: null, included: false });
      blocked = true;
      return;
    }
    if (Number.isNaN(amount)) {
      issues.push({ type: 'invalid-surcharge', group, id });
      blocked = true;
      return;
    }
    if (group === 'base') verifiedBase = true;
    surcharge += amount;
    lines.push({
      group,
      id: option.id,
      name: option.name,
      amountInr: amount,
      included: amount === 0,
    });
  };

  const consumeMulti = (group, list, ids) => {
    const seen = new Set();
    for (const id of ids) {
      if (seen.has(id)) {
        issues.push({ type: 'duplicate-ignored', group, id });
        continue;
      }
      seen.add(id);
      const option = list.find((item) => item.id === id);
      if (!option) {
        issues.push({ type: 'unknown-id', group, id });
        continue;
      }
      const amount = verifiedSurcharge(option);
      if (amount === null) {
        issues.push({ type: 'unpublished', group, id, name: option.name });
        lines.push({ group, id, name: option.name, amountInr: null, included: false });
        blocked = true;
        continue;
      }
      if (Number.isNaN(amount)) {
        issues.push({ type: 'invalid-surcharge', group, id });
        blocked = true;
        continue;
      }
      surcharge += amount;
      lines.push({
        group,
        id,
        name: option.name,
        amountInr: amount,
        included: amount === 0,
      });
    }
  };

  consumeSingle('base', catalog.bases ?? [], selection.baseId);
  consumeSingle('broth', catalog.broths ?? [], selection.brothId);
  consumeSingle('spice', catalog.spiceLevels ?? [], selection.spiceLevelId);
  consumeMulti('topping', catalog.toppings ?? [], selection.toppingIds ?? []);
  consumeMulti('extra', catalog.extras ?? [], selection.extraIds ?? []);

  const totalInr = verifiedBase ? catalog.signaturePriceInr + surcharge : surcharge;

  if (verifiedBase) {
    lines.unshift({
      group: 'bowl',
      id: catalog.signatureProductId,
      name: catalog.signatureName,
      amountInr: catalog.signaturePriceInr,
      included: false,
    });
  }

  const unpricedNames = issues.flatMap((issue) =>
    issue.type === 'unpublished' ? [issue.name] : [],
  );

  return {
    totalInr,
    purchasable: verifiedBase && !blocked,
    lines,
    issues,
    unpricedNames,
  };
}

/**
 * Pure total. Unknown ids add nothing. Unpublished choices add nothing.
 * @param {object} catalog
 * @param {RamenSelection} selection
 * @returns {number}
 */
export function calculateRamenPrice(catalog, selection) {
  return quoteRamen(catalog, selection).totalInr;
}
