/**
 * Shared timing presets for the TAKKERU motion system.
 * Slow and elegant for storytelling, fast for interaction feedback.
 * Eases use GSAP's built-in curves so no extra plugins are needed.
 */
export const motionPresets = {
  /** Editorial section reveals */
  reveal: { duration: 1.0, ease: "power3.out" },
  /** Larger cinematic transitions */
  cinematic: { duration: 1.4, ease: "power3.inOut" },
  /** Image entrances and parallax settle */
  image: { duration: 1.2, ease: "power2.out" },
  /** Essential control feedback — always fast */
  interaction: { duration: 0.25, ease: "power2.out" },
  /** Word/line text reveals — editorial, unhurried */
  text: { duration: 0.9, ease: "power4.out" },
  /** Hero and signature brand moments */
  brand: { duration: 1.15, ease: "power4.out" },
} as const;
