import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Minus } from 'lucide-react';

const PACKAGES = [
  {
    id: 'starter',
    number: '01',
    label: 'STARTER',
    name: 'BOBA TEA CART',
    price: '₹65,000',
    menu: 'BOBA TEA',
    menuJp: 'ボバティー',
    description: "Start with TAKKERU's signature Boba Tea cart concept.",
    products: ['boba-tea'],
    images: ['/images/boba.jpg'],
  },
  {
    id: 'standard',
    number: '02',
    label: 'STANDARD',
    name: 'BOBA + MANDU CART',
    price: '₹89,000',
    menu: 'BOBA TEA + MANDU',
    menuJp: 'ボバティー + マンドゥ',
    description: 'A bigger menu with Boba Tea and Mandu.',
    products: ['boba-tea', 'mandu'],
    images: ['/images/boba.jpg', '/images/mandu.jpg'],
    recommended: true,
  },
  {
    id: 'premium',
    number: '03',
    label: 'PREMIUM',
    name: 'FULL TAKKERU CART',
    price: '₹99,000',
    menu: 'BOBA TEA + RAMEN + MANDU',
    menuJp: 'ボバティー + ラーメン + マンドゥ',
    description: 'The complete TAKKERU Cart menu experience.',
    products: ['boba-tea', 'ramen-signature', 'mandu'],
    images: ['/images/boba.jpg', '/images/Ramen.jpeg', '/images/mandu.jpg'],
  },
];

const COMPARISON_ROWS = [
  { feature: 'Investment', starter: '₹65,000', standard: '₹89,000', premium: '₹99,000' },
  { feature: 'Boba Tea', starter: true, standard: true, premium: true },
  { feature: 'Mandu', starter: false, standard: true, premium: true },
  { feature: 'Ramen', starter: false, standard: false, premium: true },
];

function PackageCard({ pkg, isSelected, onSelect, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onClick={() => onSelect(pkg.id)}
      className={`relative flex flex-col cursor-pointer transition-all duration-500 ${
        isSelected
          ? 'border-[3px] border-accent shadow-[0_0_80px_rgba(214,40,40,0.3)] scale-[1.02] z-10'
          : 'border-2 border-charcoal/15 hover:border-accent/40 hover:-translate-y-2'
      }`}
    >
      {/* MOST POPULAR Badge */}
      {pkg.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-accent text-white px-6 py-1.5 text-xs font-bebas tracking-[0.25em]">
          MOST POPULAR
        </div>
      )}

      {/* Product Images Area */}
      <div className="relative h-52 md:h-60 overflow-hidden bg-charcoal/5">
        <div className={`flex h-full ${pkg.images.length === 1 ? 'justify-center' : 'items-center justify-center gap-2 p-4'}`}>
          {pkg.images.map((img, i) => (
            <div
              key={img}
              className={`${pkg.images.length === 1 ? 'w-full h-full' : 'w-[45%] h-[80%]'} overflow-hidden`}
            >
              <img
                src={img}
                alt={pkg.products[i]}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* Number overlay */}
        <span className="absolute top-4 left-4 text-white/80 font-bebas text-6xl md:text-7xl leading-none select-none drop-shadow-lg">
          {pkg.number}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6 md:p-8 flex flex-col flex-1 bg-white">
        {/* Label */}
        <span className="text-accent text-[10px] font-inter font-semibold tracking-[0.3em] block mb-1">
          {pkg.number} / {pkg.label}
        </span>

        {/* Package Name */}
        <h3 className="text-2xl md:text-3xl font-bebas text-primary tracking-tight mb-3">
          {pkg.name}
        </h3>

        {/* Price */}
        <span className="text-4xl md:text-5xl font-bebas text-primary block mb-5">
          {pkg.price}
        </span>

        {/* Menu */}
        <div className="mb-5">
          <span className="text-[10px] font-inter font-semibold tracking-[0.3em] text-charcoal/40 block mb-1">
            MENU
          </span>
          <span className="text-lg font-bebas text-primary tracking-wide">
            {pkg.menu}
          </span>
          <span className="block font-jp text-accent text-xs tracking-widest mt-0.5">
            {pkg.menuJp}
          </span>
        </div>

        {/* Description */}
        <p className="text-charcoal/60 font-inter text-sm leading-relaxed mb-6 flex-1">
          {pkg.description}
        </p>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 text-sm font-bebas tracking-[0.2em] transition-all duration-300 ${
            isSelected
              ? 'bg-accent text-white'
              : 'bg-primary text-white hover:bg-accent'
          }`}
        >
          {isSelected ? 'SELECTED' : `CHOOSE ${pkg.label} →`}
        </motion.button>
      </div>
    </motion.div>
  );
}

function SummaryPanel({ selectedId }) {
  const pkg = PACKAGES.find((p) => p.id === selectedId);
  if (!pkg) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pkg.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-primary text-white p-8 md:p-12 max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span className="font-jp text-white/40 tracking-[0.4em] block mb-3 text-sm">
            選択
          </span>
          <h3 className="text-4xl md:text-5xl font-bebas tracking-tight">
            YOUR TAKKERU
          </h3>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-t border-white/10 pt-8">
          <div>
            <span className="text-white/40 text-[10px] font-inter font-semibold tracking-[0.3em] block mb-2">
              CART
            </span>
            <span className="text-2xl font-bebas text-white">
              {pkg.label}
            </span>
          </div>
          <div>
            <span className="text-white/40 text-[10px] font-inter font-semibold tracking-[0.3em] block mb-2">
              INVESTMENT
            </span>
            <span className="text-3xl font-bebas text-accent">
              {pkg.price}
            </span>
          </div>
          <div>
            <span className="text-white/40 text-[10px] font-inter font-semibold tracking-[0.3em] block mb-2">
              MENU
            </span>
            <span className="text-lg font-bebas text-white block">
              {pkg.menu}
            </span>
            <span className="font-jp text-white/40 text-xs tracking-widest">
              {pkg.menuJp}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-white/10 pt-8">
          <span className="text-white/50 font-inter text-sm block mb-4">
            READY TO START?
          </span>
          <a
            href="https://tally.so/r/XxaDyj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-accent text-white px-12 py-5 font-bebas text-xl tracking-[0.2em] hover:bg-white hover:text-primary transition-all duration-500"
          >
            START YOUR TAKKERU →
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ComparisonTable({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-16 max-w-3xl mx-auto"
    >
      <h3 className="text-3xl md:text-4xl font-bebas text-primary text-center mb-8">
        COMPARE PACKAGES
      </h3>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden border-2 border-charcoal/15">
        <table className="w-full">
          <thead>
            <tr className="bg-primary">
              <th className="text-left py-4 px-6 text-white font-bebas text-lg tracking-wider w-1/3">
                FEATURE
              </th>
              <th className="text-center py-4 px-6 text-white font-bebas text-lg tracking-wider">
                STARTER
              </th>
              <th className="text-center py-4 px-6 text-white font-bebas text-lg tracking-wider">
                STANDARD
              </th>
              <th className="text-center py-4 px-6 text-white font-bebas text-lg tracking-wider">
                PREMIUM
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr
                key={row.feature}
                className={`border-t border-charcoal/10 ${
                  i % 2 === 0 ? 'bg-cream' : 'bg-white'
                }`}
              >
                <td className="py-4 px-6 text-primary font-bebas text-lg tracking-wide">
                  {row.feature}
                </td>
                <td className="py-4 px-6 text-center">
                  {typeof row.starter === 'string' ? (
                    <span className="text-primary font-bebas text-lg">{row.starter}</span>
                  ) : row.starter ? (
                    <Check className="w-5 h-5 text-accent mx-auto" strokeWidth={3} />
                  ) : (
                    <Minus className="w-4 h-4 text-charcoal/20 mx-auto" />
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {typeof row.standard === 'string' ? (
                    <span className="text-primary font-bebas text-lg">{row.standard}</span>
                  ) : row.standard ? (
                    <Check className="w-5 h-5 text-accent mx-auto" strokeWidth={3} />
                  ) : (
                    <Minus className="w-4 h-4 text-charcoal/20 mx-auto" />
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {typeof row.premium === 'string' ? (
                    <span className="text-primary font-bebas text-lg">{row.premium}</span>
                  ) : row.premium ? (
                    <Check className="w-5 h-5 text-accent mx-auto" strokeWidth={3} />
                  ) : (
                    <Minus className="w-4 h-4 text-charcoal/20 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked */}
      <div className="md:hidden space-y-4">
        {PACKAGES.map((pkg) => (
          <div key={pkg.id} className="border-2 border-charcoal/15 p-6 bg-white">
            <h4 className="text-xl font-bebas text-primary mb-3">{pkg.label}</h4>
            <ul className="space-y-2">
              {COMPARISON_ROWS.map((row) => (
                <li key={row.feature} className="flex items-center justify-between">
                  <span className="text-charcoal/60 font-inter text-sm">{row.feature}</span>
                  {typeof row[pkg.id] === 'string' ? (
                    <span className="text-primary font-bebas">{row[pkg.id]}</span>
                  ) : row[pkg.id] ? (
                    <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                  ) : (
                    <Minus className="w-3 h-3 text-charcoal/20" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function FranchiseTiers() {
  const [selected, setSelected] = useState('standard');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="investment" className="relative py-24 md:py-32 bg-cream overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(charcoal 1px, transparent 1px), linear-gradient(90deg, charcoal 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Japanese Watermark */}
      <div className="absolute inset-x-0 top-12 hidden md:block text-[12rem] font-jp text-primary/[0.03] leading-none select-none pointer-events-none">
        選択
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-jp tracking-[0.4em] block mb-4 text-sm uppercase">
            選択
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas text-primary tracking-tight leading-[0.9]">
            CHOOSE YOUR<br />
            TAKKERU CART
          </h2>
          <p className="mt-6 text-charcoal/60 text-lg font-inter leading-relaxed max-w-xl mx-auto">
            <strong>Choose your investment. Choose your menu. Build your TAKKERU.</strong>
          </p>
        </motion.div>

        {/* Package Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {PACKAGES.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              isSelected={selected === pkg.id}
              onSelect={setSelected}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* YOUR TAKKERU Summary */}
        <div className="mt-12">
          <SummaryPanel selectedId={selected} />
        </div>

        {/* Comparison Table */}
        <ComparisonTable inView={inView} />

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center text-charcoal/40 font-inter text-xs leading-relaxed max-w-2xl mx-auto"
        >
          Package prices shown are based on the current TAKKERU Cart package information. Additional operating, location, permissions, inventory, staffing or other business expenses may apply depending on the setup.
        </motion.p>
      </div>
    </section>
  );
}
