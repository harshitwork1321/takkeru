import { getProductById } from '../data/products.js';
import { FLAVORS } from '../data/flavors.js';
import type { BobaCatalog, BobaOption } from '../types/boba.ts';

const product = getProductById('boba-tea');

const sizeOptions: BobaOption[] = (product?.sizes ?? []).map((size: { label: string; priceModifier: number }) => ({
  id: size.label.toLowerCase(),
  name: size.label,
  description: size.priceModifier === 0 ? 'The classic cup' : 'Bigger sip, same pearls',
  surchargeInr: size.priceModifier,
  priceStatus: 'verified' as const,
}));

const sweetnessOptions: BobaOption[] = (product?.customizations
  .find((c: { label: string }) => c.label === 'Sugar Level')?.options ?? []).map(
  (name: string) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    description:
      name === 'Less Sugar' ? 'Lightly sweet' : name === 'Extra Sweet' ? 'Dessert sweet' : 'Balanced sweetness',
    surchargeInr: 0,
    priceStatus: 'verified' as const,
  }),
);

const iceOptions: BobaOption[] = (product?.customizations
  .find((c: { label: string }) => c.label === 'Ice Level')?.options ?? []).map(
  (name: string) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    description:
      name === 'No Ice' ? 'Chilled, not watered down' : name === 'Less Ice' ? 'A few cubes' : 'Classic iced',
    surchargeInr: 0,
    priceStatus: 'verified' as const,
  }),
);

const flavorTints: Record<string, string> = {
  'classic-milk-tea': '#D8A46A',
  'taro-boba-tea': '#B39DDB',
  'strawberry-boba-tea': '#F48FB1',
  'chocolate-boba-tea': '#8D6E63',
};

const classicFlavor: BobaOption = {
  id: 'classic-milk-tea',
  name: 'Classic Milk Tea',
  description: 'The original creamy TAKKERU milk tea',
  surchargeInr: 0,
  priceStatus: 'verified',
  image: product?.image,
  japanese: product?.japanese,
  tint: flavorTints['classic-milk-tea'],
};

const flavorOptions: BobaOption[] = [
  classicFlavor,
  ...FLAVORS.map((flavor) => ({
    id: flavor.id,
    name: flavor.name,
    description: flavor.description,
    surchargeInr: 0,
    priceStatus: 'verified' as const,
    image: flavor.poster,
    japanese: flavor.japanese,
    tint: flavorTints[flavor.id] ?? '#D8A46A',
  })),
];

const includedIngredients = new Set(['Tapioca pearls', 'Brown sugar syrup']);

const toppingOptions: BobaOption[] = (product?.ingredients ?? [])
  .filter((ingredient: string) => includedIngredients.has(ingredient))
  .map((ingredient: string) => ({
    id: ingredient.toLowerCase().replace(/\s+/g, '-'),
    name: ingredient,
    description:
      ingredient === 'Tapioca pearls' ? 'Hand-cooked, chewy pearls' : 'Deep caramel sweetness',
    surchargeInr: 0,
    priceStatus: 'verified' as const,
  }));

const extraOptions: BobaOption[] = [
  {
    id: 'popping-pearls',
    name: 'Popping Pearls',
    description: 'Juice-filled pearls that burst',
    surchargeInr: null,
    priceStatus: 'unpublished',
  },
  {
    id: 'grass-jelly',
    name: 'Grass Jelly',
    description: 'Cool, herbal jelly strips',
    surchargeInr: null,
    priceStatus: 'unpublished',
  },
  {
    id: 'cheese-foam',
    name: 'Cheese Foam',
    description: 'Salted cream cap',
    surchargeInr: null,
    priceStatus: 'unpublished',
  },
];

export const BOBA_CATALOG: BobaCatalog = {
  productId: product?.id ?? 'boba-tea',
  productName: product?.name ?? 'Boba Tea',
  basePriceInr: product?.price ?? 99,
  image: product?.image ?? '/images/boba.jpg',
  flavors: flavorOptions,
  sweetnessLevels: sweetnessOptions,
  iceLevels: iceOptions,
  sizes: sizeOptions,
  toppings: toppingOptions,
  extras: extraOptions,
};

export const PRICE_NOTE = `Published TAKKERU ${BOBA_CATALOG.productName} price of ₹${BOBA_CATALOG.basePriceInr}. Flavours, sugar, ice and included toppings do not change it. Large cup is +₹50. Anything not on the menu is left unpriced and cannot be added to the cart.`;
