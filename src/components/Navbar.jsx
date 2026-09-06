import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Cart', href: '#cart' },
  { name: 'Menu', href: '#menu' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Franchise', href: '#franchise' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const reversed = [...sections].reverse();
      for (const section of reversed) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled && !isMobileMenuOpen
          ? 'py-3 bg-primary/90 backdrop-blur-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="font-bebas text-2xl tracking-[0.2em] text-white hover:text-accent transition-colors duration-300"
        >
          TAKKERU
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="relative group"
            >
              <span
                className={`font-bebas text-lg tracking-widest uppercase transition-colors duration-300 ${
                  activeSection === link.href.substring(1)
                    ? 'text-accent'
                    : 'text-subtle/60 group-hover:text-white'
                }`}
              >
                {link.name}
              </span>
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="https://tally.so/r/XxaDyj"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center px-6 py-2.5 bg-accent text-primary font-bebas text-lg tracking-wider hover:bg-white hover:text-primary transition-all duration-300 active:scale-95"
        >
          GET STARTED
        </a>

        {/* Mobile: Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 z-50 p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <motion.div
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-8 h-[1.5px] bg-white origin-center"
          />
          <motion.div
            animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="w-8 h-[1.5px] bg-white origin-center"
          />
          <motion.div
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-8 h-[1.5px] bg-white origin-center"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 bg-primary/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center lg:hidden"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <nav className="flex flex-col items-center gap-6 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, type: 'spring', damping: 20, stiffness: 200 }}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`font-bebas text-4xl tracking-[0.2em] uppercase transition-colors duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'text-accent'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.a
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', damping: 20 }}
              href="https://tally.so/r/XxaDyj"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-10 px-10 py-3 bg-accent text-primary font-bebas text-2xl tracking-wider hover:bg-white transition-all duration-300 active:scale-95 relative z-10"
            >
              GET STARTED
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
