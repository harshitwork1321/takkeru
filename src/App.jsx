import { useState, useEffect, Component } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroStats from './components/HeroStats';
import CartShowcase from './components/CartShowcase';
import FranchiseTiers from './components/FranchiseTiers';
import FoodMenu from './components/FoodMenu';
import BusinessEconomics from './components/BusinessEconomics';
import HowItWorks from './components/HowItWorks';
import LocationStrategy from './components/LocationStrategy';
import StreetCulture from './components/StreetCulture';
import RealFood from './components/RealFood';
import CustomerReviews from './components/CustomerReviews';
import BrandStory from './components/BrandStory';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

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
        <div style={{ background: '#0A0A0A', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', fontFamily: 'Bebas Neue, cursive', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>TAKKERU</h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>YOUR BUSINESS. ON WHEELS.</p>
          <p style={{ color: '#888', fontSize: '0.875rem', marginTop: '2rem' }}>Something went wrong. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

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

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);

      return () => { lenis.destroy(); };
    } catch {
      // Lenis init failed — page still visible
    }
  }, []);

  return (
    <ErrorBoundary>
      <main className="bg-primary text-secondary selection:bg-accent selection:text-primary overflow-x-hidden relative w-full">
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <div className="animate-fade-in">
            <Navbar />
            <Hero />
            <HeroStats />
            <CartShowcase />
            <FoodMenu />
            <FranchiseTiers />
            <BusinessEconomics />
            <HowItWorks />
            <LocationStrategy />
            <StreetCulture />
            <RealFood />
            <CustomerReviews />
            <BrandStory />
            <FAQ />
            <FinalCTA />
            <ContactForm />
            <Footer />
            <div className="grain-overlay" />
          </div>
        )}
      </main>
    </ErrorBoundary>
  );
}

export default App;
