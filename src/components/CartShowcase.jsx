import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TABS = [
  {
    id: 'look',
    label: 'LOOK',
    title: 'BOLD. COMPACT. UNMISSABLE.',
    description: 'The TAKKERU Cart is designed to turn heads. Compact footprint, full kitchen setup, and a visual identity that stands out in any crowd.',
    features: ['Compact Footprint', 'Bold Brand Identity', 'Customer Counter', 'Full Kitchen'],
  },
  {
    id: 'menu',
    label: 'MENU',
    title: 'FOOD THAT SELLS ITSELF.',
    description: 'From signature ramen to boba tea and mandu — the TAKKERU menu is built for high-margin, fast-service street food.',
    features: ['Signature Ramen', 'Boba Tea', 'Mandu (Dumplings)', 'Tteokbokki'],
  },
  {
    id: 'business',
    label: 'BUSINESS',
    title: 'LOW COST. HIGH MARGIN.',
    description: 'The TAKKERU Cart model is designed for entrepreneurs who want to start lean and scale fast. No heavy rent, no large staff.',
    features: ['Low Startup Cost', 'Flexible Locations', 'Multiple Revenue Streams', 'Strong Brand'],
  },
  {
    id: 'setup',
    label: 'SETUP',
    title: 'WE BUILD. YOU SERVE.',
    description: 'From cart setup to menu configuration — the TAKKERU team helps you get operational fast. No prior food business experience required.',
    features: ['Cart Setup', 'Menu Config', 'Training', 'Ongoing Support'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const specVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function CartShowcase() {
  const [activeTab, setActiveTab] = useState('look');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const currentTab = TABS.find((t) => t.id === activeTab);

  return (
    <section id="cart" className="relative w-full bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div className="mb-16 md:mb-24" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} ref={ref}>
          <span className="font-jp block text-sm tracking-[0.3em] text-text-accent">
            カート
          </span>
          <h2 className="font-bebas mt-2 text-5xl leading-none tracking-tight text-text-primary md:text-7xl">
            MEET THE TAKKERU CART
          </h2>
          <div className="mt-4 h-[2px] w-24 bg-text-accent" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
          <motion.div className="relative overflow-hidden" variants={imageVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <img src="/images/cart-hero.png" alt="TAKKERU Cart — compact mobile food unit" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>

          <motion.div className="flex flex-col justify-center" variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="flex gap-2 mb-8">
              {TABS.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 font-bebas text-sm tracking-[0.15em] transition-all duration-300 ${activeTab === tab.id ? 'bg-accent text-white' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={currentTab.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <h3 className="font-bebas text-3xl md:text-4xl tracking-wide text-text-primary mb-4">
                  {currentTab.title}
                </h3>
                <p className="font-inter text-sm text-text-secondary leading-relaxed mb-6">
                  {currentTab.description}
                </p>
                <div className="space-y-3">
                  {currentTab.features.map((feature) => (
                    <div key={feature} className="border-l-[3px] border-text-accent bg-bg-secondary px-6 py-4">
                      <span className="font-bebas text-lg tracking-wide text-text-primary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
