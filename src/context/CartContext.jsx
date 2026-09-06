import { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { getProductById } from '../data/products';
import { calculateSubtotal, calculateDeliveryFee, calculateTotal, calculateCartQuantity } from '../lib/cart';

const STORAGE_KEY = 'takkeru_cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.productId === 'string' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        getProductById(item.productId)
    );
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable — fail silently
  }
}

/* eslint-disable react-refresh/only-export-components */
export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, product: null });
  const toastTimer = useRef(null);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((productId) => {
    const product = getProductById(productId);
    if (!product) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });

    setToast({ visible: true, product });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast({ visible: false, product: null });
    }, 2500);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const hideToast = useCallback(() => {
    setToast({ visible: false, product: null });
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    cartCount: calculateCartQuantity(items),
    subtotal: calculateSubtotal(items),
    deliveryFee: calculateDeliveryFee(calculateSubtotal(items)),
    total: calculateTotal(items),
    isCartOpen,
    openCart,
    closeCart,
    toast,
    hideToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
