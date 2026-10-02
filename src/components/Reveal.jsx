import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Scroll-reveal wrapper that can never leave content invisible.
 * - Uses framer-motion `whileInView` for the animation.
 * - If IntersectionObserver is missing, or the element is still hidden
 *   after 3s while sitting inside the viewport, it force-renders plain
 *   visible markup instead.
 */
export default function Reveal({ children, delay = 0, y = 28, className = '' }) {
  const ref = useRef(null);
  const [forceVisible, setForceVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window)
  );

  useEffect(() => {
    if (forceVisible) return undefined;

    const timer = window.setTimeout(() => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport && window.getComputedStyle(node).opacity === '0') {
        setForceVisible(true);
      }
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [forceVisible]);

  if (forceVisible) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
