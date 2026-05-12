import { motion } from 'framer-motion';

export default function FoodExperience() {
  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      {/* Cinematic elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(255,122,61,0.15)] border border-white/5">
              <img 
                src="/images/experience-interior.jpeg" 
                alt="Takkeru Café cinematic 2D anime-themed interior atmosphere in Delhi"
                loading="lazy"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            </div>
            
            {/* Manga decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r-2 border-b-2 border-accent opacity-20" />
            <div className="absolute -top-10 -left-10 font-jp text-white/5 text-[12rem] leading-none pointer-events-none select-none">
              食
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-jp tracking-[0.4em] block mb-6">食体験</span>
            <h2 className="text-5xl md:text-7xl mb-8 leading-tight">MORE THAN JUST<br />A MEAL.</h2>
            
            <div className="space-y-8">
              <p className="text-subtle/60 font-inter text-lg leading-relaxed">
                Step into a world where premium Asian comfort food meets the vibrant energy of 2D café culture. Every dish at Takkeru is handcrafted with precision, offering Delhi an unforgettable, immersive dining experience.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l border-accent/30 pl-6">
                  <h4 className="text-accent text-xl mb-2">Comfort</h4>
                  <p className="text-subtle/40 text-sm font-inter">Warm, authentic Asian comfort food atmosphere.</p>
                </div>
                <div className="border-l border-accent/30 pl-6">
                  <h4 className="text-accent text-xl mb-2">Culture</h4>
                  <p className="text-subtle/40 text-sm font-inter">Deeply rooted in realistic social anime experiences.</p>
                </div>
              </div>

              <p className="text-subtle/40 font-inter italic border-l-2 border-white/10 pl-6 py-2">
                "We believe the best memories are made over steaming bowls and shared stories."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background manga halftone texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/images/halftone.png')]" />
    </section>
  );
}
