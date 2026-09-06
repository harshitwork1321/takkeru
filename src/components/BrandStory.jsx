import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PILLARS = [
  {
    title: 'FOOD.',
    description:
      'Ramen. Mandu. Boba. Tteokbokki. Each dish crafted for bold flavor and fast service.',
  },
  {
    title: 'CULTURE.',
    description:
      'Japanese-inspired branding meets Indian street food energy. A concept that stands out.',
  },
  {
    title: 'COMMUNITY.',
    description:
      "TAKKERU isn't just a cart. It's a gathering point. A food experience. A brand people remember.",
  },
];

export default function BrandStory() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="story" className="relative bg-cream text-primary overflow-hidden">
      <div className="halftone-bg absolute inset-0 pointer-events-none" />

      <div
        ref={ref}
        className="container mx-auto px-6 py-24 md:py-40 relative z-10"
      >
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bebas leading-[0.9] tracking-tight">
            MORE THAN <br className="hidden md:block" />A FOOD CART.
          </h2>
        </motion.div>

        {/* Grid: Image + Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left — Collage image grid */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-3 relative"
          >
            {/* Main large image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="/images/boba.jpg"
                alt="TAKKERU boba tea"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Small overlapping accent images */}
            <div className="hidden md:flex absolute -bottom-8 -right-8 lg:-right-16 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-32 h-32 lg:w-40 lg:h-40 overflow-hidden rounded-sm border-4 border-cream shadow-lg"
              >
                <img
                  src="/images/Ramen.jpeg"
                  alt="TAKKERU ramen"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="w-28 h-28 lg:w-36 lg:h-36 overflow-hidden rounded-sm border-4 border-cream shadow-lg mt-6"
              >
                <img
                  src="/images/mandu.jpg"
                  alt="TAKKERU mandu"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Three text blocks */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-12 lg:space-y-16 lg:pl-8">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
              >
                <h3 className="text-4xl md:text-5xl font-bebas mb-3 tracking-wide text-primary">
                  {pillar.title}
                </h3>
                <div className="w-12 h-[2px] bg-accent mb-4" />
                <p className="font-inter text-primary/70 leading-relaxed text-base md:text-lg">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom accent images row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {[
            { src: '/images/tteokbokki.jpg', alt: 'TAKKERU tteokbokki' },
            { src: '/images/contact.jpg', alt: 'TAKKERU cart' },
            { src: '/images/boba.jpg', alt: 'TAKKERU boba' },
          ].map((img, i) => (
            <div
              key={img.src + i}
              className="relative aspect-[3/2] overflow-hidden rounded-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative text */}
      <div className="absolute -bottom-16 -left-16 text-[16rem] md:text-[22rem] font-bebas text-primary/[0.03] select-none pointer-events-none whitespace-nowrap leading-none">
        TAKKERU
      </div>
    </section>
  );
}
