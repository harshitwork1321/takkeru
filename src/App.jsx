import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import FoodSection from './components/FoodSection';
import FoodExperience from './components/FoodExperience';
import ProductShowcase from './components/ProductShowcase';
import Campaigns from './components/Campaigns';
import FanClub from './components/FanClub';
import InfoSection from './components/InfoSection';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scroll
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
    <main className="bg-primary text-secondary selection:bg-accent selection:text-primary">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="animate-fade-in">
          <Navbar />
          <Hero />
          <div id="about">
            <Story />
          </div>
          <FoodSection />
          <FoodExperience />
          <div id="products">
            <ProductShowcase />
          </div>
          <div id="campaigns">
            <Campaigns />
          </div>
          <div id="fan-club">
            <FanClub />
          </div>
          <InfoSection />
          <Gallery />
          <div id="menu">
            <Menu />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
          <Footer />
          
          <div className="grain-overlay" />
        </div>
      )}
    </main>
  );
}

export default App;
