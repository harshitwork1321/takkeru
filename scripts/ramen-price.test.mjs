import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { RAMEN_CATALOG, PRICE_NOTE } from '../src/data/ramenCatalog.js';
import { calculateRamenPrice, quoteRamen } from '../src/lib/ramenPrice.js';
import {
  resetSelection,
  toggleId,
  selectExtra,
  selectionKey,
  describeSelection,
} from '../src/lib/ramenSelection.js';
import { makeBowl, normalizeBowl, lineKey } from '../src/lib/ramenCart.js';
import {
  calculateSubtotal,
  calculateDeliveryFee,
  calculateTotal,
  getUnitPrice,
} from '../src/lib/cart.js';

const pricedTopping = {
  id: 'extra-chashu',
  name: 'Extra chashu',
  description: 'Fixture only',
  surchargeInr: 40,
  priceStatus: 'verified',
};

function fixture(overrides = {}) {
  return {
    ...RAMEN_CATALOG,
    bases: RAMEN_CATALOG.bases.map((item) => ({ ...item })),
    broths: RAMEN_CATALOG.broths.map((item) => ({ ...item })),
    spiceLevels: RAMEN_CATALOG.spiceLevels.map((item) => ({ ...item })),
    toppings: [...RAMEN_CATALOG.toppings.map((item) => ({ ...item })), pricedTopping],
    extras: [
      ...RAMEN_CATALOG.extras.map((item) => ({ ...item })),
      {
        id: 'bad-extra',
        name: 'Bad extra',
        description: 'Negative price must not discount the bowl',
        surchargeInr: -25,
        priceStatus: 'verified',
      },
    ],
    ...overrides,
  };
}

function selection(overrides = {}) {
  return { ...resetSelection(), ...overrides };
}

describe('ramen pricing engine', () => {
  it('prices the default signature bowl at the published 199', () => {
    assert.equal(calculateRamenPrice(RAMEN_CATALOG, resetSelection()), 199);
    assert.equal(RAMEN_CATALOG.signaturePriceInr, 199);
  });

  it('keeps the price when spice changes', () => {
    const next = selection({ spiceLevelId: 'extra-spicy' });
    assert.equal(calculateRamenPrice(RAMEN_CATALOG, next), 199);
    assert.equal(quoteRamen(RAMEN_CATALOG, next).purchasable, true);
  });

  it('adds and removes toppings without inventing a charge', () => {
    const removed = selection({
      toppingIds: toggleId(resetSelection().toppingIds, 'soft-boiled-egg'),
    });
    assert.equal(removed.toppingIds.includes('soft-boiled-egg'), false);
    assert.equal(calculateRamenPrice(RAMEN_CATALOG, removed), 199);

    const restored = selection({ toppingIds: toggleId(removed.toppingIds, 'soft-boiled-egg') });
    assert.equal(restored.toppingIds.includes('soft-boiled-egg'), true);
    assert.equal(calculateRamenPrice(RAMEN_CATALOG, restored), 199);
  });

  it('changes firmness as an included exclusive extra', () => {
    const next = selection({
      extraIds: selectExtra(RAMEN_CATALOG, resetSelection().extraIds, 'firmness-firm'),
    });
    assert.deepEqual(next.extraIds, ['firmness-firm']);
    assert.equal(calculateRamenPrice(RAMEN_CATALOG, next), 199);

    const deselected = selectExtra(RAMEN_CATALOG, next.extraIds, 'firmness-firm');
    assert.deepEqual(deselected, []);
    assert.equal(calculateRamenPrice(RAMEN_CATALOG, selection({ extraIds: deselected })), 199);
  });

  it('counts a verified surcharge once and ignores duplicate topping ids', () => {
    const catalog = fixture();
    const next = selection({ toppingIds: ['extra-chashu', 'extra-chashu', 'chashu-pork'] });
    const quote = quoteRamen(catalog, next);
    assert.equal(quote.totalInr, 239);
    assert.equal(quote.issues.some((issue) => issue.type === 'duplicate-ignored'), true);
    assert.equal(quote.lines.filter((line) => line.id === 'extra-chashu').length, 1);
  });

  it('does not charge unpublished or unknown ids', () => {
    const veg = selection({ baseId: 'veg-noodles' });
    const vegQuote = quoteRamen(RAMEN_CATALOG, veg);
    assert.equal(vegQuote.totalInr, 0);
    assert.equal(vegQuote.purchasable, false);
    assert.deepEqual(vegQuote.unpricedNames, ['Veg Noodles']);

    const hacked = selection({ toppingIds: ['chashu-pork', 'pay-me-1000'] });
    assert.equal(calculateRamenPrice(RAMEN_CATALOG, hacked), 199);
    assert.equal(quoteRamen(RAMEN_CATALOG, hacked).purchasable, true);
  });

  it('blocks checkout when broth or spice is cleared', () => {
    const quote = quoteRamen(RAMEN_CATALOG, selection({ brothId: null, spiceLevelId: null }));
    assert.equal(quote.purchasable, false);
    assert.equal(quote.issues.filter((issue) => issue.type === 'missing-required').length, 2);
  });

  it('ignores a negative surcharge instead of discounting the bowl', () => {
    const catalog = fixture();
    const next = selection({ extraIds: ['bad-extra'] });
    const quote = quoteRamen(catalog, next);
    assert.equal(quote.totalInr, 199);
    assert.equal(quote.purchasable, false);
    assert.equal(quote.issues.some((issue) => issue.type === 'invalid-surcharge'), true);
  });

  it('throws when the verified signature price is missing', () => {
    assert.throws(
      () => calculateRamenPrice(fixture({ signaturePriceInr: Number.NaN }), resetSelection()),
      /missing/i,
    );
    assert.throws(
      () => calculateRamenPrice(fixture({ signaturePriceInr: undefined }), resetSelection()),
      /missing/i,
    );
  });

  it('resets back to the signature bowl', () => {
    const edited = selection({
      baseId: 'veg-noodles',
      spiceLevelId: 'mild',
      toppingIds: [],
      extraIds: [],
    });
    assert.notEqual(calculateRamenPrice(RAMEN_CATALOG, edited), 199);
    assert.equal(calculateRamenPrice(RAMEN_CATALOG, resetSelection()), 199);
  });

  it('publishes a price note anchored to the verified price', () => {
    assert.match(PRICE_NOTE, /₹199/);
  });
});

describe('bowl cart adapter', () => {
  it('builds a purchasable bowl payload with the engine price', () => {
    const bowl = makeBowl(resetSelection());
    assert.ok(bowl);
    assert.equal(bowl.unitPrice, 199);
    assert.equal(bowl.key, selectionKey(resetSelection()));
  });

  it('refuses an unpublished bowl', () => {
    assert.equal(makeBowl(selection({ baseId: 'veg-noodles' })), null);
  });

  it('re-derives and heals unitPrice from the engine on normalize', () => {
    const healed = normalizeBowl({ selection: resetSelection(), unitPrice: 99999 });
    assert.ok(healed);
    assert.equal(healed.unitPrice, 199);

    assert.equal(normalizeBowl({ selection: resetSelection(), unitPrice: Number.NaN }).unitPrice, 199);
  });

  it('drops tampered or unpublished bowls', () => {
    assert.equal(normalizeBowl(null), null);
    assert.equal(normalizeBowl('nonsense'), null);
    assert.equal(normalizeBowl({}), null);
    assert.equal(normalizeBowl({ selection: { toppingIds: 'x', extraIds: [] } }), null);
    assert.equal(normalizeBowl({ selection: selection({ baseId: 'veg-noodles' }) }), null);
  });

  it('keys plain products by productId and bowls by selection', () => {
    const plain = { productId: 'ramen-signature' };
    assert.equal(lineKey(plain), 'ramen-signature');

    const bowl = makeBowl(resetSelection());
    const line = { productId: 'ramen-signature', bowl };
    assert.equal(lineKey(line), `ramen-signature#${bowl.key}`);

    const otherBowl = makeBowl(selection({ spiceLevelId: 'mild' }));
    assert.notEqual(lineKey({ productId: 'ramen-signature', bowl: otherBowl }), lineKey(line));
    assert.equal(
      lineKey({ productId: 'ramen-signature', bowl: makeBowl(resetSelection()) }),
      lineKey(line),
    );
  });

  it('describes selections for cart lines', () => {
    const described = describeSelection(resetSelection());
    assert.equal(described.base, 'Ramen Noodles');
    assert.equal(described.broth, 'Tonkotsu');
    assert.equal(described.spice, 'Medium');
    assert.equal(described.toppings.length, 5);
    assert.deepEqual(described.extras, ['Regular']);
  });

  it('selectionKey ignores topping order', () => {
    const a = selection({ toppingIds: ['nori', 'egg'] });
    const b = selection({ toppingIds: ['egg', 'nori'] });
    assert.equal(selectionKey(a), selectionKey(b));
  });
});

describe('cart totals with custom bowls', () => {
  it('prices a bowl line from its unitPrice alongside catalog products', () => {
    const items = [
      { productId: 'boba-tea', quantity: 2 },
      { productId: 'ramen-signature', quantity: 2, bowl: makeBowl(resetSelection()) },
    ];
    const subtotal = 99 * 2 + 199 * 2;
    assert.equal(calculateSubtotal(items), subtotal);
    assert.equal(calculateDeliveryFee(subtotal), 0);
    assert.equal(calculateTotal(items), subtotal);

    const smallOrder = [
      { productId: 'boba-tea', quantity: 1 },
      { productId: 'ramen-signature', quantity: 1, bowl: makeBowl(resetSelection()) },
    ];
    assert.equal(calculateSubtotal(smallOrder), 99 + 199);
    assert.equal(calculateTotal(smallOrder), 99 + 199 + 40);
  });

  it('falls back to the product price when a bowl payload is invalid', () => {
    assert.equal(getUnitPrice({ productId: 'ramen-signature' }), 199);
    assert.equal(
      getUnitPrice({ productId: 'ramen-signature', bowl: { unitPrice: Number.NaN } }),
      199,
    );
    assert.equal(getUnitPrice({ productId: 'boba-tea', bowl: { unitPrice: 150 } }), 150);
  });

  it('waives delivery at the published 500 threshold', () => {
    assert.equal(calculateDeliveryFee(499), 40);
    assert.equal(calculateDeliveryFee(500), 0);
    assert.equal(calculateDeliveryFee(0), 0);
  });
});
