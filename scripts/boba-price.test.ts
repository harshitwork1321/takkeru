import { test } from 'node:test';
import assert from 'node:assert/strict';
import { quoteBoba, calculateBobaPrice } from '../src/lib/bobaPrice.ts';
import { BOBA_CATALOG } from '../src/data/bobaCatalog.ts';
import {
  DEFAULT_BOBA_SELECTION,
  resetBobaSelection,
  bobaSelectionKey,
  toggleId,
  describeBobaSelection,
} from '../src/lib/bobaSelection.ts';
import { makeBobaDrink, normalizeBoba } from '../src/lib/bobaCart.ts';

test('catalog is grounded in verified menu data', () => {
  assert.equal(BOBA_CATALOG.productId, 'boba-tea');
  assert.equal(BOBA_CATALOG.basePriceInr, 99);
  assert.equal(BOBA_CATALOG.flavors.length, 4);
  assert.deepEqual(
    BOBA_CATALOG.flavors.map((f) => f.id),
    ['classic-milk-tea', 'taro-boba-tea', 'strawberry-boba-tea', 'chocolate-boba-tea'],
  );
  assert.equal(BOBA_CATALOG.sizes.length, 2);
  assert.equal(BOBA_CATALOG.sizes.find((s) => s.id === 'large')?.surchargeInr, 50);
  assert.equal(BOBA_CATALOG.sizes.find((s) => s.id === 'regular')?.surchargeInr, 0);
  assert.equal(BOBA_CATALOG.sweetnessLevels.length, 3);
  assert.equal(BOBA_CATALOG.iceLevels.length, 3);
});

test('default selection prices at the published ₹99', () => {
  const quote = quoteBoba(BOBA_CATALOG, DEFAULT_BOBA_SELECTION);
  assert.equal(quote.totalInr, 99);
  assert.equal(quote.purchasable, true);
  assert.equal(quote.unpricedNames.length, 0);
});

test('large cup adds the verified ₹50', () => {
  const selection = { ...resetBobaSelection(), sizeId: 'large' };
  assert.equal(calculateBobaPrice(BOBA_CATALOG, selection), 149);
  const quote = quoteBoba(BOBA_CATALOG, selection);
  assert.equal(quote.purchasable, true);
  const sizeLine = quote.lines.find((line) => line.group === 'size');
  assert.equal(sizeLine?.amountInr, 50);
});

test('all flavours are included at base price', () => {
  for (const flavor of BOBA_CATALOG.flavors) {
    const selection = { ...resetBobaSelection(), flavorId: flavor.id };
    assert.equal(calculateBobaPrice(BOBA_CATALOG, selection), 99, flavor.id);
  }
});

test('sugar and ice levels are free prep options', () => {
  for (const level of BOBA_CATALOG.sweetnessLevels) {
    const selection = { ...resetBobaSelection(), sweetnessId: level.id };
    assert.equal(calculateBobaPrice(BOBA_CATALOG, selection), 99, level.id);
  }
  for (const level of BOBA_CATALOG.iceLevels) {
    const selection = { ...resetBobaSelection(), iceId: level.id };
    assert.equal(calculateBobaPrice(BOBA_CATALOG, selection), 99, level.id);
  }
});

test('removing included toppings does not change the price', () => {
  const selection = { ...resetBobaSelection(), toppingIds: [] };
  assert.equal(calculateBobaPrice(BOBA_CATALOG, selection), 99);
  const quote = quoteBoba(BOBA_CATALOG, selection);
  assert.equal(quote.purchasable, true);
});

test('unpublished extras are never charged and block the drink', () => {
  const selection = { ...resetBobaSelection(), extraIds: ['popping-pearls'] };
  const quote = quoteBoba(BOBA_CATALOG, selection);
  assert.equal(quote.purchasable, false);
  assert.ok(quote.unpricedNames.includes('Popping Pearls'));
  const extraLine = quote.lines.find((line) => line.group === 'extra');
  assert.equal(extraLine?.amountInr, null);
});

test('missing required single-select blocks the drink', () => {
  const quote = quoteBoba(BOBA_CATALOG, {
    ...resetBobaSelection(),
    flavorId: null,
  });
  assert.equal(quote.purchasable, false);
  assert.ok(quote.issues.some((issue) => issue.type === 'missing-required' && issue.group === 'flavor'));
});

test('unknown ids in multi-selects are ignored', () => {
  const selection = { ...resetBobaSelection(), toppingIds: ['tapioca-pearls', 'no-such-topping'] };
  const quote = quoteBoba(BOBA_CATALOG, selection);
  assert.equal(quote.purchasable, true);
  assert.equal(quote.totalInr, 99);
  assert.ok(quote.issues.some((issue) => issue.type === 'unknown-id'));
});

test('negative surcharge blocks instead of discounting', () => {
  const catalog = {
    ...BOBA_CATALOG,
    sizes: [{ id: 'regular', name: 'Regular', description: '', surchargeInr: -10, priceStatus: 'verified' }],
  };
  const quote = quoteBoba(catalog, { ...resetBobaSelection(), sizeId: 'regular' });
  assert.equal(quote.purchasable, false);
});

test('selectionKey is order-insensitive for topping and extra lists', () => {
  const a = { ...resetBobaSelection(), toppingIds: ['brown-sugar-syrup', 'tapioca-pearls'] };
  const b = { ...resetBobaSelection(), toppingIds: ['tapioca-pearls', 'brown-sugar-syrup'] };
  assert.equal(bobaSelectionKey(a), bobaSelectionKey(b));
});

test('selectionKey changes when the flavour changes', () => {
  const a = resetBobaSelection();
  const b = { ...resetBobaSelection(), flavorId: 'taro-boba-tea' };
  assert.notEqual(bobaSelectionKey(a), bobaSelectionKey(b));
});

test('toggleId adds and removes ids', () => {
  assert.deepEqual(toggleId(['a'], 'b'), ['a', 'b']);
  assert.deepEqual(toggleId(['a', 'b'], 'a'), ['b']);
});

test('describeBobaSelection resolves display names', () => {
  const described = describeBobaSelection(resetBobaSelection());
  assert.equal(described.flavor, 'Classic Milk Tea');
  assert.equal(described.sweetness, 'Regular');
  assert.equal(described.ice, 'Regular Ice');
  assert.equal(described.size, 'Regular');
  assert.deepEqual(described.toppings, ['Tapioca pearls', 'Brown sugar syrup']);
  assert.deepEqual(described.extras, []);
});

test('makeBobaDrink returns a payload for the default selection', () => {
  const drink = makeBobaDrink(resetBobaSelection());
  assert.ok(drink);
  assert.equal(drink.unitPrice, 99);
  assert.equal(typeof drink.key, 'string');
});

test('makeBobaDrink refuses an unpublished extra', () => {
  const drink = makeBobaDrink({ ...resetBobaSelection(), extraIds: ['popping-pearls'] });
  assert.equal(drink, null);
});

test('normalizeBoba re-validates a tampered payload', () => {
  const good = makeBobaDrink(resetBobaSelection());
  assert.ok(good);
  assert.equal(normalizeBoba(good)?.unitPrice, 99);
  assert.equal(normalizeBoba({ selection: { flavorId: 123, toppingIds: [], extraIds: [] } }), null);
  assert.equal(normalizeBoba({ selection: { flavorId: 'classic-milk-tea', toppingIds: 'no', extraIds: [] } }), null);
  assert.equal(normalizeBoba(null), null);
  assert.equal(normalizeBoba('boba'), null);
});

test('normalizeBoba rejects a tampered unit price by re-quoting', () => {
  const good = makeBobaDrink({ ...resetBobaSelection(), sizeId: 'large' });
  assert.ok(good);
  const tampered = { ...good, unitPrice: 1 };
  const healed = normalizeBoba(tampered);
  assert.ok(healed);
  assert.equal(healed.unitPrice, 149);
});
