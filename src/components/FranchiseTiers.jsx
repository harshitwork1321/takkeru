import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const TIERS = [
  {
    name: 'STARTER',
    tagline: 'MICRO CART',
    subtitle: 'Ideal for testing the waters',
    features: [
      'Compact cart setup',
      'Core menu (Ramen, Mandu, Boba)',
      'Basic branding package',
      'Location guidance',
      'Operational training',
    ],
    bestFor: 'First-time entrepreneurs',
    recommended: false,
  },
  {
    name: 'GROWTH',
    tagline: 'CART CAFÉ',
    subtitle: 'Scale your presence',
    features: [
      'Expanded cart setup',
      'Full menu + specials',
      'Complete brand identity',
      'Multi-location support',
      'Marketing materials',
      'Priority support',
    ],
    bestFor: 'Growing food businesses',
    recommended: true,
  },
  {
    name: 'PREMIUM',
    tagline: 'FULL CONCEPT',
    subtitle: 'The complete TAKKERU experience',
    features: [
      'Full cart + café setup',
      'Complete menu system',
      'Premium branding suite',
      'Territory rights',
      'Dedicated support',
      'Launch campaign',
      'Ongoing guidance',
    ],
    bestFor: 'Serious investors',
    recommended: false,
  },
];

export default function FranchiseTiers() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="franchise" className="relative py-24 md:py-32 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(214,40,40,0.15),transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(255,122,61,0.08),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-12 hidden md:block text-[12rem] font-jp text-white/5 leading-none select-none pointer-events-none">
        投資
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-jp tracking-[0.4em] block mb-4 text-sm uppercase">投資</span>
          <h2 className="text-4xl md:text-6xl font-bebas tracking-tight">
            YOUR INVESTMENT. YOUR TAKKERU.
          </h2>
          <p className="mt-6 text-subtle/70 text-lg font-inter leading-relaxed max-w-xl mx-auto">
            Choose the model that fits your vision.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                tier.recommended
                  ? 'border-2 border-accent shadow-[0_0_40px_rgba(214,40,40,0.3)]'
                  : 'border border-white/10'
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-inter font-semibold tracking-[0.2em] uppercase px-4 py-1 rounded-full">
                  Recommended
                </span>
              )}

              <div className="mb-8">
                <span className="text-accent font-bebas text-lg tracking-[0.15em] block">
                  {tier.tagline}
                </span>
                <h3 className="text-3xl md:text-4xl font-bebas tracking-tight mt-1">
                  {tier.name}
                </h3>
                <p className="text-subtle/60 font-inter text-sm mt-2">{tier.subtitle}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-subtle/80 font-inter text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-6 mb-6">
                <span className="text-subtle/50 text-xs uppercase tracking-[0.2em] font-inter block mb-1">
                  Best for
                </span>
                <span className="text-subtle font-inter text-sm font-medium">{tier.bestFor}</span>
              </div>

              <a
                href="https://tally.so/r/XxaDyj"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] font-inter transition-all duration-300 ${
                  tier.recommended
                    ? 'bg-accent text-white hover:bg-white hover:text-primary'
                    : 'border border-white/20 text-white hover:bg-accent hover:border-accent'
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
