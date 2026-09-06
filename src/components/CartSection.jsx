import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { formatPrice } from '../lib/cart';
import { getProductById } from '../data/products';

const CART_MENU_ITEMS = [
  { id: 'boba-tea', label: 'Boba Tea', jp: 'ボバティー' },
  { id: 'ramen-signature', label: 'Signature Ramen', jp: 'ラーメン' },
  { id: 'mandu', label: 'Mandu', jp: '饅頭' },
  { id: 'tteokbokki', label: 'Tteokbokki', jp: 'トッポギ' },
];

const STEPS = [
  {
    num: '01',
    title: 'SET UP YOUR CART',
    description: 'Get your TAKKERU CART ready. Compact, mobile, and designed to turn heads wherever it parks.',
  },
  {
    num: '02',
    title: 'SERVE THE CROWD',
    description: 'Boba, ramen, mandu — hot and cold menu items that draw lines and keep people coming back.',
  },
  {
    num: '03',
    title: 'SCALE YOUR BUSINESS',
    description: 'Take the cart to colleges, markets, events, and pop-ups. The business moves where the crowd is.',
  },
];

export default function CartSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <section
      id="cart"
      ref={ref}
      className="py-24 md:py-40 bg-primary relative overflow-hidden"
    >
      {/* Accent lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-accent font-jp tracking-[0.4em] block mb-6"
          >
            カート事業
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-8xl lg:text-9xl leading-none mb-6"
          >
            TAKKERU<br />CART
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-subtle/60 font-inter text-lg md:text-xl max-w-2xl italic"
          >
            Boba doesn't have to stay in one place. Take the business with you.
          </motion.p>
        </div>

        {/* Video + How It Works grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-32">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/5 bg-white/[0.02]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/cart-hero.png"
                className="w-full h-full object-cover"
              >
                <source src="/videos/a_TAKKERU_CART_-_FULL__1.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </div>
            {/* Corner accent */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-2 border-b-2 border-accent/30" />
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="text-accent font-jp tracking-[0.3em] text-sm block mb-4">仕組み</span>
            <h3 className="text-3xl md:text-5xl mb-10">HOW IT WORKS</h3>

            <div className="space-y-8">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                  className="flex gap-6 group"
                >
                  <span className="text-accent font-bebas text-4xl md:text-5xl leading-none opacity-40 group-hover:opacity-100 transition-opacity">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bebas tracking-wider mb-2 group-hover:text-accent transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-subtle/50 font-inter text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Menu Items Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h3 className="text-2xl md:text-4xl mb-8 text-center">THE MENU</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {CART_MENU_ITEMS.map((item, i) => {
              const product = getProductById(item.id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="group relative border border-white/5 bg-white/[0.02] p-6 text-center hover:border-accent/30 transition-all duration-500 cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <span className="font-jp text-white/10 text-4xl block mb-3">{item.jp}</span>
                  <h4 className="text-lg md:text-xl font-bebas tracking-wider group-hover:text-accent transition-colors mb-2">
                    {item.label}
                  </h4>
                  {product && (
                    <span className="text-accent font-bebas text-sm tracking-wide">
                      {formatPrice(product.price)}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(item.id);
                    }}
                    className="mt-4 w-full py-2 bg-accent/10 text-accent font-bebas text-xs tracking-[0.15em] uppercase rounded-full hover:bg-accent hover:text-primary transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a
              href="#contact"
              className="px-12 py-5 bg-accent text-primary font-bebas text-xl tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 transform hover:-translate-y-1"
            >
              START YOUR CART
            </a>
            <a
              href="#cart"
              className="px-12 py-5 border border-white/20 text-white font-bebas text-xl tracking-[0.2em] uppercase hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-500 transform hover:-translate-y-1"
            >
              SEE HOW IT WORKS
            </a>
          </div>
        </motion.div>
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/halftone.png')]" />

      {/* Large decorative text */}
      <div className="absolute -bottom-16 -right-16 text-[12rem] md:text-[20rem] font-bebas text-white/[0.02] select-none pointer-events-none whitespace-nowrap leading-none">
        TAKKERU CART
      </div>
    </section>
  );
}
