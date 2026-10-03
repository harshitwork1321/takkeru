import { useState, useEffect, useCallback, Component } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BobaFeature from './components/BobaFeature';
import MatchaBoba from './components/MatchaBoba';
import BubbleDrink from './components/BubbleDrink';
import BobaFilms from './components/BobaFilms';
import BrandStatement from './components/BrandStatement';
import FoodStory from './components/FoodStory';
import RealFood from './components/RealFood';
import TakkeruInMotion from './components/TakkeruInMotion';
import FoodMenu from './components/FoodMenu';
import StreetCulture from './components/StreetCulture';
import BrandStory from './components/BrandStory';
import CartTransition from './components/CartTransition';
import CartShowcase from './components/CartShowcase';
import HowItWorks from './components/HowItWorks';
import LocationStrategy from './components/LocationStrategy';
import FranchiseTiers from './components/FranchiseTiers';
import FAQ from './components/FAQ';
import PaymentSection from './components/PaymentSection';
import ContactForm from './components/ContactForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Toast from './components/cart/Toast';

gsap.registerPlugin(ScrollTrigger);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#FFF8EE', color: '#111111', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', fontFamily: 'Bebas Neue, cursive', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>TAKKERU</h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#D62828' }}>BOBA • MATCHA BOBA • SODA • MANDU • RAMEN • TTEOKBOKKI</p>
          <p style={{ color: '#555', fontSize: '0.875rem', marginTop: '2rem' }}>Something went wrong. Please refresh the page.</p>
          <a href="/" style={{ marginTop: '1.5rem', padding: '0.9rem 2rem', background: '#D62828', color: '#FFF8EE', textDecoration: 'none', fontFamily: 'Bebas Neue, cursive', letterSpacing: '0.16em', fontSize: '1.1rem' }}>BACK TO THE FOOD</a>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      lenis.on('scroll', ScrollTrigger.update);
      const updateLenis = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
      };
    } catch {
      // Lenis init failed — page still visible
    }
  }, []);

  return (
    <ErrorBoundary>
      <main className="bg-primary text-secondary selection:bg-accent selection:text-primary overflow-x-hidden relative w-full">
        {isLoading ? (
          <LoadingScreen onComplete={handleLoadingComplete} />
        ) : (
          <div className="animate-fade-in">
            <Navbar />

            {/* ── 80% — TAKKERU FOOD: BOBA TEA FIRST ───────────── */}
            <Hero />
            <BobaFeature />
            <MatchaBoba />
            <BubbleDrink />
            <BobaFilms />
            <BrandStatement />
            <FoodStory />
            <RealFood />
            <TakkeruInMotion />
            <FoodMenu />
            <StreetCulture />
            <BrandStory />

            {/* ── 20% — TAKKERU CART BUSINESS ──────────────────── */}
            <CartTransition />
            <CartShowcase />
            <HowItWorks />
            <LocationStrategy />
            <FranchiseTiers />
            <FAQ />
            <PaymentSection />
            <ContactForm />
            <FinalCTA />

            <Footer />
            <CartDrawer />
            <Toast />
            <div className="grain-overlay" />
          </div>
        )}
      </main>
    </ErrorBoundary>
  );
}

export default App;
