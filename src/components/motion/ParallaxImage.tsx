import { useRef, type ImgHTMLAttributes } from "react";
import { gsap, useGSAP } from "../../animations/gsap";

interface ParallaxImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** One-directional parallax travel as a percentage of container height. */
  strength?: number;
  /** Constant scale so travel never reveals empty edges. */
  baseScale?: number;
}

/**
 * Scroll-scrubbed vertical parallax for food photography.
 * Desktop + no-reduced-motion only; subtle travel with a small constant
 * overscan so crops stay correct and nothing artificial happens to the food.
 */
export default function ParallaxImage({
  strength = 6,
  baseScale = 1.12,
  className = "",
  alt = "",
  ...imgProps
}: ParallaxImageProps) {
  const ref = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const img = ref.current;
      if (!img) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          img,
          { yPercent: -strength, scale: baseScale },
          {
            yPercent: strength,
            scale: baseScale,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement ?? img,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <img
      ref={ref}
      alt={alt}
      loading="lazy"
      className={`will-change-transform ${className}`}
      {...imgProps}
    />
  );
}
