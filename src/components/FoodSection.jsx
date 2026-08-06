import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const SIGNATURE_ITEMS = [
  {
    title: 'Tteokbokki Bowl',
    description:
      'Korean street-food rice cakes coated in spicy savory sauce. Bold, chewy, and comfortingly spiced.',
    image: '/images/tteokbokki.jpg',
    japanese: 'トッポギ',
    tag: 'Spicy',
    color: 'from-red-900/30',
  },
  {
    title: 'Boba Tea',
    description:
      'Chilled creamy milk tea with chewy tapioca pearls. Sweet, refreshing, Gen-Z café favourite.',
    image: '/images/boba.jpg',
    japanese: 'ボバティー',
    tag: 'Refreshing',
    color: 'from-purple-900/30',
  },
  {
    title: 'Ramen',
    description:
      'Rich broth, chewy noodles, warm steam. Authentic pan-Asian flavours from mild to spicy.',
    image: '/images/Ramen.jpeg',
    japanese: 'ラーメン',
    tag: 'Signature',
    color: 'from-amber-900/30',
  },
  {
    title: 'Dango',
    description:
      'Traditional sweet rice dumplings on skewers. Soft, chewy, and beautifully classic.',
    image: '/images/dango.jpeg',
    japanese: '団子',
    tag: 'Sweet',
    color: 'from-pink-900/30',
  },
  {
    title: 'Japchae Bowl',
    description:
      'Korean glass noodles stir-fried with vegetables and savory sauce — smoky and satisfying.',
    image: '/images/japchae.jpg',
    japanese: 'チャプチェ',
    tag: 'Korean',
    color: 'from-green-900/30',
  },
];

/* 3-D tilt card */
function TiltCard({ item, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -22;
    setTilt({ x, y });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: tilt.y,
        rotateY: tilt.x,
        perspective: 800,
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="relative flex-shrink-0 w-72 md:w-80 cursor-pointer group"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-500 ${
          hovered ? 'border-accent/30 shadow-[0_30px_80px_rgba(255,122,61,0.15)]' : ''
        }`}
      >
        {/* Image */}
        <div className="relative h-80 overflow-hidden">
          <motion.img
            src={item.image}
            alt={`${item.title} – Takkeru Café`}
            loading="lazy"
            animate={{ scale: hovered ? 1.08 : 1.0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${item.color} via-transparent to-transparent opacity-80`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

          {/* Tag chip */}
          <span className="absolute top-4 left-4 px-3 py-1 bg-accent/90 text-primary font-bebas text-xs tracking-[0.2em] uppercase rounded-full">
            {item.tag}
          </span>

          {/* JP text */}
          <span className="absolute top-4 right-4 font-jp text-white/25 text-3xl leading-none rotate-90 origin-right">
            {item.japanese}
          </span>

          {/* Hover reveal */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-5"
          >
            <p className="text-subtle/80 text-sm font-inter leading-relaxed">{item.description}</p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="px-6 py-5 flex items-center justify-between">
          <h3 className="text-2xl font-bebas tracking-wide group-hover:text-accent transition-colors duration-400">
            {item.title}
          </h3>
          {/* Animated underline */}
          <div className="h-[1px] flex-1 mx-4 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ x: hovered ? '0%' : '-100%' }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-accent"
            />
          </div>
        </div>

        {/* 3-D shine overlay */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 - tilt.y * 2}%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function FoodSection() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  /* Mouse drag to scroll */
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    trackRef.current.style.cursor = 'grab';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      {/* Background textures */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/paper-fibers.png')]" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/images/halftone.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent font-jp tracking-[0.4em] block mb-4"
            >
              風味
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl"
            >
              Asian Flavors Beyond<br />The Frame
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-subtle/50 font-inter leading-relaxed italic border-l border-white/10 pl-6"
          >
            "We don't just serve food. We serve moments frozen in time, bringing a quiet cinematic escape right to your table."
          </motion.p>
        </div>

        {/* Drag hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mb-8 text-subtle/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="font-inter text-xs tracking-[0.25em] uppercase">Drag to explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>

      {/* Horizontal scrollable track — full width, no container clipping */}
      <style>{`
        .food-track { scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; }
        .food-track::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        className="food-track flex gap-6 overflow-x-auto pb-6 pr-12 scroll-smooth"
        style={{ cursor: 'grab' }}
      >
        {/* Left-align first card with the section container */}
        <div className="flex-shrink-0 w-6 md:w-12" />

        {SIGNATURE_ITEMS.map((item, i) => (
          <TiltCard key={item.title} item={item} index={i} />
        ))}

        {/* Spacer at end */}
        <div className="flex-shrink-0 w-6 md:w-12" />
      </div>
    </section>
  );
}
