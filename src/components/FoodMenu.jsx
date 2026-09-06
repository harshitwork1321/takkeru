import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { PRODUCTS } from '../data/products';

const MENU_PRODUCTS = PRODUCTS.filter((p) =>
  ['ramen-signature', 'mandu', 'boba-tea', 'tteokbokki'].includes(p.id)
);

export default function FoodMenu() {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="menu" className="py-24 md:py-40 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,white_20px,white_21px)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent font-jp tracking-[0.6em] block mb-4 text-sm uppercase"
          >
            料理
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl tracking-tighter"
          >
            WHAT CAN YOU SELL?
          </motion.h2>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {MENU_PRODUCTS.map((product, index) => (
            <FoodMenuCard
              key={product.id}
              product={product}
              index={index}
              inView={gridInView}
              onAdd={(id) => addItem(id)}
              onNavigate={(id) => navigate(`/product/${id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FoodMenuCard({ product, index, inView, onAdd, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      className="group rounded-2xl border border-white/5 overflow-hidden bg-white/[0.02] transition-colors duration-300 hover:border-accent"
    >
      {/* Image */}
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer"
        onClick={() => onNavigate(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        <span className="absolute top-4 left-4 font-jp text-[10px] text-accent/70 tracking-widest uppercase">
          {product.japanese}
        </span>
        <span className="absolute top-4 right-4 text-[10px] text-subtle/50 tracking-widest uppercase font-bebas">
          {product.tag}
        </span>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-bebas text-3xl tracking-wide text-white mb-1">
          {product.name}
        </h3>
        <p className="text-subtle/50 font-inter text-sm leading-relaxed mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bebas text-xl text-accent tracking-wide">
            ₹{product.price}
          </span>
          <button
            onClick={() => onAdd(product.id)}
            className="px-5 py-2 bg-accent text-primary font-bebas text-sm tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
