import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { formatPrice } from '../lib/cart';
import { getProductById } from '../data/products';

const PRODUCTS = [
  { id: 'merch-figure', name: 'TAKKERU Figure', category: 'Collectibles', image: '/images/figure.jpg' },
  { id: 'merch-tshirt', name: 'TAKKERU T-Shirt', category: 'Apparel', image: '/images/tshirt.jpg' },
  { id: 'merch-poster', name: 'TAKKERU Poster', category: 'Art', image: '/images/poster.jpg' },
  { id: 'merch-keychain', name: 'TAKKERU Keychain', category: 'Accessories', image: '/images/keychain.jpg' },
];

export default function ProductShowcase() {
  const { addItem } = useCart();
  const navigate = useNavigate();
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div
                className="relative aspect-square overflow-hidden mb-4 bg-white/[0.03] border border-white/5 rounded-sm cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>
              <h4 className="text-sm sm:text-base lg:text-xl font-bebas tracking-wider group-hover:text-accent transition-colors">{product.name}</h4>
              <p className="text-subtle/30 text-[10px] sm:text-xs uppercase tracking-[0.2em]">{product.category}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bebas text-sm sm:text-base lg:text-lg text-accent tracking-wide">
                  {formatPrice(getProductById(product.id)?.price || 0)}
                </span>
                <button
                  onClick={() => addItem(product.id)}
                  className="px-3 py-1 sm:px-4 sm:py-1.5 bg-accent text-primary font-bebas text-[10px] sm:text-xs tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
