import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronRight, ExternalLink } from 'lucide-react';

export default function WinnerAnnouncement() {
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden w-full">
      {/* Top / bottom dividers */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/images/halftone.png')]" />
      <div className="absolute -bottom-20 -right-20 text-[20rem] font-bebas text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
        CHAMPION
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">

        {/* ── Section label ── */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-accent font-jp tracking-[0.4em] block mb-6 text-sm uppercase"
        >
          受賞者
        </motion.span>

        {/* ── Title ── */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-8xl mb-6"
        >
          WINNER OF THE <span className="text-accent">CAMPAIGN</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-subtle/50 font-inter text-lg max-w-xl mx-auto mb-14 leading-relaxed"
        >
          The inaugural Takkeru Creative Content competition has concluded. Our panel selected the most exceptional entry.
        </motion.p>

        {/* ── Reveal button ── */}
        {!revealed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRevealed(true)}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full border border-accent/30 bg-accent/5 text-accent font-bebas tracking-[0.2em] text-xl uppercase hover:bg-accent hover:text-primary hover:border-accent transition-all duration-400"
          >
            <Trophy className="w-5 h-5" />
            Reveal Winner
          </motion.button>
        )}

        {/* ── Winner card ── */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              key="winner"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              {/* Card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left max-w-5xl mx-auto">

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 }}
                  className="relative"
                >
                  <div className="relative z-10 overflow-hidden rounded-2xl shadow-[0_0_100px_rgba(255,122,61,0.18)] border border-white/5">
                    <img
                      src="/images/winner_image.jpeg"
                      alt="Winner – Kushal Chitkara"
                      loading="lazy"
                      className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  </div>
                  {/* Corner accents */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-accent opacity-20 rounded-br-xl" />
                  <div className="absolute -top-8 -left-8 font-jp text-white/[0.04] text-[10rem] leading-none pointer-events-none select-none">勝</div>
                </motion.div>

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.25 }}
                  className="space-y-6"
                >
                  <Trophy className="w-10 h-10 text-accent" />

                  <div>
                    <h3 className="text-4xl md:text-5xl mb-1 leading-tight">
                      CREATIVE CONTENT <span className="text-accent">AWARD</span>
                    </h3>
                    <p className="text-subtle/40 font-inter text-sm uppercase tracking-[0.2em]">Congratulations to</p>
                  </div>

                  <div>
                    <h4 className="text-3xl md:text-4xl leading-tight mb-1">KUSHAL CHITKARA</h4>
                    <a
                      href="https://instagram.com/khushaaaaalllll"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent text-base hover:opacity-70 transition-opacity underline"
                    >
                      @khushaaaaalllll <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="border-l-2 border-accent/30 pl-5">
                    <p className="text-subtle/50 text-sm font-inter leading-relaxed">
                      With over <strong className="text-white">1.1M+ views</strong>, 2K+ likes, 16+ comments, and 2K+ shares,
                      Kushal delivered the highest-performing entry and earned the prestigious{' '}
                      <strong className="text-accent">Winning Reward</strong>.
                    </p>
                  </div>

                  <p className="text-subtle/30 font-inter italic text-sm border-l-2 border-white/10 pl-5 py-1">
                    "Your creativity set you apart — welcome to the Takkeru legacy."
                  </p>

                  {/* ── Fill Form button ── */}
                  <motion.button
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/form')}
                    className="inline-flex items-center gap-3 px-10 py-4 bg-accent text-primary font-bebas tracking-[0.2em] text-lg uppercase rounded-full hover:bg-accent/90 transition-all duration-300"
                  >
                    Fill the Campaign Form
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Footer note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-20 text-subtle/25 text-xs font-inter tracking-[0.2em] uppercase max-w-2xl mx-auto"
              >
                Thank you to all creators who participated and made this competition a success.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
