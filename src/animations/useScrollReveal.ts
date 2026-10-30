import { useRef, type RefObject } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";
import { motionPresets } from "./motionPresets";

export interface ScrollRevealOptions {
  /** Upward travel in px before settling. */
  y?: number;
  delay?: number;
  /** Stagger direct children instead of the element itself. */
  stagger?: number;
  /** ScrollTrigger start position (default: near-viewport entry). */
  start?: string;
}

/**
 * Scroll-triggered reveal (once by default). Content renders visible in the
 * DOM; GSAP applies the hidden start state only when motion is allowed, so a
 * JS failure can never leave content invisible. Context-safe cleanup via useGSAP.
 */
export default function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
): RefObject<T | null> {
  const { y = 32, delay = 0, stagger = 0, start = "top 88%" } = options;
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const targets: Element[] =
        stagger > 0 && el.children.length > 0
          ? Array.from(el.children)
          : [el];

      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: motionPresets.reveal.duration,
          ease: motionPresets.reveal.ease,
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
