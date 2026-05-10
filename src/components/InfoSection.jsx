import { motion } from 'framer-motion';

export default function InfoSection() {
  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl mb-8 flex items-center gap-4">
              <span className="text-accent font-jp">01</span>
              ATMOSPHERE
            </h3>
            <p className="text-subtle/50 font-inter leading-relaxed">
              Our interiors are a love letter to the 2D world. From the hand-sketched wall murals to the soft warm lighting, every corner of Takkeru is designed to make you feel like you've stepped into a cozy anime scene.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl mb-8 flex items-center gap-4">
              <span className="text-accent font-jp">02</span>
              VISITING TIMES
            </h3>
            <p className="text-subtle/50 font-inter leading-relaxed">
              While we are vibrant throughout the day, the best time to visit for the full cinematic experience is late evening. As the city lights dim, our café truly comes alive with that signature "late-night Tokyo" vibe.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl mb-8 flex items-center gap-4">
              <span className="text-accent font-jp">03</span>
              SOCIAL HUB
            </h3>
            <p className="text-subtle/50 font-inter leading-relaxed">
              Takkeru is more than a café; it's a social hangout for the community. Whether you're here to work on your manga, discuss the latest episodes, or just soak in the vibe, you're among friends.
            </p>
          </motion.div>

        </div>

        {/* Large atmospheric text background */}
        <div className="mt-32 md:mt-60 overflow-hidden whitespace-nowrap opacity-5 pointer-events-none select-none">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="text-[15rem] md:text-[25rem] font-bebas leading-none inline-block pr-20"
          >
            BEYOND THE FRAME — CINEMATIC DINING — MANGA CULTURE — TAKKERU CAFE — 
          </motion.div>
        </div>
      </div>

      {/* Manga halftone background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/images/halftone.png')]" />
    </section>
  );
}
