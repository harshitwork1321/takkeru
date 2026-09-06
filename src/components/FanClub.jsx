import { motion } from 'framer-motion';

export default function FanClub() {
  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass p-12 md:p-24 relative overflow-hidden text-center"
        >
          {/* Floating animations decoration */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-24 h-24 border border-accent/20 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-10 w-32 h-32 border border-white/5 rounded-full"
          />

          <span className="text-accent font-jp tracking-[0.4em] block mb-8">ネットワーク</span>
          <h2 className="text-4xl md:text-7xl mb-8">JOIN THE TAKKERU<br />CART NETWORK</h2>
          <p className="text-subtle/50 text-lg font-inter max-w-2xl mx-auto mb-12">
            Join the TAKKERU CART network for exclusive support, menu updates, and priority access to new business opportunities.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#membership-form"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-accent px-10 py-5 text-base font-semibold uppercase tracking-[0.2em] text-accent transition hover:bg-accent/20"
            >
              Join Cart Network
            </a>
          </div>

          {/* Manga paper texture background for the card */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/paper-fibers.png')] -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
