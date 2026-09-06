import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';

const MENU_ITEMS = [
  {
    id: 'ramen',
    name: 'Ramen',
    jp: 'ラーメン',
    price: '₹389 – ₹629',
    desc: 'A comforting noodle bowl served in rich flavorful broth with chewy noodles, toppings, and warm steam. Authentic pan-Asian flavors ranging from mild to spicy.',
    img: '/images/Ramen.jpeg',
    hasSteam: true,
    category: 'Ramen',
  },
  {
    id: 'boba',
    name: 'Boba Tea',
    jp: 'ボバティー',
    price: '₹299',
    desc: 'Chilled creamy milk tea served with chewy tapioca pearls — sweet, refreshing, and perfect for your cart.',
    img: '/images/boba.jpg',
    category: 'Bubble Drinks',
  },
  {
    id: 'boba-brown-sugar',
    name: 'Brown Sugar Boba',
    jp: '黒糖ボバ',
    price: '₹349',
    desc: 'Rich brown sugar syrup swirled with fresh milk and warm tapioca pearls. Deep, caramelised sweetness.',
    img: '/images/soon.jpg',
    category: 'Bubble Drinks',
  },
  {
    id: 'tteokbokki',
    name: 'Tteokbokki Bowl',
    jp: 'トッポギ',
    price: '₹479',
    desc: 'Korean street-food chewy rice cakes coated in spicy savory sauce. Bold flavor with soft texture and comforting spice.',
    img: '/images/tteokbokki.jpg',
    category: 'Korean',
  },
  {
    id: 'dango',
    name: 'Dango',
    jp: '団子',
    price: '₹389',
    desc: 'Traditional sweet rice dumplings on skewers — soft, chewy, and beautifully classic.',
    img: '/images/dango.jpeg',
    category: 'Korean',
  },
  {
    id: 'japchae',
    name: 'Japchae Bowl',
    jp: 'チャプチェ',
    price: '₹489',
    desc: 'Korean sweet potato glass noodles stir-fried with vegetables and savory sauce — smoky, chewy, and satisfying.',
    img: '/images/japchae.jpg',
    category: 'Korean',
  },
  {
    id: 'mandu',
    name: 'Mandu',
    jp: '饅頭',
    price: '₹189',
    desc: 'Korean dumplings pan-fried to golden perfection. Crispy outside, juicy inside.',
    img: '/images/mandu.jpg',
    category: 'Mandu',
  },
];

const CATEGORIES = ['All', ...new Set(MENU_ITEMS.map((item) => item.category))];

const PRODUCT_ID_MAP = {
  'Ramen': 'ramen-signature',
  'Boba Tea': 'boba-tea',
  'Brown Sugar Boba': 'boba-brown-sugar',
  'Tteokbokki Bowl': 'tteokbokki',
  'Dango': 'dango',
  'Japchae Bowl': 'japchae',
  'Mandu': 'mandu',
};

/* Steam decoration for ramen */
const Steam = () => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-10">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        initial={{ y: 40, opacity: 0, scale: 0.5 }}
        animate={{ y: -80, opacity: [0, 0.4, 0], scale: [0.5, 1.5, 2], x: [0, (i - 2) * 15, 0] }}
        transition={{ duration: 3 + i, repeat: Infinity, delay: i * 1, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-6 h-16 bg-white/20 blur-xl rounded-full"
      />
    ))}
  </div>
);

export default function Menu() {
  const [active, setActive] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addItem } = useCart();
  const navigate = useNavigate();

  const filteredItems = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const filteredTotal = filteredItems.length;

  // Drag state
  const dragStartX = useRef(null);

  const prev = useCallback(() => setActive((a) => (a - 1 + filteredTotal) % filteredTotal), [filteredTotal]);
  const next = useCallback(() => setActive((a) => (a + 1) % filteredTotal), [filteredTotal]);

  /* Keyboard navigation */
  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  /* Drag / swipe handlers */
  const onDragStart = (e) => {
    dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  };
  const onDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const delta = dragStartX.current - endX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    dragStartX.current = null;
  };

  /* Map each item to a visible position: centre, left, right, or hidden */
  const getPosition = (index) => {
    const diff = ((index - active) % filteredTotal + filteredTotal) % filteredTotal;
    if (diff === 0) return 'active';
    if (diff === 1) return 'right1';
    if (diff === filteredTotal - 1) return 'left1';
    if (diff === 2) return 'right2';
    if (diff === filteredTotal - 2) return 'left2';
    return 'hidden';
  };

  const POSITIONS = {
    active:  { x: '0%',    y: '0%',   scale: 1,    opacity: 1,    zIndex: 30, rotate: 0  },
    right1:  { x: '62%',   y: '8%',   scale: 0.75, opacity: 0.85, zIndex: 20, rotate: 4  },
    left1:   { x: '-62%',  y: '8%',   scale: 0.75, opacity: 0.85, zIndex: 20, rotate: -4 },
    right2:  { x: '110%',  y: '20%',  scale: 0.55, opacity: 0.4,  zIndex: 10, rotate: 8  },
    left2:   { x: '-110%', y: '20%',  scale: 0.55, opacity: 0.4,  zIndex: 10, rotate: -8 },
    hidden:  { x: '0%',    y: '0%',   scale: 0.3,  opacity: 0,    zIndex: 0,  rotate: 0  },
  };

  const activeItem = filteredItems[active] || filteredItems[0];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActive(0);
  };

  return (
    <section
      className="py-24 md:py-40 bg-primary relative overflow-hidden"
      onKeyDown={handleKey}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Featured Menu Carousel"
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,white_20px,white_21px)]" />
      </div>

      {/* Glow blob behind active card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-jp tracking-[0.6em] block mb-6 text-sm uppercase"
          >
            本物の味
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl mb-6 tracking-tighter"
          >
            FEATURED MENU
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-subtle/40 font-inter max-w-xl mx-auto italic"
          >
            Bold Asian flavors curated for your mobile food cart.
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
              onClick={() => handleCategoryChange(cat)}
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

        {/* ── Carousel ── */}
        {filteredTotal > 0 ? (
          <div
            className="relative mx-auto select-none"
            style={{ height: '420px', maxWidth: '900px' }}
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onTouchStart={onDragStart}
            onTouchEnd={onDragEnd}
          >
            {filteredItems.map((item, i) => {
              const pos = getPosition(i);
              const style = POSITIONS[pos];
              const isActive = pos === 'active';

              return (
                <motion.div
                  key={item.id}
                  aria-hidden={!isActive}
                  onClick={() => !isActive && setActive(i)}
                  animate={{
                    x: style.x,
                    y: style.y,
                    scale: style.scale,
                    opacity: style.opacity,
                    rotate: style.rotate,
                    zIndex: style.zIndex,
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  style={{ position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', width: '280px' }}
                  className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
                    isActive
                      ? 'border-accent/30 cursor-default shadow-[0_0_60px_rgba(255,122,61,0.15)]'
                      : 'border-white/5 cursor-pointer hover:border-white/20'
                  }`}
                >
                  {/* Image */}
                  <div
                    className="relative w-full h-64 bg-primary overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      const pid = PRODUCT_ID_MAP[item.name];
                      if (pid && isActive) navigate(`/product/${pid}`);
                    }}
                  >
                    {item.hasSteam && isActive && <Steam />}
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'grayscale-0 scale-100' : 'grayscale scale-105'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                    <span className="absolute top-4 left-4 font-jp text-[10px] text-accent/70 tracking-widest uppercase">
                      {item.jp}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-4 right-4 font-bebas text-2xl text-accent tracking-wide">
                        {item.price}
                      </span>
                    )}
                  </div>

                  {/* Card info (only when active) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35 }}
                        className="p-6 bg-white/[0.03]"
                      >
                        <h3
                          className="text-3xl font-bebas tracking-wide text-white mb-2 cursor-pointer hover:text-accent transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            const pid = PRODUCT_ID_MAP[item.name];
                            if (pid) navigate(`/product/${pid}`);
                          }}
                        >
                          {item.name}
                        </h3>
                        <p className="text-subtle/50 text-sm font-inter leading-relaxed">{item.desc}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="font-bebas text-xl text-accent tracking-wide">{item.price}</span>
                          <button
                            onClick={() => {
                              const pid = PRODUCT_ID_MAP[item.name];
                              if (pid) addItem(pid);
                            }}
                            className="px-5 py-2 bg-accent text-primary font-bebas text-sm tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-subtle/40 font-inter">No items in this category.</p>
          </div>
        )}

        {/* ── Controls ── */}
        {filteredTotal > 0 && (
          <div className="flex items-center justify-center gap-8 mt-10">
            <button
              onClick={prev}
              aria-label="Previous menu item"
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div className="flex gap-3">
              {filteredItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${filteredItems[i].name}`}
                  className={`rounded-full transition-all duration-400 ${
                    i === active ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next menu item"
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* Active item name hint */}
        {activeItem && (
          <motion.p
            key={activeItem.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-subtle/30 font-inter text-xs tracking-[0.25em] uppercase mt-6"
          >
            {active + 1} / {filteredTotal} — {activeItem.name}
          </motion.p>
        )}
      </div>
    </section>
  );
}
