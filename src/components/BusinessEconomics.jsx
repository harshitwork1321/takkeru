import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PRODUCTS } from '../data/products';

const PRODUCT_PRICES = PRODUCTS.map(p => ({
  name: p.name,
  price: p.price,
  category: p.category,
}));

const INPUT_COSTS = [
  { item: 'Boba ingredients', cost: '₹25-35/cup' },
  { item: 'Ramen broth & noodles', cost: '₹35-45/bowl' },
  { item: 'Mandu filling', cost: '₹15-20/pc' },
  { item: 'Tteokbokki rice cakes', cost: '₹40-50/bowl' },
  { item: 'Packaging (cups/bowls)', cost: '₹7-12/piece' },
];

const PACKAGING_COSTS = [
  { size: '250 ML', cost: '₹7', unit: 'piece' },
  { size: '500 ML', cost: '₹8.50', unit: 'piece' },
  { size: 'Bowl (Mandu)', cost: '₹10', unit: 'piece' },
  { size: 'Large Bowl (Ramen)', cost: '₹12', unit: 'piece' },
];

function MetricBlock({ label, value, sublabel, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-charcoal border border-white/10 p-6 md:p-8"
    >
      <span className="text-accent text-[10px] font-inter font-semibold tracking-[0.3em] block mb-3">
        {label}
      </span>
      <div className="text-3xl md:text-4xl font-bebas text-cream mb-2">
        {value}
      </div>
      {sublabel && (
        <span className="text-muted text-xs font-inter">{sublabel}</span>
      )}
    </motion.div>
  );
}

function UnitEconomicsDisplay({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="bg-charcoal border border-white/10 p-6 md:p-8"
    >
      <span className="text-accent text-[10px] font-inter font-semibold tracking-[0.3em] block mb-4">
        UNIT ECONOMICS
      </span>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-cream/60 font-inter text-sm">SELLING PRICE</span>
          <span className="text-cream font-bebas text-xl">₹89-479</span>
        </div>
        
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-cream/60 font-inter text-sm">RAW MATERIAL</span>
          <span className="text-accent font-bebas text-xl">- ₹25-50</span>
        </div>
        
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-cream/60 font-inter text-sm">PACKAGING</span>
          <span className="text-accent font-bebas text-xl">- ₹7-12</span>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <span className="text-cream font-inter text-sm font-semibold">GROSS CONTRIBUTION</span>
          <span className="text-gold font-bebas text-2xl">₹57-417</span>
        </div>
      </div>
      
      <p className="text-muted text-[10px] font-inter mt-4 leading-relaxed">
        ILLUSTRATIVE GROSS CONTRIBUTION
      </p>
    </motion.div>
  );
}

function Calculator({ inView }) {
  const [sellingPrice, setSellingPrice] = useState(65000);
  const [rawMaterialCost, setRawMaterialCost] = useState(50000);
  const [packagingCost, setPackagingCost] = useState(1500);
  const [unitsSold, setUnitsSold] = useState(25000);

  const contributionPerUnit = useMemo(() => {
    return sellingPrice - rawMaterialCost - packagingCost;
  }, [sellingPrice, rawMaterialCost, packagingCost]);

  const estimatedGrossContribution = useMemo(() => {
    return contributionPerUnit * unitsSold;
  }, [contributionPerUnit, unitsSold]);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="bg-charcoal border border-white/10 p-6 md:p-8"
    >
      <span className="text-accent text-[10px] font-inter font-semibold tracking-[0.3em] block mb-6">
        INTERACTIVE CALCULATOR
      </span>

      <div className="space-y-6">
        {/* Selling Price */}
        <div>
          <label className="text-cream/60 font-inter text-xs block mb-2">
            SELLING PRICE
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-inter">₹</span>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full bg-primary border border-white/10 text-cream font-bebas text-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Raw Material Cost */}
        <div>
          <label className="text-cream/60 font-inter text-xs block mb-2">
            RAW MATERIAL COST
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-inter">₹</span>
            <input
              type="number"
              value={rawMaterialCost}
              onChange={(e) => setRawMaterialCost(Number(e.target.value))}
              className="w-full bg-primary border border-white/10 text-cream font-bebas text-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Packaging Cost */}
        <div>
          <label className="text-cream/60 font-inter text-xs block mb-2">
            PACKAGING COST
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-inter">₹</span>
            <input
              type="number"
              value={packagingCost}
              onChange={(e) => setPackagingCost(Number(e.target.value))}
              className="w-full bg-primary border border-white/10 text-cream font-bebas text-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Units Sold */}
        <div>
          <label className="text-cream/60 font-inter text-xs block mb-2">
            UNITS SOLD
          </label>
          <input
            type="number"
            value={unitsSold}
            onChange={(e) => setUnitsSold(Number(e.target.value))}
            className="w-full bg-primary border border-white/10 text-cream font-bebas text-2xl pl-4 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Results */}
        <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-cream/60 font-inter text-sm">CONTRIBUTION / UNIT</span>
            <motion.span
              key={contributionPerUnit}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-cream font-bebas text-2xl"
            >
              {formatCurrency(contributionPerUnit)}
            </motion.span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-cream font-inter text-sm font-semibold">ESTIMATED GROSS CONTRIBUTION</span>
            <motion.span
              key={estimatedGrossContribution}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-gold font-bebas text-3xl"
            >
              {formatCurrency(estimatedGrossContribution)}
            </motion.span>
          </div>
        </div>

        <p className="text-muted text-[10px] font-inter leading-relaxed">
          Illustrative calculation only. Actual operating costs, rent, labour, utilities, taxes, wastage, delivery fees and other expenses are not included unless explicitly shown.
        </p>
      </div>
    </motion.div>
  );
}

function BreakEvenCalculator({ inView }) {
  const [fixedCosts, setFixedCosts] = useState(50000);
  const [contributionPerProduct, setContributionPerProduct] = useState(12);

  const breakEvenUnits = useMemo(() => {
    if (contributionPerProduct <= 0) return 0;
    return Math.ceil(fixedCosts / contributionPerProduct);
  }, [fixedCosts, contributionPerProduct]);

  const breakEvenDaily = useMemo(() => {
    return Math.ceil(breakEvenUnits / 30);
  }, [breakEvenUnits]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.6 }}
      className="bg-charcoal border border-white/10 p-6 md:p-8"
    >
      <span className="text-accent text-[10px] font-inter font-semibold tracking-[0.3em] block mb-2">
        BREAK-EVEN
      </span>
      <h4 className="text-2xl font-bebas text-cream mb-6">KNOW YOUR NUMBERS.</h4>

      <div className="space-y-6">
        {/* Monthly Fixed Costs */}
        <div>
          <label className="text-cream/60 font-inter text-xs block mb-2">
            MONTHLY FIXED COSTS
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-inter">₹</span>
            <input
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="w-full bg-primary border border-white/10 text-cream font-bebas text-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Contribution Per Product */}
        <div>
          <label className="text-cream/60 font-inter text-xs block mb-2">
            CONTRIBUTION PER PRODUCT
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-inter">₹</span>
            <input
              type="number"
              value={contributionPerProduct}
              onChange={(e) => setContributionPerProduct(Number(e.target.value))}
              className="w-full bg-primary border border-white/10 text-cream font-bebas text-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Formula Display */}
        <div className="bg-primary border border-white/5 p-4 text-center">
          <span className="text-muted font-inter text-xs block mb-2">FORMULA</span>
          <span className="text-cream font-inter text-sm">
            Break-even units = Monthly Fixed Costs ÷ Contribution Per Product
          </span>
        </div>

        {/* Results */}
        <div className="border-t border-white/10 pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-cream/60 font-inter text-sm">BREAK-EVEN VOLUME</span>
            <motion.span
              key={breakEvenUnits}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-cream font-bebas text-2xl"
            >
              {formatNumber(breakEvenUnits)} units / month
            </motion.span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-cream/60 font-inter text-sm">DAILY TARGET</span>
            <motion.span
              key={breakEvenDaily}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-gold font-bebas text-3xl"
            >
              {formatNumber(breakEvenDaily)} units / day
            </motion.span>
          </div>
        </div>

        <p className="text-muted text-[10px] font-inter leading-relaxed">
          ESTIMATE BASED ON YOUR INPUTS. This is not a guaranteed business result.
        </p>
      </div>
    </motion.div>
  );
}

export default function BusinessEconomics() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="economics" className="relative py-24 md:py-32 bg-primary overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Section Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-accent font-jp tracking-[0.4em] block mb-4 text-sm uppercase">
            経済
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas text-cream tracking-tight leading-[0.9]">
            BUILT FOR A BUSINESS<br />
            MODEL THAT CAN SCALE.
          </h2>
          <p className="mt-6 text-cream/50 text-lg font-inter leading-relaxed max-w-2xl mx-auto">
            <strong>Understand the economics behind your TAKKERU Cart — from product pricing and input costs to packaging and example unit economics.</strong>
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Product Prices */}
          <MetricBlock
            label="PRODUCT PRICE"
            value="₹89-479"
            sublabel="Verified selling prices"
            delay={0}
            inView={inView}
          />

          {/* Raw Material Cost */}
          <MetricBlock
            label="INPUT COST"
            value="₹15-50"
            sublabel="Raw material per unit"
            delay={0.1}
            inView={inView}
          />

          {/* Packaging Cost */}
          <MetricBlock
            label="PACKAGING COST"
            value="₹7-12"
            sublabel="Per piece"
            delay={0.2}
            inView={inView}
          />

          {/* Unit Economics */}
          <UnitEconomicsDisplay inView={inView} />
        </div>

        {/* Detailed Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-charcoal border border-white/10 p-6 md:p-8"
          >
            <span className="text-accent text-[10px] font-inter font-semibold tracking-[0.3em] block mb-6">
              SELLING PRICES
            </span>
            <div className="space-y-4">
              {PRODUCT_PRICES.map((product) => (
                <div key={product.name} className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <span className="text-cream font-inter text-sm block">{product.name}</span>
                    <span className="text-muted font-inter text-[10px]">{product.category}</span>
                  </div>
                  <span className="text-cream font-bebas text-xl">₹{product.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Input Costs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-charcoal border border-white/10 p-6 md:p-8"
          >
            <span className="text-accent text-[10px] font-inter font-semibold tracking-[0.3em] block mb-6">
              INPUT COSTS
            </span>
            <div className="space-y-4">
              {INPUT_COSTS.map((item) => (
                <div key={item.item} className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-cream font-inter text-sm">{item.item}</span>
                  <span className="text-cream font-bebas text-lg">{item.cost}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Packaging Costs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-charcoal border border-white/10 p-6 md:p-8 mb-16 max-w-2xl mx-auto"
        >
          <span className="text-accent text-[10px] font-inter font-semibold tracking-[0.3em] block mb-6">
            PACKAGING COST
          </span>
          <div className="grid grid-cols-2 gap-4">
            {PACKAGING_COSTS.map((item) => (
              <div key={item.size} className="bg-primary border border-white/5 p-4">
                <span className="text-cream/60 font-inter text-xs block mb-1">{item.size}</span>
                <span className="text-cream font-bebas text-2xl">{item.cost}</span>
                <span className="text-muted font-inter text-[10px]"> / {item.unit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Calculator inView={inView} />
          <BreakEvenCalculator inView={inView} />
        </div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-charcoal border border-white/10 p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <span className="text-accent text-[10px] font-inter font-semibold tracking-[0.3em] block mb-4">
            NO HYPE. JUST NUMBERS.
          </span>
          <p className="text-cream/60 font-inter text-sm leading-relaxed">
            Your actual results depend on location, pricing, footfall, operating hours, food costs, labour, rent, wastage, marketing and other business expenses. Use the calculator to test your own assumptions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
