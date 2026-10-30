import { useEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Magnetic pointer pull for prominent CTAs.
 * Fine pointers only, disabled for reduced motion, always clamped so
 * buttons never travel far enough to hurt layout or reach targets.
 */
export default function useMagneticHover(
  ref: RefObject<HTMLElement | null>,
  strength = 0.3,
  maxOffset = 22,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    if (prefersReducedMotion()) return undefined;

    const setX = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onPointerMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      setX(gsap.utils.clamp(-maxOffset, maxOffset, relX * strength));
      setY(gsap.utils.clamp(-maxOffset, maxOffset, relY * strength));
    };
    const onPointerLeave = () => {
      setX(0);
      setY(0);
    };

    el.addEventListener("mousemove", onPointerMove);
    el.addEventListener("mouseleave", onPointerLeave);
    return () => {
      el.removeEventListener("mousemove", onPointerMove);
      el.removeEventListener("mouseleave", onPointerLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength, maxOffset]);
}
