import type {
  BobaCatalog,
  BobaGroup,
  BobaOption,
  BobaQuote,
  BobaQuoteIssue,
  BobaQuoteLine,
  BobaSelection,
} from '../types/boba.ts';

function verifiedSurcharge(option: BobaOption): number | null {
  if (option.priceStatus === 'unpublished' || option.surchargeInr === null) return null;
  if (!Number.isFinite(option.surchargeInr) || option.surchargeInr < 0) return Number.NaN;
  return option.surchargeInr;
}

export function quoteBoba(catalog: BobaCatalog, selection: BobaSelection): BobaQuote {
  if (
    !Number.isFinite(catalog.basePriceInr) ||
    catalog.basePriceInr < 0
  ) {
    throw new Error('Verified Boba Tea price is missing from the catalog');
  }

  const issues: BobaQuoteIssue[] = [];
  const lines: BobaQuoteLine[] = [];
  let surcharge = 0;
  let blocked = false;

  const consumeSingle = (group: BobaGroup, list: BobaOption[], id: string | null) => {
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
    surcharge += amount;
    lines.push({
      group,
      id: option.id,
      name: option.name,
      amountInr: amount,
      included: amount === 0,
    });
  };

  const consumeMulti = (group: BobaGroup, list: BobaOption[], ids: string[]) => {
    const seen = new Set<string>();
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

  consumeSingle('flavor', catalog.flavors, selection.flavorId);
  consumeSingle('sweetness', catalog.sweetnessLevels, selection.sweetnessId);
  consumeSingle('ice', catalog.iceLevels, selection.iceId);
  consumeSingle('size', catalog.sizes, selection.sizeId);
  consumeMulti('topping', catalog.toppings, selection.toppingIds ?? []);
  consumeMulti('extra', catalog.extras, selection.extraIds ?? []);

  const totalInr = catalog.basePriceInr + surcharge;

  lines.unshift({
    group: 'drink',
    id: catalog.productId,
    name: catalog.productName,
    amountInr: catalog.basePriceInr,
    included: false,
  });

  const unpricedNames = issues.flatMap((issue) =>
    issue.type === 'unpublished' ? [issue.name as string] : [],
  );

  return {
    totalInr,
    purchasable: !blocked,
    lines,
    issues,
    unpricedNames,
  };
}

export function calculateBobaPrice(catalog: BobaCatalog, selection: BobaSelection): number {
  return quoteBoba(catalog, selection).totalInr;
}
