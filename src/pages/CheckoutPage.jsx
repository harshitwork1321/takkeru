import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, Mail, MapPin, Building, Hash, Loader2 } from 'lucide-react';
import useCart from '../hooks/useCart';
import { getProductById } from '../data/products';
import { formatPrice, validateCustomerForm, generateOrderId } from '../lib/cart';

const FIELDS = [
  { id: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Your full name' },
  { id: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '9876543210' },
  { id: 'email', label: 'Email (optional)', icon: Mail, type: 'email', placeholder: 'you@example.com' },
  { id: 'address', label: 'Delivery Address', icon: MapPin, type: 'text', placeholder: 'House/Flat, Street, Landmark' },
  { id: 'city', label: 'City', icon: Building, type: 'text', placeholder: 'New Delhi' },
  { id: 'pincode', label: 'Pincode', icon: Hash, type: 'text', placeholder: '110021' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, total, clearCart, cartCount } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', pincode: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors: validationErrors } = validateCustomerForm(form);
    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const orderId = generateOrderId();
    clearCart();
    navigate('/order-confirmation', { state: { orderId, name: form.name } });
  };

  if (items.length === 0 && !loading) {
    return (
      <main className="min-h-screen bg-primary text-secondary relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-subtle/40 hover:text-accent transition-colors duration-300 mb-16 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-bebas tracking-[0.2em] text-lg uppercase">Back to Home</span>
          </motion.button>

          <div className="max-w-lg mx-auto text-center py-20">
            <h1 className="font-bebas text-5xl md:text-6xl mb-4">CART IS EMPTY</h1>
            <p className="text-subtle/40 font-inter mb-8">Add some items to your cart before checking out.</p>
            <button
              onClick={() => navigate('/')}
              className="px-10 py-4 bg-accent text-primary font-bebas text-lg tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-primary text-secondary relative overflow-hidden">
      <div className="grain-overlay" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-subtle/40 hover:text-accent transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-bebas tracking-[0.2em] text-lg uppercase">Back to Home</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-accent font-jp tracking-[0.4em] block mb-4 text-sm">チェックアウト</span>
          <h1 className="font-bebas text-5xl md:text-7xl">CHECKOUT</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12">
            {/* Left: Customer Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <h2 className="font-bebas text-2xl tracking-[0.1em] text-subtle/70 mb-6">DELIVERY DETAILS</h2>

              {FIELDS.map(({ id, label, icon: Icon, type, placeholder }, idx) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
                >
                  <label htmlFor={id} className="block text-subtle/50 text-xs uppercase tracking-[0.2em] mb-2 font-inter">
                    {label}
                  </label>
                  <div className="relative group">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle/30 group-focus-within:text-accent transition-colors duration-300" />
                    <input
                      id={id}
                      type={type}
                      value={form[id]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white placeholder:text-subtle/20 font-inter text-sm focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all duration-300"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent group-focus-within:w-full transition-all duration-500 rounded-full" />
                  </div>
                  {errors[id] && <p className="mt-1.5 text-xs text-red-400 font-inter">{errors[id]}</p>}
                </motion.div>
              ))}
            </motion.div>

            {/* Right: Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 sticky top-24">
                <h2 className="font-bebas text-2xl tracking-[0.1em] text-subtle/70 mb-6">ORDER SUMMARY</h2>

                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    return (
                      <div key={item.productId} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.03]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/images/soon.jpg'; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bebas text-sm tracking-wide text-white truncate">{product.name}</p>
                          <p className="text-subtle/40 text-[10px] font-inter">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bebas text-sm text-accent">{formatPrice(product.price * item.quantity)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
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
                  <div className="flex justify-between text-lg font-bebas tracking-wide pt-3 border-t border-white/10">
                    <span className="text-subtle/70">TOTAL</span>
                    <span className="text-accent text-2xl">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-4 bg-accent text-primary font-bebas text-lg tracking-[0.15em] uppercase rounded-xl hover:bg-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </main>
  );
}
