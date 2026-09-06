import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, Flame, Leaf, AlertTriangle, ShoppingCart, ChevronDown } from 'lucide-react';
import { getProductById, PRODUCTS } from '../data/products';
import { formatPrice } from '../lib/cart';
import useCart from '../hooks/useCart';
import QuantityControl from '../components/cart/QuantityControl';

function StarRating({ rating, reviewCount }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`}
          />
        ))}
      </div>
      <span className="text-subtle/50 text-sm font-inter">{rating}</span>
      <span className="text-subtle/30 text-sm font-inter">({reviewCount} reviews)</span>
    </div>
  );
}

function SpiceIndicator({ level }) {
  if (level === 0) return null;
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Flame
          key={i}
          className={`w-3.5 h-3.5 ${i < level ? 'text-red-400 fill-red-400' : 'text-white/10'}`}
        />
      ))}
      <span className="text-subtle/40 text-xs font-inter ml-1">
        {level <= 2 ? 'Mild' : level <= 3 ? 'Medium' : 'Hot'}
      </span>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addItem, updateQuantity } = useCart();

  const product = getProductById(id);

  // Selection state for sizes and customizations
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [openCustomization, setOpenCustomization] = useState(null);

  if (!product) {
    return (
      <main className="min-h-screen bg-primary text-secondary relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10 flex flex-col items-center justify-center min-h-screen">
          <h1 className="font-bebas text-5xl md:text-6xl mb-4">PRODUCT NOT FOUND</h1>
          <p className="text-subtle/40 font-inter mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
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

  const cartItem = items.find((i) => i.productId === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Calculate price with size modifier
  const sizeModifier = product.sizes && product.sizes[selectedSize]
    ? product.sizes[selectedSize].priceModifier
    : 0;
  const currentPrice = product.price + sizeModifier;

  const relatedProducts = PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleCustomizationSelect = (label, option) => {
    setSelectedCustomizations((prev) => ({
      ...prev,
      [label]: option,
    }));
    setOpenCustomization(null);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: product.name,
    description: product.longDescription || product.description,
    image: `https://takkeru.com${product.image}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: String(currentPrice),
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(product.rating),
      reviewCount: String(product.reviewCount),
    },
  };

  return (
    <main className="min-h-screen bg-primary text-secondary relative overflow-hidden">
      <div className="grain-overlay" />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative JP text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 font-jp text-white/[0.03] text-[14rem] leading-none pointer-events-none select-none hidden lg:block">
        {product.japanese}
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-subtle/40 hover:text-accent transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-bebas tracking-[0.2em] text-lg uppercase">Back</span>
        </motion.button>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/5 shadow-[0_0_100px_rgba(255,122,61,0.1)]">
              <img
                src={product.image}
                alt={`${product.name} – TAKKERU CART`}
                className="w-full aspect-square object-cover"
                onError={(e) => { e.target.src = '/images/soon.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>

            {/* Tag badge */}
            <div className="absolute top-4 left-4 px-4 py-1.5 bg-accent/90 text-primary font-bebas text-xs tracking-[0.2em] uppercase rounded-full">
              {product.tag}
            </div>
          </motion.div>

          {/* Mandu Video */}
          {product.category === 'Mandu' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/5">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                >
                  <source src="/videos/mandu-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          )}

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category + JP name */}
            <div className="flex items-center gap-4 mb-3">
              <span className="text-accent font-jp tracking-[0.3em] text-sm uppercase">
                {product.japanese}
              </span>
              <span className="text-subtle/30 text-xs font-inter uppercase tracking-widest">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-bebas text-5xl md:text-7xl tracking-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mb-6">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="font-bebas text-4xl text-accent tracking-wide">
                {formatPrice(currentPrice)}
              </span>
              {sizeModifier > 0 && (
                <span className="text-subtle/30 text-sm font-inter ml-3">
                  ({formatPrice(product.price)} + {formatPrice(sizeModifier)} for {product.sizes[selectedSize].label})
                </span>
              )}
            </div>

            {/* Quick info chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {product.spiceLevel > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-full">
                  <SpiceIndicator level={product.spiceLevel} />
                </div>
              )}
              {product.prepTime && product.prepTime !== 'N/A' && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-subtle/40" />
                  <span className="text-subtle/50 text-xs font-inter">{product.prepTime}</span>
                </div>
              )}
              {product.isVegetarian && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                  <Leaf className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400 text-xs font-inter">Vegetarian</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-subtle/60 font-inter leading-relaxed mb-8">
              {product.longDescription}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bebas text-lg tracking-[0.1em] text-subtle/70 mb-3">SIZE</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(i)}
                      className={`px-5 py-2.5 rounded-xl font-bebas text-sm tracking-[0.1em] uppercase transition-all duration-300 border ${
                        selectedSize === i
                          ? 'bg-accent text-primary border-accent'
                          : 'bg-white/[0.03] text-subtle/50 border-white/10 hover:border-accent/40'
                      }`}
                    >
                      {size.label}
                      {size.priceModifier > 0 && (
                        <span className="text-xs ml-1 opacity-70">+{formatPrice(size.priceModifier)}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customizations */}
            {product.customizations && product.customizations.length > 0 && (
              <div className="mb-8 space-y-3">
                {product.customizations.map((custom) => (
                  <div key={custom.label} className="relative">
                    <button
                      onClick={() => setOpenCustomization(openCustomization === custom.label ? null : custom.label)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-left hover:border-accent/30 transition-colors duration-300"
                    >
                      <div>
                        <span className="font-bebas text-sm tracking-[0.1em] uppercase text-subtle/70">
                          {custom.label}
                        </span>
                        {selectedCustomizations[custom.label] && (
                          <span className="text-accent text-sm font-inter ml-3">
                            {selectedCustomizations[custom.label]}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-subtle/40 transition-transform duration-300 ${
                          openCustomization === custom.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openCustomization === custom.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-20 w-full mt-1 bg-surface border border-white/10 rounded-xl overflow-hidden shadow-lg"
                      >
                        {custom.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleCustomizationSelect(custom.label, option)}
                            className={`w-full px-4 py-3 text-left font-inter text-sm transition-colors duration-200 ${
                              selectedCustomizations[custom.label] === option
                                ? 'bg-accent/10 text-accent'
                                : 'text-subtle/60 hover:bg-white/[0.03] hover:text-subtle/80'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              {quantity > 0 ? (
                <QuantityControl
                  quantity={quantity}
                  onIncrease={() => updateQuantity(product.id, quantity + 1)}
                  onDecrease={() => updateQuantity(product.id, quantity - 1)}
                />
              ) : (
                <button
                  onClick={() => addItem(product.id)}
                  className="flex items-center gap-3 px-8 py-4 bg-accent text-primary font-bebas text-lg tracking-[0.15em] uppercase rounded-full hover:bg-white transition-colors duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              )}
            </div>

            {/* Broth Type (Ramen) */}
            {product.brothType && (
              <div className="mb-4">
                <h3 className="font-bebas text-lg tracking-[0.1em] text-subtle/70 mb-1">BROTH</h3>
                <p className="text-subtle/50 text-sm font-inter">{product.brothType}</p>
              </div>
            )}

            {/* Toppings (Ramen) */}
            {product.toppings && product.toppings.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bebas text-lg tracking-[0.1em] text-subtle/70 mb-2">TOPPINGS</h3>
                <div className="flex flex-wrap gap-2">
                  {product.toppings.map((topping) => (
                    <span
                      key={topping}
                      className="px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-subtle/50 text-xs font-inter"
                    >
                      {topping}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Filling Description (Mandu) */}
            {product.fillingDescription && (
              <div className="mb-4">
                <h3 className="font-bebas text-lg tracking-[0.1em] text-subtle/70 mb-1">FILLING</h3>
                <p className="text-subtle/50 text-sm font-inter">{product.fillingDescription}</p>
              </div>
            )}

            {/* Cooking Method (Mandu) */}
            {product.cookingMethod && (
              <div className="mb-4">
                <h3 className="font-bebas text-lg tracking-[0.1em] text-subtle/70 mb-1">COOKING</h3>
                <p className="text-subtle/50 text-sm font-inter">{product.cookingMethod}</p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bebas text-lg tracking-[0.1em] text-subtle/70 mb-3">INGREDIENTS</h3>
                <p className="text-subtle/50 text-sm font-inter leading-relaxed">
                  {product.ingredients.join(' · ')}
                </p>
              </div>
            )}

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <div className="flex items-start gap-2 px-4 py-3 bg-amber-500/5 border border-amber-500/15 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-400 text-xs font-inter font-medium uppercase tracking-wider mb-1">
                    Allergens
                  </p>
                  <p className="text-subtle/50 text-sm font-inter">
                    {product.allergens.join(', ')}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <h2 className="font-bebas text-3xl tracking-[0.1em] text-subtle/70 mb-8">
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((rp) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    navigate(`/product/${rp.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5 mb-4 bg-white/[0.03]">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = '/images/soon.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  </div>
                  <h4 className="font-bebas text-xl tracking-wide group-hover:text-accent transition-colors">
                    {rp.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bebas text-accent">{formatPrice(rp.price)}</span>
                    <span className="text-subtle/30 text-xs font-inter">{rp.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
