import { motion } from 'framer-motion';

const PRODUCTS = [
  { name: "Takkeru Hoodie", category: "Apparel", image: "/images/hoodie.jpg" },
  { name: "Takkeru Key Chain", category: "Accessories", image: "/images/stickers.jpg" },
  { name: "The Takkeru Mug", category: "Lifestyle", image: "/images/mug.jpg" },
];

export default function ProductShowcase() {
  return (
    <section className="py-24 md:py-40 bg-primary">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-jp tracking-[0.4em] block mb-6"
          >
            商品
          </motion.span>
          <h2 className="text-5xl md:text-8xl">TAKKERU ORIGINALS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden mb-6 bg-white/[0.03] border border-white/5 rounded-sm">
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="bg-white text-primary px-4 py-2 font-bebas text-xl tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     VIEW ITEM
                   </div>
                </div>
              </div>
              <h4 className="text-xl font-bebas tracking-wider group-hover:text-accent transition-colors">{product.name}</h4>
              <p className="text-subtle/30 text-xs uppercase tracking-[0.2em]">{product.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
