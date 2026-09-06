import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import useCart from '../../hooks/useCart';

export default function CartEmpty() {
  const { closeCart } = useCart();

  const scrollToMenu = () => {
    closeCart();
    setTimeout(() => {
      const el = document.getElementById('menu');
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-6 bg-white/[0.03]">
        <ShoppingCart className="w-8 h-8 text-subtle/30" />
      </div>

      <h3 className="font-bebas text-2xl tracking-wider text-white mb-3">
        YOUR CART IS EMPTY
      </h3>
      <p className="text-subtle/40 font-inter text-sm max-w-[220px] leading-relaxed mb-8">
        Looks like you haven&apos;t added anything yet.
      </p>

      <button
        onClick={scrollToMenu}
        className="px-8 py-3 bg-accent text-primary font-bebas text-base tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300"
      >
        Explore Menu
      </button>
    </motion.div>
  );
}
