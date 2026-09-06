import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import useCart from '../../hooks/useCart';

export default function Toast() {
  const { toast, hideToast } = useCart();

  return (
    <AnimatePresence>
      {toast.visible && toast.product && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={hideToast}
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[80] flex items-center gap-3 px-5 py-3 bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] cursor-pointer max-w-[320px]"
        >
          <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-inter font-medium leading-tight">Added to cart</p>
            <p className="text-subtle/50 text-xs font-inter truncate mt-0.5">
              {toast.product.name}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
