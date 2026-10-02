import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { PRODUCTS } from '../data/products';

const BOBA = PRODUCTS.find((p) => p.id === 'boba-tea');
const MENU_PRODUCTS = ['mandu', 'ramen-signature', 'tteokbokki']
  .map((id) => PRODUCTS.find((p) => p.id === id))
  .filter(Boolean);

const NUMBERS = ['01', '02', '03'];

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
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-accent font-jp tracking-[0.6em] block mb-4 text-sm uppercase">
            料理
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-6xl md:text-8xl tracking-tighter">
            THE TAKKERU MENU
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-subtle/50 font-inter text-base md:text-lg mt-6 max-w-2xl mx-auto">
            Boba Tea leads. Mandu, Signature Ramen and Tteokbokki follow. Four bold street-food
            picks, four exact prices.
          </motion.p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {BOBA && (
            <BobaHeroCard product={BOBA} inView={gridInView} onAdd={addItem} onNavigate={navigate} />
          )}
          {MENU_PRODUCTS.map((product, index) => (
            <FoodMenuCard
              key={product.id}
              product={product}
              index={index}
              number={NUMBERS[index]}
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

function BobaHeroCard({ product, inView, onAdd, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group relative md:col-span-3 overflow-hidden border-2 border-accent/70 bg-accent/[0.06]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="relative aspect-[16/10] overflow-hidden cursor-pointer md:aspect-[4/3]"
          onClick={() => onNavigate(product.id)}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="eager"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent md:bg-gradient-to-r" />
          <span className="absolute top-4 left-4 text-white/30 font-bebas text-7xl md:text-8xl leading-none select-none drop-shadow-lg">
            01
          </span>
          <span className="absolute top-4 right-4 bg-accent px-3 py-1 font-bebas text-xs tracking-[0.2em] text-white">
            FEATURED
          </span>
          <span className="absolute bottom-4 left-4 font-jp text-xs text-white/85 tracking-[0.3em]">
            {product.japanese}
          </span>
        </div>

        <div className="flex flex-col justify-center p-7 md:p-10">
          <span className="text-[10px] font-inter font-semibold tracking-[0.3em] text-accent">
            01 — THE HERO DRINK
          </span>
          <h3 className="mt-2 font-bebas text-5xl leading-[0.9] tracking-wide text-white md:text-7xl">
            BOBA TEA
          </h3>
          <p className="mt-4 max-w-md font-inter text-sm leading-relaxed text-subtle/60 md:text-base">
            {product.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <span className="font-bebas text-5xl leading-none text-accent">₹{product.price}</span>
            <button
              onClick={() => onAdd(product.id)}
              className="px-7 py-3 bg-accent text-primary font-bebas text-base tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={() => onNavigate(product.id)}
              className="font-bebas text-base tracking-[0.15em] uppercase text-white/70 underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-accent"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FoodMenuCard({ product, index, number, inView, onAdd, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.12 + index * 0.12, ease: 'easeOut' }}
      className="group relative rounded-2xl border border-white/5 overflow-hidden bg-white/[0.02] transition-colors duration-300 hover:border-accent"
    >
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => onNavigate(product.id)}>
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        <span className="absolute top-4 left-4 text-white/20 font-bebas text-7xl md:text-8xl leading-none select-none drop-shadow-lg">
          {number}
        </span>
        <span className="absolute bottom-4 left-4 font-jp text-xs text-accent/80 tracking-[0.3em]">
          {product.japanese}
        </span>
        <span className="absolute top-4 right-4 text-[10px] text-subtle/50 tracking-widest uppercase font-bebas">
          {product.tag}
        </span>
      </div>

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
          <button onClick={() => onAdd(product.id)} className="px-5 py-2 bg-accent text-primary font-bebas text-sm tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
