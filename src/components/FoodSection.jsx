import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { formatPrice } from '../lib/cart';
import { getProductByName } from '../data/products';

const SIGNATURE_ITEMS = [
  {
    title: 'Ramen',
    description:
      'Rich broth, chewy noodles, warm steam. Authentic pan-Asian flavours from mild to spicy.',
    image: '/images/Ramen.jpeg',
    japanese: 'ラーメン',
    tag: 'Signature',
    color: 'from-amber-900/30',
    category: 'Ramen',
  },
  {
    title: 'Mandu',
    description:
      'Korean dumplings pan-fried to golden perfection. Crispy outside, juicy inside.',
    image: '/images/mandu.jpg',
    japanese: '饅頭',
    tag: 'Pan-Fried',
    color: 'from-orange-900/30',
    category: 'Mandu',
  },
  {
    title: 'Boba Tea',
    description:
      'Chilled creamy milk tea with chewy tapioca pearls. Sweet, refreshing, and perfect for your cart.',
    image: '/images/boba.jpg',
    japanese: 'ボバティー',
    tag: 'Refreshing',
    color: 'from-purple-900/30',
    category: 'Bubble Drinks',
  },
  {
    title: 'Tteokbokki Bowl',
    description:
      'Korean street-food rice cakes coated in spicy savory sauce. Bold, chewy, and comfortingly spiced.',
    image: '/images/tteokbokki.jpg',
    japanese: 'トッポギ',
    tag: 'Spicy',
    color: 'from-red-900/30',
    category: 'Korean',
  },
];

const CATEGORIES = ['All', ...new Set(SIGNATURE_ITEMS.map((item) => item.category))];

/* 3-D tilt card */
function TiltCard({ item, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const product = getProductByName(item.title);
  const price = product ? formatPrice(product.price) : null;
  const productId = product ? product.id : null;

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -22;
    setTilt({ x, y });
  };

  const onEnter = () => setHovered(true);
  const onLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => productId && navigate(`/product/${productId}`)}
        className="relative cursor-pointer rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_60px_rgba(255,122,61,0.1)]"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${item.color} via-transparent to-primary/40`} />

          {/* Tag */}
          <span className="absolute top-4 left-4 px-3 py-1 bg-accent/90 text-primary font-bebas text-xs tracking-[0.15em] uppercase rounded-full">
            {item.tag}
          </span>

          {/* Japanese */}
          <span className="absolute bottom-4 right-4 font-jp text-white/30 text-sm tracking-widest">
            {item.japanese}
          </span>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-2xl font-bebas tracking-wide mb-2 group-hover:text-accent transition-colors">
            {item.title}
          </h3>
          <p className="text-subtle/50 text-sm font-inter leading-relaxed mb-4 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between">
            {price && (
              <span className="font-bebas text-xl text-accent tracking-wide">
                {price}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (productId) addItem(productId);
              }}
              className="px-4 py-2 bg-accent/10 text-accent font-bebas text-xs tracking-[0.15em] uppercase rounded-full hover:bg-accent hover:text-primary transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FoodSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? SIGNATURE_ITEMS
    : SIGNATURE_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(-45deg,transparent,transparent_30px,white_30px,white_31px)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-jp tracking-[0.6em] block mb-6 text-sm uppercase"
          >
            品質
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl mb-6 tracking-tighter"
          >
            BOBA • MANDU •<br />RAMEN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-subtle/40 font-inter max-w-xl mx-auto italic"
          >
            Handcrafted with precision. Served with passion.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-bebas text-sm tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-accent text-primary border-accent'
                  : 'bg-transparent text-subtle/50 border-white/10 hover:border-accent/40 hover:text-subtle/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item, i) => (
            <TiltCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}