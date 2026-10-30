import { useEffect, useState, type ReactNode } from "react";
import useScrollReveal from "../../animations/useScrollReveal";
import { prefersReducedMotion } from "../../animations/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  /** Stagger direct children instead of the whole block. */
  stagger?: number;
}

/**
 * GSAP scroll-reveal wrapper. Never leaves content invisible: elements are
 * visible in plain DOM, and a viewport failsafe force-reveals if a trigger
 * misfires while the block is on screen.
 */
export default function Reveal({
  children,
  className = "",
  y = 32,
  delay = 0,
  stagger = 0,
}: RevealProps) {
  const [forceVisible, setForceVisible] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>({ y, delay, stagger });

  useEffect(() => {
    if (forceVisible || prefersReducedMotion()) return undefined;
    const timer = window.setTimeout(() => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      const own = window.getComputedStyle(node).opacity === "0";
      const child =
        node.firstElementChild != null &&
        window.getComputedStyle(node.firstElementChild).opacity === "0";
      if (inViewport && (own || child)) setForceVisible(true);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [forceVisible, ref]);

  if (forceVisible) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
