import { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { getProductById } from '../data/products';
import { calculateSubtotal, calculateDeliveryFee, calculateTotal, calculateCartQuantity } from '../lib/cart';
import { normalizeBowl, lineKey } from '../lib/ramenCart';
import { normalizeBoba } from '../lib/bobaCart';

const STORAGE_KEY = 'takkeru_cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item) =>
          item &&
          typeof item.productId === 'string' &&
          typeof item.quantity === 'number' &&
          item.quantity > 0 &&
          getProductById(item.productId)
      )
      .flatMap((item) => {
        let next = item;
        if (item.bowl) {
          const bowl = normalizeBowl(item.bowl);
          if (!bowl) return [];
          next = { ...next, bowl };
        }
        if (next.boba) {
          const boba = normalizeBoba(next.boba);
          if (!boba) return [];
          next = { ...next, boba };
        }
        return [next];
      });
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

  const addItem = useCallback((productId, bowl = null, boba = null) => {
    const product = getProductById(productId);
    if (!product) return false;

    let cleanBowl = null;
    if (bowl) {
      cleanBowl = normalizeBowl(bowl);
      if (!cleanBowl) return false;
    }
    let cleanBoba = null;
    if (boba) {
      cleanBoba = normalizeBoba(boba);
      if (!cleanBoba) return false;
    }
    const key = lineKey({ productId, bowl: cleanBowl, boba: cleanBoba });

    setItems((prev) => {
      const existing = prev.find((i) => lineKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const next = { productId, quantity: 1 };
      if (cleanBowl) next.bowl = cleanBowl;
      if (cleanBoba) next.boba = cleanBoba;
      return [...prev, next];
    });

    setToast({ visible: true, product });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast({ visible: false, product: null });
    }, 2500);
    return true;
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => lineKey(i) !== key));
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => lineKey(i) !== key));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (lineKey(i) === key ? { ...i, quantity } : i))
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
