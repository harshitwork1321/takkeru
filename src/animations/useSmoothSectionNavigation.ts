import { useEffect } from "react";
import { prefersReducedMotion } from "./gsap";

// Matches the fixed Navbar's section-scroll offset.
const HEADER_OFFSET = 80;

/**
 * Smooth, offset-aware navigation for same-page hash anchors that do not
 * already have their own handler (Navbar manages its own). Preserves native
 * history (pushState), keyboard/modified-click behavior, and reduced motion.
 */
export default function useSmoothSectionNavigation() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      if (url.hash !== window.location.hash) {
        window.history.pushState(null, "", url.hash);
      }
      window.scrollTo({
        top: Math.max(target.offsetTop - HEADER_OFFSET, 0),
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}
