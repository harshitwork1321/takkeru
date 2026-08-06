import { motion } from 'framer-motion';

/* ─── Takkeru Café Google reviews ─── */
const REVIEWS = [
  {
    name: 'Riya Sharma',
    handle: '@riya.eats',
    rating: 5,
    text: 'Absolutely loved the whole vibe! The ramen was next level and the 2D anime theme was such a unique experience. Felt like I walked into a Studio Ghibli film. Will definitely be back!',
    avatar: 'RS',
    color: 'from-purple-600 to-pink-500',
    date: '2 weeks ago',
  },
  {
    name: 'Aryan Kapoor',
    handle: '@aryan.foodie',
    rating: 5,
    text: 'Takkeru is honestly one of the most aesthetically pleasing cafés in Delhi. The boba tea was creamy and the dango was perfectly chewy. The ambience is unreal!',
    avatar: 'AK',
    color: 'from-blue-600 to-cyan-500',
    date: '1 month ago',
  },
  {
    name: 'Priya Mehta',
    handle: '@priyamehta_',
    rating: 5,
    text: 'Came here for the tteokbokki and stayed for the whole experience. The decor is insane — 2D sketchbook walls, cozy lighting, and the staff are so warm. 10/10 would recommend!',
    avatar: 'PM',
    color: 'from-orange-600 to-red-500',
    date: '3 weeks ago',
  },
  {
    name: 'Kabir Singh',
    handle: '@kabir.wanderlust',
    rating: 5,
    text: 'As an anime fan this place is a dream come true. The japchae bowl was phenomenal — glass noodles done right. The overall experience was unique and memorable.',
    avatar: 'KS',
    color: 'from-green-600 to-teal-500',
    date: '2 months ago',
  },
  {
    name: 'Sneha Verma',
    handle: '@sneha.v',
    rating: 5,
    text: 'One of the best food experiences I have had in Delhi. The ramen is rich and flavorful and the atmosphere transports you to another world. Perfect date spot!',
    avatar: 'SV',
    color: 'from-yellow-500 to-amber-500',
    date: '1 week ago',
  },
  {
    name: 'Dev Anand',
    handle: '@dev.delhi',
    rating: 5,
    text: 'Incredible concept! The 2D manga-style decor is something you have to see to believe. Food quality is top notch — especially the boba tea and ramen combo. Must visit!',
    avatar: 'DA',
    color: 'from-indigo-600 to-violet-500',
    date: '3 months ago',
  },
  {
    name: 'Meera Nair',
    handle: '@meera.bites',
    rating: 5,
    text: 'Takkeru gave me anime nostalgia in the best way possible! The food is authentic and creative, the playlist is great, and the service is super friendly. Already planning my next visit.',
    avatar: 'MN',
    color: 'from-rose-600 to-pink-500',
    date: '5 weeks ago',
  },
  {
    name: 'Rohan Joshi',
    handle: '@rohanjoshi_nz',
    rating: 5,
    text: 'Hidden gem in Delhi! The tteokbokki has the perfect level of spice and the atmosphere is so cozy and unique. Came across this on Instagram and so glad I visited.',
    avatar: 'RJ',
    color: 'from-cyan-600 to-blue-500',
    date: '6 weeks ago',
  },
];

/* Star icons */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* Google icon */
const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

/* Single review card */
function ReviewCard({ r }) {
  return (
    <div
      className="flex-shrink-0 w-[320px] md:w-[380px] bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
      style={{ userSelect: 'none' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0`}>
          <span className="font-bebas text-white text-sm tracking-wider leading-none">{r.avatar}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bebas text-base tracking-wide text-white leading-tight truncate">{r.name}</p>
          <p className="text-subtle/40 text-[11px] font-inter truncate">{r.handle}</p>
        </div>
        <GoogleIcon />
      </div>

      {/* Stars + date */}
      <div className="flex items-center justify-between">
        <Stars count={r.rating} />
        <span className="text-subtle/30 text-[11px] font-inter">{r.date}</span>
      </div>

      {/* Text */}
      <p className="text-subtle/60 font-inter text-[13px] leading-relaxed flex-1">
        &ldquo;{r.text}&rdquo;
      </p>

      {/* Footer badge */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <svg className="w-3 h-3 text-green-400 fill-green-400" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-subtle/25 text-[10px] font-inter tracking-[0.15em] uppercase">Verified Google Review</span>
      </div>
    </div>
  );
}

/*
  InfiniteTrack — pure CSS animation, no JS timers, no framer-motion x values.
  We render 4 copies so the loop is perfectly seamless regardless of screen width.
*/
function InfiniteTrack({ reviews, direction = 'left', durationSec = 40 }) {
  // 4 copies → the strip is 400% wide; we animate 0 → -25% (= one copy width) or reverse
  const quad = [...reviews, ...reviews, ...reviews, ...reviews];
  const animName = direction === 'left' ? 'marquee-left-q' : 'marquee-right-q';

  return (
    <>
      <style>{`
        @keyframes marquee-left-q {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-right-q {
          0%   { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div className="overflow-hidden relative">
        {/* Fade masks */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-36 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-5 w-max"
          style={{
            animation: `${animName} ${durationSec}s linear infinite`,
          }}
        >
          {quad.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>
    </>
  );
}

export default function CustomerReviews() {
  return (
    <section className="py-24 md:py-36 bg-primary relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/[0.06] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-6 relative z-10 mb-14">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-jp tracking-[0.4em] block mb-4 text-sm"
        >
          口コミ
        </motion.span>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl leading-tight"
          >
            WHAT OUR <span className="text-accent">GUESTS</span><br />ARE SAYING
          </motion.h2>

          <motion.a
            href="https://g.page/r/takkeru-cafe/review"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-2 text-subtle/40 hover:text-accent text-sm font-inter tracking-wider transition-colors duration-300 whitespace-nowrap shrink-0"
          >
            <GoogleIcon />
            View all Google reviews →
          </motion.a>
        </div>

        {/* Overall rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-white/[0.04] border border-white/10 rounded-full"
        >
          <Stars count={5} />
          <span className="font-bebas text-xl text-white tracking-wide">4.9 / 5</span>
          <span className="text-subtle/40 text-xs font-inter">·</span>
          <span className="text-subtle/40 text-xs font-inter">Based on Google Reviews</span>
        </motion.div>
      </div>

      {/* Row 1 — scrolls LEFT */}
      <div className="mb-5">
        <InfiniteTrack reviews={REVIEWS} direction="left" durationSec={45} />
      </div>

      {/* Row 2 — scrolls RIGHT (reversed for variety) */}
      <InfiniteTrack reviews={[...REVIEWS].reverse()} direction="right" durationSec={55} />
    </section>
  );
}
