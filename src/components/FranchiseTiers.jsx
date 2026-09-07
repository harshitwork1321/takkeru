import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ArrowRight } from 'lucide-react';

const TIERS = [
  {
    name: 'STARTER',
    tagline: 'START SMALL',
    price: '₹65,000',
    priceValue: 65000,
    priceShort: '₹65K',
    cta: 'GET STARTED →',
    recommended: false,
  },
  {
    name: 'STANDARD',
    tagline: 'BUILD BIGGER',
    price: '₹89,000',
    priceValue: 89000,
    priceShort: '₹89K',
    cta: 'CHOOSE STANDARD →',
    recommended: true,
  },
  {
    name: 'PREMIUM',
    tagline: 'GO PREMIUM',
    price: '₹99,000',
    priceValue: 99000,
    priceShort: '₹99K',
    cta: 'GO PREMIUM →',
    recommended: false,
  },
];

const INCLUSIONS = [
  'Cart / equipment included',
  'TAKKERU branding',
  'Menu setup',
  'Training',
  'Operational support',
];

function getRecommendation(val) {
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 65000) return null;
  if (n < 89000) return TIERS[0];
  if (n < 99000) return TIERS[1];
  return TIERS[2];
}

function PackageCard({ pkg, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`relative flex flex-col border-2 transition-all duration-500 ${
        pkg.recommended
          ? 'border-accent shadow-[0_0_60px_rgba(214,40,40,0.25)] scale-[1.03] z-10 bg-white'
          : 'border-charcoal/20 bg-white hover:border-accent/60 hover:-translate-y-2'
      }`}
    >
      {pkg.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-1.5 text-xs font-bebas tracking-[0.25em]">
          MOST POPULAR
        </div>
      )}

      <div className="p-8 md:p-10 flex flex-col flex-1">
        <span className="text-charcoal/15 font-bebas text-7xl md:text-8xl leading-none select-none">
          0{index + 1}
        </span>

        <div className="mt-4 mb-6">
          <span className="text-accent text-xs font-inter font-semibold tracking-[0.3em] block mb-2">
            {pkg.tagline}
          </span>
          <h3 className="text-4xl md:text-5xl font-bebas text-primary tracking-tight">
            {pkg.name}
          </h3>
        </div>

        <div className="mb-8">
          <span className="text-5xl md:text-6xl font-bebas text-primary">
            {pkg.price}
          </span>
        </div>

        <div className="w-full h-[1px] bg-charcoal/10 mb-8" />

        <ul className="space-y-4 flex-1 mb-8">
          {INCLUSIONS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" strokeWidth={3} />
              <span className="text-charcoal/70 font-inter text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <motion.a
          href="https://tally.so/r/XxaDyj"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`inline-flex items-center justify-center gap-3 w-full py-4 text-sm font-bebas tracking-[0.2em] transition-all duration-300 ${
            pkg.recommended
              ? 'bg-accent text-white hover:bg-primary'
              : 'bg-primary text-white hover:bg-accent'
          }`}
        >
          {pkg.cta}
        </motion.a>
      </div>
    </motion.div>
  );
}

function Calculator() {
  const [amount, setAmount] = useState('');
  const recommendation = getRecommendation(amount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-20 max-w-2xl mx-auto"
    >
      <h3 className="text-3xl md:text-4xl font-bebas text-primary text-center mb-3">
        WHICH MODEL FITS YOU?
      </h3>
      <p className="text-charcoal/50 font-inter text-sm text-center mb-8">
        Enter your available investment and we'll recommend the right model.
      </p>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-sm">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/40 font-bebas text-2xl">
            ₹
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="65,000"
            min="0"
            className="w-full pl-12 pr-5 py-5 bg-white border-2 border-charcoal/15 text-primary font-bebas text-3xl tracking-wider focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {recommendation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm text-center"
          >
            <p className="text-charcoal/50 font-inter text-xs tracking-[0.2em] uppercase mb-2">
              Your budget → Recommended model
            </p>
            <p className="text-4xl font-bebas text-accent mb-6">
              {recommendation.name} — {recommendation.price}
            </p>
            <a
              href="https://tally.so/r/XxaDyj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 font-bebas text-lg tracking-[0.2em] hover:bg-primary transition-colors duration-300"
            >
              START YOUR TAKKERU
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        )}

        {!recommendation && amount && parseInt(amount, 10) < 65000 && (
          <p className="text-charcoal/40 font-inter text-sm">
            Enter at least ₹65,000 to see a recommendation.
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function FranchiseTiers() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="franchise" className="relative py-24 md:py-32 bg-cream overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(charcoal 1px, transparent 1px), linear-gradient(90deg, charcoal 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-x-0 top-12 hidden md:block text-[12rem] font-jp text-primary/[0.03] leading-none select-none pointer-events-none">
        投資
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-jp tracking-[0.4em] block mb-4 text-sm uppercase">
            投資
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas text-primary tracking-tight leading-[0.9]">
            YOUR INVESTMENT.<br />
            YOUR TAKKERU.
          </h2>
          <p className="mt-6 text-charcoal/60 text-lg font-inter leading-relaxed max-w-xl mx-auto">
            <strong>Choose the TAKKERU Cart model that fits your starting budget and business plan.</strong>
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {TIERS.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} inView={inView} />
          ))}
        </div>

        <Calculator />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center text-charcoal/40 font-inter text-xs leading-relaxed max-w-2xl mx-auto"
        >
          Investment figures shown are package prices. Additional operating expenses may apply depending on location, permissions, setup, inventory, staffing and other requirements.
        </motion.p>
      </div>
    </section>
  );
}