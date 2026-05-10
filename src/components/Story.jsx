import { motion } from 'framer-motion';

export default function Story() {
  return (
    <section className="relative py-24 md:py-40 bg-primary overflow-hidden">
      {/* Manga halftone background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/images/halftone.png')]" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <span className="text-accent font-jp tracking-[0.4em] block mb-6">物語</span>
          <h2 className="text-5xl md:text-8xl mb-12 leading-[0.9]">
            SOME CAFÉS ARE <br />
            <span className="text-accent">BUILT FOR NOISE.</span>
          </h2>
          
          <div className="space-y-6 text-xl md:text-2xl font-inter font-light text-subtle/70 leading-relaxed max-w-xl">
            <p>Takkeru was built for pauses.</p>
            <p>For rain outside train windows. For unfinished conversations. For late-night ramen.</p>
            <p className="text-white italic">For sketchbook walls that feel alive.</p>
            <p className="pt-6 text-sm md:text-base tracking-[0.2em] uppercase text-accent font-bold">
              A small Tokyo dream hidden inside Delhi.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="relative aspect-[3/4] lg:aspect-square"
        >
          <div className="absolute inset-0 border border-white/10 m-4 z-0" />
          <img 
            src="/images/story-interior.jpeg" 
            alt="Takkeru Interior"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute bottom-10 -left-10 bg-accent p-8 hidden md:block">
            <p className="font-bebas text-primary text-4xl leading-none">EST. 2026</p>
            <p className="font-jp text-primary/60 text-xs tracking-widest mt-2">サトヤ・ニケタン</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative text */}
      <div className="absolute -bottom-20 -right-20 text-[20rem] font-bebas text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
        PAUSE AND REFLECT
      </div>
    </section>
  );
}
