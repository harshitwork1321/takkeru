import type { BobaDrinkPayload } from '../types/boba';

export interface CartItemLike {
  productId: string;
  quantity: number;
  bowl?: { key: string; selection: Record<string, unknown>; unitPrice: number } | null;
  boba?: BobaDrinkPayload | null;
}

export interface CartContextValue {
  items: CartItemLike[];
  addItem: (productId: string, bowl?: unknown, boba?: unknown) => boolean;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toast: { visible: boolean; product: { id: string; name: string; image?: string } | null };
  hideToast: () => void;
}

declare function useCart(): CartContextValue;
export default useCart;
