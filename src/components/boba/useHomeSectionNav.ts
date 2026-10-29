import { useNavigate } from 'react-router-dom';

const POLL_MS = 150;
const TIMEOUT_MS = 25000;
const SETTLE_PX = 120;

let activeTimer: number | null = null;

/**
 * Navigate home and scroll to a section once the home page releases its
 * loading screen (the preloader gates section rendering for up to ~4s, so a
 * plain `/#section` link would find no element to scroll to). The scroll is
 * re-issued until the position settles, so a late layout shift or an
 * intervening scroll reset cannot strand the user at the top.
 */
export default function useHomeSectionNav(): (sectionId: string) => void {
  const navigate = useNavigate();

  return (sectionId: string) => {
    navigate('/');
    if (activeTimer !== null) window.clearInterval(activeTimer);
    const started = Date.now();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const stop = () => {
      if (activeTimer !== null) window.clearInterval(activeTimer);
      activeTimer = null;
    };

    activeTimer = window.setInterval(() => {
      if (window.location.pathname !== '/') {
        stop();
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        const target = Math.max(element.offsetTop - 72, 0);
        if (Math.abs(window.scrollY - target) < SETTLE_PX) {
          stop();
          return;
        }
        window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
      }
      if (Date.now() - started > TIMEOUT_MS) stop();
    }, POLL_MS);
  };
}
