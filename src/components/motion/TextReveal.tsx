import { Fragment, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../../animations/gsap";
import { motionPresets } from "../../animations/motionPresets";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Skip ScrollTrigger and play immediately (e.g. hero timelines). */
  immediate?: boolean;
}

/**
 * Accessible word-stagger text reveal. Screen readers receive the plain
 * string; words are wrapped only for transform-friendly animation. Renders
 * fully visible when JS or motion is unavailable.
 */
export default function TextReveal({
  text,
  as = "span",
  className = "",
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const words = el.querySelectorAll<HTMLElement>(".tr-word");
      if (!words.length) return;
      gsap.fromTo(
        words,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: motionPresets.text.duration,
          ease: motionPresets.text.ease,
          stagger,
          delay,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
        },
      );
    },
    { scope: ref },
  );

  const Comp = as as "span";

  return (
    <Comp ref={ref} className={className}>
      {text.split(" ").map((word, index, words) => (
        <Fragment key={`${word}-${index}`}>
          <span className="tr-word inline-block will-change-transform">
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Comp>
  );
}
