import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function BrandStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className='relative py-20 md:py-32 bg-primary overflow-hidden'>
      <div className='container mx-auto px-6 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          {/* Left - Typography */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className='font-jp text-accent tracking-[0.4em] block mb-6 text-sm'
            >
              &#26085;&#26412;&#30340;&#35486;&#34920;&#36335;&#39278;&#33590;
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className='text-5xl md:text-7xl lg:text-8xl font-bebas leading-[0.9] tracking-tight text-white mb-8'
            >
              JAPANESE<br />
              STREET FOOD<br />
              <span className='text-accent'>REBORN.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='text-subtle/50 font-inter text-lg leading-relaxed max-w-md mb-10'
            >
              Bold flavors. Compact carts. A brand that turns heads.
              TAKKERU brings the energy of Japanese street food to your city.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='flex items-center gap-6'
            >
              <a
                href='#cart'
                className='px-8 py-3 border border-white/20 text-white font-bebas text-lg tracking-wider hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-500'
              >
                SEE THE CART
              </a>
              <div className='flex items-center gap-2 text-subtle/30'>
                <div className='w-8 h-[1px] bg-subtle/20' />
                <span className='font-jp text-xs tracking-widest'>&#19979;&#12395;&#12367;&#12377;</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className='relative'
          >
            <div className='grid grid-cols-2 gap-4'>
              {/* Main large image */}
              <div className='col-span-2 aspect-[16/9] overflow-hidden rounded-sm'>
                <img
                  src='/images/boba.jpg'
                  alt='TAKKERU boba tea'
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                  loading='lazy'
                />
              </div>

              {/* Two smaller images */}
              <div className='aspect-square overflow-hidden rounded-sm'>
                <img
                  src='/images/Ramen.jpeg'
                  alt='TAKKERU ramen'
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                  loading='lazy'
                />
              </div>
              <div className='aspect-square overflow-hidden rounded-sm relative'>
                <img
                  src='/images/mandu.jpg'
                  alt='TAKKERU mandu'
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                  loading='lazy'
                />
                <div className='absolute inset-0 bg-accent/20 mix-blend-multiply' />
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className='absolute -bottom-6 -left-6 bg-accent text-white p-6 hidden md:block'
            >
              <span className='font-bebas text-4xl leading-none block'>&#8377;65K</span>
              <span className='font-inter text-xs tracking-widest uppercase opacity-80'>Starting from</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background accent */}
      <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none' />
    </section>
  );
}
