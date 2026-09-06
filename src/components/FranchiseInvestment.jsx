import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

const PACKAGES = [
  {
    id: 'starter',
    number: '01',
    name: 'STARTER',
    tagline: 'START SMALL',
    price: '₹65,000',
    priceValue: 65000,
    features: [
      'TAKKERU Cart',
      'Essential equipment',
      'TAKKERU branding',
      'Basic setup support',
      'Training',
      'Launch support',
    ],
    cta: 'GET STARTED →',
    recommended: false,
  },
  {
    id: 'standard',
    number: '02',
    name: 'STANDARD',
    tagline: 'BUILD BIGGER',
    price: '₹89,000',
    priceValue: 89000,
    features: [
      'TAKKERU Cart',
      'Equipment package',
      'TAKKERU branding',
      'Setup assistance',
      'Training',
      'Business support',
    ],
    cta: 'CHOOSE STANDARD →',
    recommended: true,
  },
  {
    id: 'premium',
    number: '03',
    name: 'PREMIUM',
    tagline: 'GO PREMIUM',
    price: '₹99,000',
    priceValue: 99000,
    features: [
      'Premium TAKKERU Cart setup',
      'Equipment package',
      'Premium branding',
      'Setup assistance',
      'Training',
      'Ongoing support',
    ],
    cta: 'GO PREMIUM →',
    recommended: false,
  },
];

const COMPARISON_ROWS = [
  { feature: 'TAKKERU Cart', starter: true, standard: true, premium: true },
  { feature: 'Equipment', starter: true, standard: true, premium: true },
  { feature: 'Branding', starter: true, standard: true, premium: true },
  { feature: 'Training', starter: true, standard: true, premium: true },
  { feature: 'Setup Support', starter: true, standard: true, premium: true },
  { feature: 'Business Support', starter: false, standard: true, premium: true },
];

function PackageCard({ pkg, index, inView }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col bg-cream border-2 transition-all duration-500 ${
        pkg.recommended
          ? 'border-accent shadow-[0_0_60px_rgba(214,40,40,0.25)] scale-[1.02] z-10'
          : isHovered
          ? 'border-accent/60 -translate-y-2'
          : 'border-charcoal/20'
      }`}
    >
      {/* Most Popular Badge */}
      {pkg.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-1.5 text-xs font-bebas tracking-[0.25em]">
          MOST POPULAR
        </div>
      )}

      {/* Card Content */}
      <div className="p-8 md:p-10 flex flex-col flex-1">
        {/* Package Number */}
        <span className="text-charcoal/20 font-bebas text-7xl md:text-8xl leading-none select-none">
          {pkg.number}
        </span>

        {/* Package Name & Tagline */}
        <div className="mt-4 mb-6">
          <span className="text-accent text-xs font-inter font-semibold tracking-[0.3em] block mb-2">
            {pkg.tagline}
          </span>
          <h3 className="text-4xl md:text-5xl font-bebas text-primary tracking-tight">
            {pkg.name}
          </h3>
        </div>

        {/* Price */}
        <div className="mb-8">
          <span className="text-5xl md:text-6xl font-bebas text-primary">
            {pkg.price}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-charcoal/10 mb-8" />

        {/* Features */}
        <ul className="space-y-4 flex-1 mb-8">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" strokeWidth={3} />
              <span className="text-charcoal/70 font-inter text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
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

function ComparisonTable({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-20"
    >
      <h3 className="text-3xl md:text-4xl font-bebas text-center mb-10 text-primary">
        WHAT'S INCLUDED
      </h3>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden border border-charcoal/10">
        <table className="w-full">
          <thead>
            <tr className="bg-primary">
              <th className="text-left py-4 px-6 text-white font-bebas text-lg tracking-wider">
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
                <td className="py-4 px-6 text-primary font-inter text-sm font-medium">
                  {row.feature}
                </td>
                <td className="py-4 px-6 text-center">
                  {row.starter ? (
                    <Check className="w-5 h-5 text-accent mx-auto" strokeWidth={3} />
                  ) : (
                    <span className="text-charcoal/20">—</span>
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {row.standard ? (
                    <Check className="w-5 h-5 text-accent mx-auto" strokeWidth={3} />
                  ) : (
                    <span className="text-charcoal/20">—</span>
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {row.premium ? (
                    <Check className="w-5 h-5 text-accent mx-auto" strokeWidth={3} />
                  ) : (
                    <span className="text-charcoal/20">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="md:hidden space-y-4">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`border-2 p-6 ${
              pkg.recommended
                ? 'border-accent bg-accent/5'
                : 'border-charcoal/10 bg-white'
            }`}
          >
            <h4 className="text-2xl font-bebas text-primary mb-4">{pkg.name}</h4>
            <ul className="space-y-3">
              {COMPARISON_ROWS.map((row) => (
                <li key={row.feature} className="flex items-center justify-between">
                  <span className="text-charcoal/70 font-inter text-sm">{row.feature}</span>
                  {row[pkg.id] ? (
                    <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                  ) : (
                    <span className="text-charcoal/20 text-sm">—</span>
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

export default function FranchiseInvestment() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="investment" className="relative py-24 md:py-32 bg-cream overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(charcoal 1px, transparent 1px), linear-gradient(90deg, charcoal 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Japanese Watermark */}
      <div className="absolute inset-x-0 top-12 hidden md:block text-[12rem] font-jp text-primary/[0.03] leading-none select-none pointer-events-none">
        投資
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
            投資
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas text-primary tracking-tight leading-[0.9]">
            YOUR INVESTMENT.<br />
            YOUR TAKKERU.
          </h2>
          <p className="mt-6 text-charcoal/60 text-lg font-inter leading-relaxed max-w-xl mx-auto">
            <strong>Choose the TAKKERU Cart model that fits your ambition, budget, and location.</strong>
          </p>
        </motion.div>

        {/* Package Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} inView={inView} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <ComparisonTable inView={inView} />
        </div>
      </div>
    </section>
  );
}
