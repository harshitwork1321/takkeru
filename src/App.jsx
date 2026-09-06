import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CartShowcase from './components/CartShowcase';
import FoodMenu from './components/FoodMenu';
import BusinessModel from './components/BusinessModel';
import HowItWorks from './components/HowItWorks';
import FranchiseInvestment from './components/FranchiseInvestment';
import BusinessEconomics from './components/BusinessEconomics';
import CustomerReviews from './components/CustomerReviews';
import BrandStory from './components/BrandStory';
import FinalCTA from './components/FinalCTA';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FAQ from './components/FAQ';

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
          <CartShowcase />
          <FoodMenu />
          <BusinessModel />
          <HowItWorks />
          <FranchiseInvestment />
          <BusinessEconomics />
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
  );
}

export default App;