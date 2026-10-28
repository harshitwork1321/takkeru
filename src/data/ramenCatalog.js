import { getProductById } from './products.js';

/**
 * Build-your-ramen catalog — the single source of truth for every choice
 * the builder offers and what each choice costs.
 *
 * Pricing provenance (everything is derived from src/data/products.js):
 * - Signature Ramen is published at ₹199 with a tonkotsu-style broth,
 *   wheat noodles, chashu pork, soft-boiled egg, nori, spring onions and
 *   sesame. The base price is read from the product, never copied.
 * - Free customizations published on that product: spice level
 *   (Mild / Medium / Spicy / Extra Spicy) and noodle firmness
 *   (Soft / Regular / Firm). Toppings listed on the product are included
 *   in the bowl price.
 * - Nothing else has a published surcharge. Veg Noodles stays in the
 *   builder as an unpriced choice (`surchargeInr: null`) so the layout can
 *   show it, but it is never charged and never added to the cart.
 *
 * When TAKKERU publishes real surcharges, set them here — the pricing
 * engine, the UI and the tests pick them up with no other changes.
 */

const signature = getProductById('ramen-signature');

export const RAMEN_CATALOG = {
  /** Verified Signature Ramen price, INR — sourced from products.js. */
  signaturePriceInr: signature?.price,
  signatureProductId: signature?.id ?? 'ramen-signature',
  signatureName: signature?.name ?? 'Signature Ramen',
  bases: [
    {
      id: 'ramen-noodles',
      name: 'Ramen Noodles',
      description: 'Classic & chewy',
      surchargeInr: 0,
      priceStatus: 'verified',
      image: '/images/ramen-noodles.jpg',
    },
    {
      id: 'veg-noodles',
      name: 'Veg Noodles',
      description: 'Light & fresh',
      surchargeInr: null,
      priceStatus: 'unpublished',
      image: '/images/veg-noodles.jpg',
    },
  ],
  broths: [
    {
      id: 'tonkotsu',
      name: 'Tonkotsu',
      description: 'Pork bone broth from the signature bowl',
      surchargeInr: 0,
      priceStatus: 'verified',
      image: '/images/tonkotsu.jpg',
    },
  ],
  spiceLevels: [
    {
      id: 'mild',
      name: 'Mild',
      description: 'A gentle warmth',
      surchargeInr: 0,
      priceStatus: 'verified',
      heat: 1,
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Balanced heat',
      surchargeInr: 0,
      priceStatus: 'verified',
      heat: 2,
    },
    {
      id: 'spicy',
      name: 'Spicy',
      description: 'Bold and hot',
      surchargeInr: 0,
      priceStatus: 'verified',
      heat: 3,
    },
    {
      id: 'extra-spicy',
      name: 'Extra Spicy',
      description: 'The hottest listed',
      surchargeInr: 0,
      priceStatus: 'verified',
      heat: 4,
    },
  ],
  toppings: [
    {
      id: 'chashu-pork',
      name: 'Chashu Pork',
      description: 'Slow-braised pork',
      surchargeInr: 0,
      priceStatus: 'verified',
    },
    {
      id: 'soft-boiled-egg',
      name: 'Egg',
      description: 'Soft-boiled, jammy yolk',
      surchargeInr: 0,
      priceStatus: 'verified',
    },
    {
      id: 'nori',
      name: 'Nori',
      description: 'Roasted seaweed',
      surchargeInr: 0,
      priceStatus: 'verified',
    },
    {
      id: 'spring-onions',
      name: 'Scallions',
      description: 'Fresh spring onion',
      surchargeInr: 0,
      priceStatus: 'verified',
    },
    {
      id: 'sesame-seeds',
      name: 'Sesame',
      description: 'Toasted white sesame',
      surchargeInr: 0,
      priceStatus: 'verified',
    },
  ],
  extras: [
    {
      id: 'firmness-soft',
      name: 'Soft',
      description: 'Tender noodles',
      surchargeInr: 0,
      priceStatus: 'verified',
      exclusiveGroup: 'firmness',
    },
    {
      id: 'firmness-regular',
      name: 'Regular',
      description: 'As the signature bowl',
      surchargeInr: 0,
      priceStatus: 'verified',
      exclusiveGroup: 'firmness',
    },
    {
      id: 'firmness-firm',
      name: 'Firm',
      description: 'More bite',
      surchargeInr: 0,
      priceStatus: 'verified',
      exclusiveGroup: 'firmness',
    },
  ],
};

export const PRICE_NOTE = `Estimated from the published ${RAMEN_CATALOG.signatureName} price of ₹${RAMEN_CATALOG.signaturePriceInr}. Included choices do not change it. Anything not on the menu is left unpriced and cannot be added to the cart.`;
