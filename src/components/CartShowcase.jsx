import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const specs = [
  {
    title: "COMPACT FOOTPRINT",
    description: "Fits in tight spaces where restaurants can't",
  },
  {
    title: "BRAND IDENTITY",
    description: "Bold TAKKERU visual presence",
  },
  {
    title: "CUSTOMER COUNTER",
    description: "Customer-facing service area",
  },
  {
    title: "FULL KITCHEN",
    description: "Complete food preparation setup",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const specVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function CartShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section
      id="cart"
      className="relative w-full bg-primary py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          ref={ref}
        >
          <span className="font-jp block text-sm tracking-[0.3em] text-text-accent">
            カート
          </span>
          <h2 className="font-bebas mt-2 text-5xl leading-none tracking-tight text-text-primary md:text-7xl">
            THE TAKKERU CART
          </h2>
          <div className="mt-4 h-[2px] w-24 bg-text-accent" />
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
          {/* Cart Image — 60% */}
          <motion.div
            className="relative overflow-hidden"
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <img
              src="/images/cart-hero.png"
              alt="TAKKERU Cart — compact mobile food unit"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Spec Cards — 40% */}
          <motion.div
            className="flex flex-col justify-center gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {specs.map((spec) => (
              <motion.div
                key={spec.title}
                className="border-l-[3px] border-text-accent bg-bg-secondary px-6 py-5"
                variants={specVariants}
              >
                <h3 className="font-bebas text-lg tracking-wide text-text-primary">
                  {spec.title}
                </h3>
                <p className="font-inter mt-1 text-sm leading-relaxed text-text-secondary">
                  {spec.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
