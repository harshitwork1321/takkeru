import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = [
  { 
    id: 'ramen',
    name: "Ramen", 
    jp: "ラーメン",
    price: "₹389 – ₹629", 
    desc: "A comforting noodle bowl served in rich flavorful broth with chewy noodles, toppings, and warm steam. Takkeru Café serves noodles with authentic pan-Asian flavors ranging from mild to spicy.",
    img: "/images/Ramen.jpeg",
    hasSteam: true
  },
  { 
    id: 'boba',
    name: "Boba Tea", 
    jp: "ボバティー",
    price: "₹299", 
    desc: "A chilled creamy milk tea drink served with chewy tapioca pearls, creating a sweet refreshing café-style beverage popular among Gen-Z and anime café culture.", 
    img: "/images/boba.jpg"
  },
  { 
    id: 'tteokbokki',
    name: "Tteokbokki Bowl", 
    jp: "トッポギ",
    price: "₹479", 
    desc: "A Korean street-food inspired dish made with chewy rice cakes coated in spicy savory sauce. Bold flavor with soft chewy texture and comforting spice.", 
    img: "/images/tteokbokki.jpg"
  },
  { 
    id: 'dango',
    name: "Dango", 
    jp: "団子",
    price: "₹389", 
    desc: "Traditional sweet rice dumplings served on skewers with a soft, chewy texture.",
    img: "/images/dango.jpeg"
  },
  { 
    id: 'japchae',
    name: "Japchae Bowl", 
    jp: "チャプチェ",
    price: "₹489", 
    desc: "Korean-style sweet potato glass noodles stir-fried with vegetables and savory sauce, offering smoky flavor and chewy texture.", 
    img: "/images/japchae.jpg"
  },
];

const Steam = () => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        initial={{ y: 40, opacity: 0, scale: 0.5 }}
        animate={{ 
          y: -100, 
          opacity: [0, 0.4, 0],
          scale: [0.5, 1.5, 2],
          x: [0, (i - 2) * 20, 0]
        }}
        transition={{ 
          duration: 3 + i, 
          repeat: Infinity, 
          delay: i * 1,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-8 h-20 bg-white/20 blur-xl rounded-full"
      />
    ))}
  </div>
);

export default function Menu() {
  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      {/* Decorative manga lines & halftone */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,white_20px,white_21px)]" />
      </div>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/halftone.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-accent font-jp tracking-[0.6em] block mb-6 text-sm uppercase"
          >
            本物の味
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl mb-8 tracking-tighter"
          >
            FEATURED MENU
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-subtle/40 font-inter max-w-xl mx-auto italic"
          >
            Bold Asian flavors curated with cinematic precision, designed exclusively for Delhi's true food lovers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
          {MENU_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative flex flex-col md:flex-row gap-8 items-center bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-accent/20 transition-all duration-700"
            >
              {/* Image Container */}
              <div className="relative w-full md:w-56 h-56 flex-shrink-0 overflow-hidden rounded-xl bg-primary">
                {item.hasSteam && <Steam />}
                <img 
                  src={item.img} 
                  alt={item.name} 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60" />
                <span className="absolute top-4 left-4 font-jp text-[10px] text-accent/60 tracking-widest uppercase">
                  {item.jp}
                </span>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl md:text-4xl font-bebas tracking-wide group-hover:text-accent transition-colors duration-500">
                    {item.name}
                  </h3>
                  <span className="text-accent font-bebas text-2xl ml-4 whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-subtle/60 text-sm font-inter leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="w-12 h-[1px] bg-white/10 group-hover:w-24 group-hover:bg-accent transition-all duration-500" />
              </div>

              {/* Manga Texture Background Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] pointer-events-none transition-opacity duration-700 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
