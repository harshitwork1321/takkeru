import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import useCart from '../../hooks/useCart';

export default function CartButton() {
  const { cartCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label={`Shopping cart, ${cartCount} items`}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
    >
      <ShoppingCart className="w-5 h-5 text-subtle/60 group-hover:text-accent transition-colors" />

      <AnimatePresence mode="wait">
        {cartCount > 0 && (
          <motion.span
            key={cartCount}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-accent text-primary text-[10px] font-inter font-bold rounded-full flex items-center justify-center"
          >
            {cartCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
