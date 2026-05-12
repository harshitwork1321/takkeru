import { motion } from 'framer-motion';

const EVENTS = [
  {
    title: "COMING",
    date: "Stay Tuned",
    description: "Something special is brewing in the cinematic shadows of Delhi...",
    japanese: "近日公開",
    image: "/images/coming.jpg"
  },
  {
    title: "SOON",
    date: "Get Ready",
    description: "Prepare yourself for our next big anime event.",
    japanese: "近日公開",
    image: "/images/soon.jpg"
  }
];

export default function Campaigns() {
  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent font-jp tracking-[0.4em] block mb-6"
            >
              イベント
            </motion.span>
            <h2 className="text-5xl md:text-8xl">PARTICIPATE IN<br />CAMPAIGNS</h2>
          </div>
          <p className="max-w-xs text-subtle/30 text-sm font-inter leading-relaxed self-end">
            Join our growing community and make your mark on the Takkeru legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EVENTS.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[450px] overflow-hidden border border-white/5 bg-primary p-8 flex flex-col justify-end hover:bg-accent transition-colors duration-700"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={`${event.title} – Takkeru Café campaign event`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
              </div>

              <div className="absolute top-8 right-8 font-jp text-white/10 text-6xl leading-none group-hover:text-white/20 transition-colors z-10">
                {event.japanese}
              </div>
              
              <div className="relative z-10">
                <span className="text-accent text-xs font-inter tracking-[0.3em] uppercase mb-4 block group-hover:text-white/70 transition-colors">
                  {event.date}
                </span>
                <h3 className="text-4xl mb-6 group-hover:text-white transition-colors">{event.title}</h3>
                <p className="text-subtle/40 text-sm font-inter leading-relaxed group-hover:text-white/80 transition-colors">
                  {event.description}
                </p>
              </div>
              
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/halftone.png')] z-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
