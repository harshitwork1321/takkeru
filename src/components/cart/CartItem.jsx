import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getProductById } from '../../data/products';
import { formatPrice, getUnitPrice } from '../../lib/cart';
import { lineKey } from '../../lib/ramenCart';
import { describeSelection } from '../../lib/ramenSelection';
import { describeBobaSelection } from '../../lib/bobaSelection';
import useCart from '../../hooks/useCart';
import QuantityControl from './QuantityControl';

function bowlSummary(selection) {
  const described = describeSelection(selection);
  const parts = [described.base, described.broth, described.spice].filter(Boolean);
  if (described.extras.length > 0) parts.push(described.extras.join(' / '));
  const summary = parts.join(' · ');
  return described.toppings.length > 0
    ? `${summary} · ${described.toppings.join(', ')}`
    : summary;
}

function bobaSummary(selection) {
  const described = describeBobaSelection(selection);
  const parts = [described.flavor, described.sweetness, described.ice, described.size].filter(Boolean);
  if (described.extras.length > 0) parts.push(described.extras.join(' / '));
  const summary = parts.join(' · ');
  return described.toppings.length > 0
    ? `${summary} · ${described.toppings.join(', ')}`
    : summary;
}

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart();
  const product = getProductById(item.productId);
  const key = lineKey(item);

  if (!product) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5 mb-3"
    >
      {/* Image */}
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.03]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/soon.jpg';
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-bebas text-base tracking-wide text-white truncate">
              {product.name}
            </h4>
            <p className="text-subtle/40 text-[10px] uppercase tracking-[0.15em] font-inter">
              {item.bowl ? 'Custom bowl' : item.boba ? 'Custom boba' : product.category}
            </p>
          </div>
          <button
            onClick={() => removeItem(key)}
            aria-label={`Remove ${product.name}${item.bowl ? ' custom bowl' : item.boba ? ' custom boba' : ''} from cart`}
            className="w-6 h-6 flex items-center justify-center text-subtle/30 hover:text-red-400 transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {item.bowl && (
          <p className="text-subtle/50 text-[11px] font-inter leading-snug mt-1">
            {bowlSummary(item.bowl.selection)}
          </p>
        )}

        {item.boba && (
          <p className="text-subtle/50 text-[11px] font-inter leading-snug mt-1">
            {bobaSummary(item.boba.selection)}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <QuantityControl
            quantity={item.quantity}
            onIncrease={() => updateQuantity(key, item.quantity + 1)}
            onDecrease={() => updateQuantity(key, item.quantity - 1)}
          />
          <span className="font-bebas text-sm text-accent tracking-wide">
            {formatPrice(getUnitPrice(item) * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
