import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function QuantityControl({ quantity, onIncrease, onDecrease }) {
  const isMin = quantity <= 1;

  return (
    <div className="flex items-center gap-0 border border-white/10 rounded-full overflow-hidden" role="group" aria-label="Quantity controls">
      <button
        onClick={onDecrease}
        aria-label={isMin ? 'Remove item' : 'Decrease quantity'}
        className="w-8 h-8 flex items-center justify-center text-subtle/60 hover:text-accent hover:bg-white/5 transition-colors duration-200"
      >
        {isMin ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
      </button>

      <motion.span
        key={quantity}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-8 h-8 flex items-center justify-center text-sm font-inter font-semibold text-white select-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </motion.span>

      <button
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center text-subtle/60 hover:text-accent hover:bg-white/5 transition-colors duration-200"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
