import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function WinnerAnnouncement() {
  const [hasClicked, setHasClicked] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const revealTime = new Date(now.getFullYear(), 5, 6, 12, 0, 0, 0);
  const isAfterNoon = now >= revealTime;
  const countdown = formatCountdown(revealTime - now);
  const showCountdown = hasClicked && !isAfterNoon;
  const showWinner = hasClicked && isAfterNoon;

  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-jp tracking-[0.4em] block mb-6"
          >
            RESULT
          </motion.span>
          <p className="mt-6 max-w-2xl mx-auto text-subtle/60 text-lg leading-relaxed">
            The inaugural Takkeru Creative Content competition has concluded! Our panel selected the most exceptional entry. Check out the winner announcement below and celebrate this milestone with our community.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <button
            type="button"
            onClick={() => setHasClicked(true)}
            className="inline-flex items-center justify-center rounded-full border border-accent/20 bg-accent/5 px-10 py-4 text-lg font-semibold tracking-[0.18em] text-accent transition hover:border-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            {isAfterNoon ? 'Reveal Winner' : hasClicked ? 'Update Countdown' : 'Check Result'}
          </button>

          {showCountdown && (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 px-8 py-10 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-accent mb-4">Coming soon</p>
              <p className="text-6xl md:text-7xl font-semibold tracking-tight text-white">{countdown}</p>
              <p className="mt-4 text-base text-subtle/50">Time remaining until 12:00 PM</p>
            </div>
          )}

          {isAfterNoon && !hasClicked && (
            <p className="text-subtle/60 text-base">
              The result is live now. Click the button to reveal the winner announcement section.
            </p>
          )}
        </div>

        {showWinner && (
          <div className="mt-20">
            <div className="mb-20 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent font-jp tracking-[0.4em] block mb-6"
              >
                受賞者
              </motion.span>
              <h2 className="text-5xl md:text-8xl">
                WINNER <span className="text-accent">ANNOUNCED</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10 overflow-hidden shadow-[0_0_100px_rgba(255,122,61,0.15)] border border-white/5">
                  <img
                    src="/images/winner_image.jpeg"
                    alt="Winner – Kushal"
                    loading="lazy"
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r-2 border-b-2 border-accent opacity-20" />
                <div className="absolute -top-10 -left-10 font-jp text-white/5 text-[12rem] leading-none pointer-events-none select-none">
                  勝
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Trophy className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-4xl md:text-6xl mb-4 leading-tight">
                  CREATIVE CONTENT<br />
                  <span className="text-accent">AWARD</span>
                </h3>

                <div className="space-y-6">
                  <p className="text-subtle/60 font-inter text-lg leading-relaxed">
                    Congratulations to
                  </p>
                  <h4 className="text-3xl md:text-4xl leading-tight">
                    KUSHAL CHITKARA{' '}
                    <a
                      href="https://instagram.com/khushaaaaalllll"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-xl md:text-2xl hover:opacity-70 transition-opacity underline"
                    >
                      (@khushaaaaalllll)
                    </a>
                  </h4>

                  <div className="border-l border-accent/30 pl-6">
                    <p className="text-subtle/40 text-sm font-inter leading-relaxed">
                    With over 1.1M+ views, 2K+ likes, 16+ comments, and 2K+ shares, Kushal chitkara
                    delivered the highest-performing entry, emerged as the winner of the Creative
                     Content Award, and earned the prestigious 
                      <strong className="text-accent">Winning Reward.</strong>.
                    </p>
                  </div>

                  <p className="text-subtle/40 font-inter italic border-l-2 border-white/10 pl-6 py-2">
                    "Your creativity set you apart — welcome to the Takkeru legacy."
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-20 text-center text-subtle/30 text-sm font-inter tracking-[0.2em] uppercase max-w-2xl mx-auto"
            >
              Thank you to all creators who participated and made this competition a
              success. We look forward to seeing more amazing content from our
              community in future events.
            </motion.p>
          </div>
        )}
      </div>

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/images/halftone.png')]" />
      <div className="absolute -bottom-20 -right-20 text-[20rem] font-bebas text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
        CHAMPION
      </div>
    </section>
  );
}
