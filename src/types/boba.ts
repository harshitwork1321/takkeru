export type PriceStatus = 'verified' | 'unpublished';

export interface BobaOption {
  id: string;
  name: string;
  description: string;
  surchargeInr: number | null;
  priceStatus: PriceStatus;
  image?: string;
  japanese?: string;
  tint?: string;
}

export type BobaGroup = 'drink' | 'flavor' | 'sweetness' | 'ice' | 'size' | 'topping' | 'extra';

export interface BobaCatalog {
  productId: string;
  productName: string;
  basePriceInr: number;
  image: string;
  flavors: BobaOption[];
  sweetnessLevels: BobaOption[];
  iceLevels: BobaOption[];
  sizes: BobaOption[];
  toppings: BobaOption[];
  extras: BobaOption[];
}

export interface BobaSelection {
  flavorId: string | null;
  sweetnessId: string | null;
  iceId: string | null;
  sizeId: string | null;
  toppingIds: string[];
  extraIds: string[];
}

export interface BobaQuoteLine {
  group: BobaGroup;
  id: string;
  name: string;
  amountInr: number | null;
  included: boolean;
}

export interface BobaQuoteIssue {
  type: string;
  group?: BobaGroup;
  id?: string;
  name?: string;
}

export interface BobaQuote {
  totalInr: number;
  purchasable: boolean;
  lines: BobaQuoteLine[];
  issues: BobaQuoteIssue[];
  unpricedNames: string[];
}

export interface BobaDrinkPayload {
  key: string;
  selection: BobaSelection;
  unitPrice: number;
}
