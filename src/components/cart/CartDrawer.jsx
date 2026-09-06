import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useCart from '../../hooks/useCart';
import CartItem from './CartItem';
import CartEmpty from './CartEmpty';
import CartSummary from './CartSummary';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items } = useCart();

  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') closeCart();
    },
    [closeCart]
  );

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-primary border-l border-white/10 z-[70] flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
              <div>
                <h2 className="font-bebas text-2xl tracking-[0.15em] text-white">
                  TAKKERU CART
                </h2>
                <p className="text-subtle/30 text-[10px] font-inter tracking-[0.2em] uppercase mt-0.5">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
              {items.length === 0 ? (
                <CartEmpty />
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItem key={item.productId} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="px-6 pb-6 pt-2 flex-shrink-0">
                <CartSummary />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
