import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Products', href: '#products' },
  { name: 'Campaigns', href: '#campaigns' },
  { name: 'Fan Club', href: '#fan-club' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
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
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-primary/80 backdrop-blur-lg border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')}
          className="group relative h-10 md:h-12 transition-transform duration-500 hover:scale-105 active:scale-95"
        >
          <img 
            src="/images/logo.png" 
            alt="Takkeru Logo" 
            className="h-full w-auto object-contain transition-opacity duration-500 group-hover:opacity-100 opacity-90" 
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`relative font-bebas text-lg tracking-widest uppercase transition-colors duration-300 ${
                activeSection === link.href.substring(1) ? 'text-accent' : 'text-subtle/60 hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="navActive"
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent"
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.div 
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-8 h-[1px] bg-white" 
          />
          <motion.div 
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-8 h-[1px] bg-white" 
          />
          <motion.div 
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-8 h-[1px] bg-white" 
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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            </div>
            
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-bebas text-5xl tracking-[0.2em] uppercase hover:text-accent transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
