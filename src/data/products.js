export const PRODUCTS = [
  // ── Ramen ──
  {
    id: 'ramen-signature',
    slug: 'signature-korean-ramen',
    name: 'Signature Korean Ramen',
    japanese: 'ラーメン',
    tag: 'Signature',
    description: 'Rich broth, chewy noodles, warm steam. Authentic pan-Asian flavours from mild to spicy.',
    longDescription: 'Our signature ramen features a slow-simmered tonkotsu-style broth with hand-pulled noodles, chashu pork, soft-boiled egg, nori, and spring onions. A warming bowl of authentic Korean-Japanese comfort that has become the heart of Takkeru.',
    price: 389,
    image: '/images/Ramen.jpeg',
    category: 'Ramen',
    ingredients: ['Wheat noodles', 'Pork broth', 'Chashu pork', 'Soft-boiled egg', 'Nori', 'Spring onions', 'Sesame oil', 'Soy sauce'],
    allergens: ['Gluten', 'Egg', 'Soy'],
    spiceLevel: 3,
    prepTime: '12-15 min',
    isVegetarian: false,
    available: true,
    rating: 4.9,
    reviewCount: 284,
    sizes: null,
    customizations: [
      { label: 'Spice Level', options: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'] },
      { label: 'Noodle Firmness', options: ['Soft', 'Regular', 'Firm'] },
    ],
    fillingDescription: null,
    cookingMethod: null,
    brothType: 'Tonkotsu (Pork Bone)',
    noodleFirmness: 'Regular',
    toppings: ['Chashu pork', 'Soft-boiled egg', 'Nori', 'Spring onions', 'Sesame seeds'],
    comboItems: null,
    originalPrice: null,
  },

  // ── Mandu ──
  {
    id: 'mandu',
    slug: 'mandu',
    name: 'Mandu',
    japanese: '饅頭',
    tag: 'Pan-Fried',
    description: 'Korean dumplings pan-fried to golden perfection. Crispy outside, juicy inside.',
    longDescription: 'Handmade Korean dumplings filled with seasoned pork, tofu, and vegetables, pan-fried until golden and crispy. Served with our signature dipping sauce. Each bite is a burst of flavour.',
    price: 89,
    image: '/images/mandu.jpg',
    category: 'Mandu',
    ingredients: ['Pork', 'Tofu', 'Cabbage', 'Garlic', 'Ginger', 'Dumpling wrapper', 'Sesame oil'],
    allergens: ['Gluten', 'Soy', 'Sesame'],
    spiceLevel: 0,
    prepTime: '10-12 min',
    isVegetarian: false,
    available: true,
    rating: 4.7,
    reviewCount: 178,
    sizes: [
      { label: '4 Pcs', priceModifier: 0 },
      { label: '8 Pcs', priceModifier: 120 },
    ],
    customizations: [
      { label: 'Cooking Style', options: ['Pan-Fried', 'Steamed'] },
    ],
    fillingDescription: 'Seasoned pork, tofu, cabbage, garlic, ginger',
    cookingMethod: 'Pan-Fried',
    brothType: null,
    noodleFirmness: null,
    toppings: null,
    comboItems: null,
    originalPrice: null,
  },

  // ── Boba Tea ──
  {
    id: 'boba-tea',
    slug: 'boba-tea',
    name: 'Boba Tea',
    japanese: 'ボバティー',
    tag: 'Refreshing',
    description: 'Chilled creamy milk tea with chewy tapioca pearls. Sweet, refreshing, and perfect for your cart.',
    longDescription: 'Our signature boba tea is crafted with premium milk tea base and hand-cooked tapioca pearls. Each sip delivers the perfect balance of creamy sweetness and chewy texture — the ultimate street-food beverage.',
    price: 299,
    image: '/images/boba.jpg',
    category: 'Bubble Drinks',
    ingredients: ['Milk tea', 'Tapioca pearls', 'Brown sugar syrup', 'Ice'],
    allergens: ['Dairy'],
    spiceLevel: 0,
    prepTime: '5-7 min',
    isVegetarian: true,
    available: true,
    rating: 4.8,
    reviewCount: 412,
    sizes: [
      { label: 'Regular', priceModifier: 0 },
      { label: 'Large', priceModifier: 50 },
    ],
    customizations: [
      { label: 'Sugar Level', options: ['Less Sugar', 'Regular', 'Extra Sweet'] },
      { label: 'Ice Level', options: ['No Ice', 'Less Ice', 'Regular Ice'] },
    ],
    fillingDescription: null,
    cookingMethod: null,
    brothType: null,
    noodleFirmness: null,
    toppings: null,
    comboItems: null,
    originalPrice: null,
  },

  // ── Tteokbokki ──
  {
    id: 'tteokbokki',
    slug: 'tteokbokki-bowl',
    name: 'Tteokbokki Bowl',
    japanese: 'トッポギ',
    tag: 'Spicy',
    description: 'Korean street-food rice cakes coated in spicy savory sauce. Bold, chewy, and comfortingly spiced.',
    longDescription: 'Chewy Korean rice cakes tossed in our house-made gochujang sauce with fish cake, boiled egg, and spring onions. A street-food classic perfected for Delhi\'s bold palates. Choose your spice level.',
    price: 479,
    image: '/images/tteokbokki.jpg',
    category: 'Korean Comfort Food',
    ingredients: ['Rice cakes', 'Gochujang sauce', 'Fish cake', 'Boiled egg', 'Spring onions', 'Sesame seeds'],
    allergens: ['Fish', 'Egg', 'Soy'],
    spiceLevel: 4,
    prepTime: '10-12 min',
    isVegetarian: false,
    available: true,
    rating: 4.8,
    reviewCount: 198,
    sizes: null,
    customizations: [
      { label: 'Spice Level', options: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'] },
    ],
    fillingDescription: null,
    cookingMethod: null,
    brothType: null,
    noodleFirmness: null,
    toppings: null,
    comboItems: null,
    originalPrice: null,
  },
];

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getProductByName(name) {
  return PRODUCTS.find((p) => p.name === name) || null;
}

export function getProductsByCategory(category) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return PRODUCTS.filter((p) => FEATURED_PRODUCT_IDS.includes(p.id));
}

export const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];

export const FEATURED_PRODUCT_IDS = [
  'boba-tea',
  'ramen-signature',
  'tteokbokki',
  'mandu',
];

export const CATEGORY_IMAGES = {
  'Bubble Drinks': '/images/boba.jpg',
  'Ramen': '/images/Ramen.jpeg',
  'Korean Comfort Food': '/images/tteokbokki.jpg',
  'Mandu': '/images/mandu.jpg',
};