import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../lib/cart';

export default function CartSummary() {
  const { items, subtotal, deliveryFee, total, cartCount, closeCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    closeCart();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    closeCart();
  };

  return (
    <div className="border-t border-white/10 pt-4 mt-auto">
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm font-inter">
          <span className="text-subtle/50">Subtotal ({cartCount} items)</span>
          <span className="text-white">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm font-inter">
          <span className="text-subtle/50">Delivery</span>
          <span className={deliveryFee === 0 ? 'text-green-400' : 'text-white'}>
            {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
          </span>
        </div>
        <div className="flex justify-between text-base font-bebas tracking-wide pt-2 border-t border-white/10">
          <span className="text-subtle/70">TOTAL</span>
          <span className="text-accent text-xl">{formatPrice(total)}</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={items.length === 0}
        className="w-full py-4 bg-accent text-primary font-bebas text-lg tracking-[0.15em] uppercase rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed mb-2"
      >
        Checkout
      </button>

      <button
        onClick={handleContinueShopping}
        className="w-full py-3 border border-white/10 text-subtle/60 font-bebas text-sm tracking-[0.15em] uppercase rounded-xl hover:border-accent hover:text-accent transition-colors duration-300"
      >
        Continue Shopping
      </button>
    </div>
  );
}
