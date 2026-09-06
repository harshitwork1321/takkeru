import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, PartyPopper } from 'lucide-react';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, name } = location.state || {};

  if (!orderId) {
    return (
      <main className="min-h-screen bg-primary text-secondary relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10 flex flex-col items-center justify-center min-h-screen">
          <h1 className="font-bebas text-5xl mb-4">NO ORDER FOUND</h1>
          <p className="text-subtle/40 font-inter mb-8">Something went wrong. Please try again.</p>
          <button
            onClick={() => navigate('/')}
            className="px-10 py-4 bg-accent text-primary font-bebas text-lg tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300"
          >
            Back to Menu
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-primary text-secondary relative overflow-hidden">
      <div className="grain-overlay" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-lg"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-accent font-jp tracking-[0.4em] block mb-4 text-sm">注文確認</span>
            <h1 className="font-bebas text-5xl md:text-7xl mb-4">
              ORDER CONFIRMED
            </h1>
            <PartyPopper className="w-8 h-8 text-accent mx-auto mb-6" />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <p className="text-subtle/60 font-inter text-lg mb-2">
              Thank you{name ? `, ${name}` : ''} for ordering from TAKKERU.
            </p>
            <p className="text-subtle/40 font-inter text-sm mb-8">
              Your order has been received.
            </p>

            {/* Order ID */}
            <div className="inline-block px-8 py-5 bg-white/[0.04] border border-white/10 rounded-2xl">
              <p className="text-subtle/40 text-xs font-inter uppercase tracking-[0.2em] mb-2">Order ID</p>
              <p className="font-bebas text-3xl text-accent tracking-[0.1em]">{orderId}</p>
            </div>
          </motion.div>

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 px-10 py-4 bg-accent text-primary font-bebas text-lg tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
