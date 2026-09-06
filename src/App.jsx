import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import FoodSection from './components/FoodSection';
import CartSection from './components/CartSection';
import HowItWorks from './components/HowItWorks';
import LocationStrategy from './components/LocationStrategy';
import WhatYouGet from './components/WhatYouGet';
import Menu from './components/Menu';
import FAQ from './components/FAQ';
import CustomerReviews from './components/CustomerReviews';
import FinalCTA from './components/FinalCTA';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Toast from './components/cart/Toast';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-primary text-secondary selection:bg-accent selection:text-primary overflow-x-hidden relative w-full">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="animate-fade-in">
          <Navbar />
          <Hero />

          {/* Food showcase */}
          <FoodSection />

          {/* TAKKERU CART */}
          <CartSection />

          {/* How It Works */}
          <div id="how-it-works">
            <HowItWorks />
          </div>

          {/* Location Strategy */}
          <div id="locations">
            <LocationStrategy />
          </div>

          {/* What You Get */}
          <div id="what-you-get">
            <WhatYouGet />
          </div>

          {/* Menu */}
          <div id="menu">
            <Menu />
          </div>

          {/* Products */}
          <div id="products">
            
          </div>

          {/* FAQ */}
          <div id="faq">
            <FAQ />
          </div>

          {/* Customer Reviews */}
          <div id="reviews">
            <CustomerReviews />
          </div>

          {/* Final CTA */}
          <FinalCTA />

          {/* Contact */}
          <div id="contact">
            <ContactSection />
          </div>

          <Footer />

          <div className="grain-overlay" />
        </div>
      )}

      <CartDrawer />
      <Toast />
    </main>
  );
}

export default App;
