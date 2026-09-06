import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'What is TAKKERU CART?',
    answer: 'TAKKERU CART is a mobile boba tea, mandu, and ramen business concept. Take the cart to where the crowd is — colleges, markets, events, and pop-ups.',
  },
  {
    question: 'What products can I sell?',
    answer: 'Boba tea (Classic, Brown Sugar, Taro, Matcha, Fruit), Mandu (Korean dumplings), Ramen (Signature Korean, Veg, Spicy Miso), Korean comfort food, and combos.',
  },
  {
    question: 'Where can I operate?',
    answer: 'College campuses, street markets, corporate events, pop-up events, shopping areas, festivals, and any high-traffic location. Location availability depends on local laws and permissions.',
  },
  {
    question: 'How do I start?',
    answer: "Click 'START YOUR CART' to get in touch with the TAKKERU team. They'll guide you through cart setup, menu configuration, and operational guidance.",
  },
  {
    question: 'What does TAKKERU provide?',
    answer: 'Cart setup, menu system, brand identity, operational guidance, and ongoing support. Details vary as part of the applicable TAKKERU business package.',
  },
  {
    question: 'Do I need prior experience?',
    answer: 'No prior food business experience is required. TAKKERU provides training, recipes, and operational guidance to help you succeed.',
  },
];

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-xl md:text-2xl font-bebas tracking-wider group-hover:text-accent transition-colors">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent text-2xl flex-shrink-0 ml-4"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-subtle/50 font-inter text-sm leading-relaxed max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="faq"
      ref={ref}
      className="py-24 md:py-40 bg-primary relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-accent font-jp tracking-[0.4em] block mb-6"
            >
              よくある質問
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-5xl md:text-8xl mb-8"
            >
              FAQ
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-subtle/50 font-inter text-lg leading-relaxed max-w-md"
            >
              Got questions about starting your TAKKERU CART business? We've got answers.
            </motion.p>
          </div>

          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/paper-fibers.png')]" />
    </section>
  );
}
