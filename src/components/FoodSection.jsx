import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SIGNATURE_ITEMS = [
  {
    title: "Tteokbokki Bowl",
    description: "A Korean street-food inspired dish made with chewy rice cakes coated in spicy savory sauce. Bold flavor with soft chewy texture and comforting spice.",
    image: "/images/tteokbokki.jpg", 
    japanese: "トッポギ"
  },
  {
    title: "Boba Tea",
    description: "A chilled creamy milk tea drink served with chewy tapioca pearls, creating a sweet refreshing café-style beverage popular among Gen-Z and anime café culture.",
    image: "/images/boba.jpg", 
    japanese: "ボバティー"
  },
  {
    title: "Ramen",
    description: "A comforting Japanese noodle bowl served in rich flavorful broth with chewy noodles, toppings, and warm steam. Takkeru Café serves ramen with Korean and Japanese-inspired flavors ranging from mild to spicy.",
    image: "/images/Ramen.jpeg", 
    japanese: "ラーメン"
  }
];

export default function FoodSection() {
  const [activeDetails, setActiveDetails] = useState(null);

  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      {/* Background manga paper & halftone texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/paper-fibers.png')]" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/images/halftone.png')]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent font-jp tracking-[0.4em] block mb-4"
            >
              風味
            </motion.span>
            <h2 className="text-5xl md:text-7xl">Asian Flavors Beyond The Frame</h2>
          </div>
          <p className="max-w-md text-subtle/50 font-inter leading-relaxed italic border-l border-white/10 pl-6">
            "We don't just serve food. We serve moments frozen in time, inspired by the quiet corners of Shinjuku."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SIGNATURE_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer bg-white/[0.02] p-4 rounded-sm border border-white/5 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,122,61,0.1)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8 rounded-sm shadow-2xl">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20"
                  onClick={() => setActiveDetails(activeDetails === index ? null : index)}
                >
                   <span className="text-white font-bebas text-2xl tracking-[0.2em] border border-white/30 px-6 py-2 bg-black/20 backdrop-blur-sm">View Details</span>
                </div>
                <div className="absolute top-6 right-6 font-jp text-white/40 text-4xl leading-none rotate-90 origin-right">
                  {item.japanese}
                </div>
              </div>
              
              <h3 className="text-3xl mb-4 group-hover:text-accent transition-colors duration-300 tracking-wider">{item.title}</h3>
              <AnimatePresence>
                {activeDetails === index && (
                  <motion.p 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-subtle/60 font-inter text-sm leading-relaxed mb-6 overflow-hidden"
                  >
                    {item.description}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-accent w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
