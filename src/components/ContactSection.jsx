import { motion } from 'framer-motion';
import { Mail, Instagram, Twitter, Phone } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-24 md:py-40 bg-primary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <span className="text-accent font-jp tracking-[0.4em] block mb-6">連絡</span>
            <h2 className="text-5xl md:text-8xl mb-8">GET IN<br />TOUCH</h2>
            <p className="text-subtle/50 text-lg font-inter max-w-md mb-12">
              Have questions about our events or want to collaborate? Reach out to us and let's start a conversation.
            </p>

            <div className="space-y-6">
              <a 
                href="mailto:contact@takkeru.com" 
                className="group flex items-center gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-accent transition-all duration-500"
              >
                <div className="w-14 h-14 bg-accent group-hover:bg-white flex items-center justify-center transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-subtle/30 text-xs block uppercase tracking-widest mb-1 group-hover:text-white/50">Send an Email</span>
                  <span className="text-2xl font-bebas tracking-wider group-hover:text-white">CONTACT@TAKKERU.COM</span>
                </div>
              </a>

              <a 
                href="tel:+918076092273" 
                className="group flex items-center gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-accent transition-all duration-500"
              >
                <div className="w-14 h-14 bg-accent group-hover:bg-white flex items-center justify-center transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-subtle/30 text-xs block uppercase tracking-widest mb-1 group-hover:text-white/50">Call Us</span>
                  <span className="text-2xl font-bebas tracking-wider group-hover:text-white">8076092273</span>
                </div>
              </a>

              <div className="flex gap-4">
                <a href="#" className="w-16 h-16 border border-white/5 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group">
                  <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-16 h-16 border border-white/5 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group">
                  <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a href="tel:+918076092273" className="w-16 h-16 border border-white/5 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group">
                  <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-square glass p-1 rounded-sm relative overflow-hidden">
               <img 
                 src="/images/contact.jpg" 
                 alt="Contact Takkeru"
                 className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
               />
               <div className="absolute inset-0 border-[20px] border-primary/50 pointer-events-none" />
            </div>
            {/* Manga texture elements */}
            <div className="absolute -top-10 -right-10 font-jp text-white/5 text-[15rem] leading-none pointer-events-none select-none -z-10">
              会話
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
