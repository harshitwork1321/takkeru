import { motion } from 'framer-motion';

export default function Campaigns() {
  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent font-jp tracking-[0.4em] block mb-6"
            >
              イベント
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bebas leading-tight"
            >
              TAKKERU CAMPAIGNS
            </motion.h2>
            <p className="mt-6 text-subtle/70 text-lg font-inter leading-relaxed">
              Be part of the Takkeru anime community! Join our exclusive membership, unlock special perks, level up with exciting tasks, and get early access to our next anime-inspired events and campaigns. Your journey with Takkeru starts here.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
          >
            <img
              src="/images/coming.jpg"
              alt="Takkeru campaign image"
              loading="lazy"
              className="h-[520px] w-full object-cover grayscale opacity-90 transition duration-1000 hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 z-10 max-w-xs">
              <p className="text-xs uppercase tracking-[0.35em] text-accent font-inter mb-3">Featured campaign</p>
              <h3 className="text-3xl md:text-4xl font-bebas text-white leading-tight">Fan Club Membership</h3>
              <p className="mt-4 text-sm text-white/70 font-inter">
                Sign up for the fan club, get event access, rewards, and priority updates at Takkeru Café.
              </p>
            </div>
            <div className="absolute top-8 right-8 text-[7rem] font-jp text-white/10 leading-none select-none pointer-events-none">
              キャンペーン
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
