import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartButton from './cart/CartButton';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'The Cart', href: '#cart' },
  { name: 'Menu', href: '#menu' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Investment', href: '#investment' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (event, href) => {
    event.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'border-b border-white/10 bg-primary/85 backdrop-blur-xl' : ''}`} aria-label="Main navigation">
      <div className="container mx-auto flex min-h-[76px] items-center justify-between px-6">
        <a href="#home" onClick={(event) => scrollToSection(event, '#home')} className="font-bebas text-2xl leading-none tracking-[0.2em] text-white transition-colors duration-300 hover:text-accent">
          TAKKERU
          <span className="-mt-1 block font-jp text-[10px] leading-none tracking-[0.15em] text-white/50">タッケル・カート</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a key={link.name} href={link.href} onClick={(event) => scrollToSection(event, link.href)} className="relative group">
                <span className={`font-bebas text-lg uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white hover:text-accent'}`}>
                  {link.name}
                </span>
                {isActive && <motion.span layoutId="navIndicator" className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <CartButton />
          <a
            href="#pay"
            onClick={(event) => scrollToSection(event, '#pay')}
            className="inline-flex min-h-[42px] items-center bg-accent px-5 py-2.5 font-bebas text-lg tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:text-[#111111] active:scale-95"
          >
            PAY NOW
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <CartButton />
          <button className="z-50 flex flex-col gap-1.5 p-1" onClick={() => setIsMobileMenuOpen((open) => !open)} aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isMobileMenuOpen}>
            <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-8 origin-center bg-white" />
            <motion.span animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="h-[1.5px] w-8 origin-center bg-white" />
            <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-8 origin-center bg-white" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 220 }} className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-primary/95 backdrop-blur-xl lg:hidden">
            <nav className="relative z-10 flex flex-col items-center gap-6" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, index) => (
                <motion.a key={link.name} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08, type: 'spring', damping: 20, stiffness: 200 }} href={link.href} onClick={(event) => scrollToSection(event, link.href)} className="font-bebas text-4xl uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-accent">
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <motion.a initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: 'spring', damping: 20 }} href="#pay" onClick={(event) => { scrollToSection(event, '#pay'); setIsMobileMenuOpen(false); }} className="relative z-10 mt-10 inline-flex min-h-[52px] items-center bg-accent px-10 py-3 font-bebas text-2xl tracking-wider text-white transition-all duration-300 hover:bg-cream hover:text-[#111111] active:scale-95">
              PAY NOW →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
