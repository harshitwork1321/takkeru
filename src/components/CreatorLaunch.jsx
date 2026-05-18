import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Gift, Utensils, Camera, Award, Banknote, Users, CheckCircle2, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CreatorLaunch() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in and slide up all elements sequentially when the section enters the viewport
      gsap.from('.launch-intro > *, .launch-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    }, sectionRef);

    // Refresh ScrollTrigger after a short delay to account for other dynamic sections loading
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  const perks = [
    { icon: <Star className="w-6 h-6 text-accent" />, text: "VIP access to the official Takkeru launch event" },
    { icon: <Utensils className="w-6 h-6 text-accent" />, text: "Complimentary food and beverages during the event" },
    { icon: <Gift className="w-6 h-6 text-accent" />, text: "Exclusive Takkeru gift hampers and merchandise" },
    { icon: <Camera className="w-6 h-6 text-accent" />, text: "Professional content creation opportunities" },
    { icon: <Award className="w-6 h-6 text-accent" />, text: "Official participation certificates" },
    { icon: <Banknote className="w-6 h-6 text-accent" />, text: "Opportunity to win prizes and cash rewards up to ₹10,000" },
    { icon: <Users className="w-6 h-6 text-accent" />, text: "Early access to the Takkeru creator community and future collaborations" }
  ];

  const eligibility = [
    { icon: <CheckCircle2 className="w-6 h-6 text-highlight" />, text: "Applicants should generally have 5,000+ followers on at least one social media platform" },
    { icon: <CheckCircle2 className="w-6 h-6 text-highlight" />, text: "Content creators from anime, lifestyle, café, entertainment, food, photography, and youth culture communities are encouraged to apply" }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden border-y border-white/5 bg-primary">
      {/* Background glowing effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-highlight/5 rounded-full blur-[80px]"></div>
        {/* Subtle grid pattern for anime-tech feel */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={contentRef}>
        
        {/* Header */}
        <div className="launch-intro max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm md:text-base tracking-widest uppercase font-semibold mb-6">
            Exclusive Creator Launch Access
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-bebas">
            BE THE FIRST VISITOR OF <span className="text-accent block sm:inline">TAKKERU</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-jp">
            Takkeru Café — a Japan-inspired 2D anime-themed café experience — is preparing for its official launch. 
            As part of the pre-launch campaign, Takkeru is selecting a limited group of creators and social media personalities to experience the café before the public opening.
          </p>
        </div>

        {/* Content Grid */}
        <div className="launch-cards-container grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          
          {/* Perks Card */}
          <div className="launch-card glass rounded-2xl p-8 md:p-10 hover:-translate-y-2 transition-transform duration-300 border-white/10 hover:border-accent/30 group">
            <h3 className="text-3xl font-bebas text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-accent rounded-full"></span>
              What You Receive
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Selected participants will receive access to an exclusive launch experience designed around content creation, community engagement, Japanese-inspired aesthetics, and premium hospitality.
            </p>
            <ul className="space-y-5">
              {perks.map((perk, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-black/30 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">{perk.icon}</div>
                  <span className="text-gray-200 leading-snug pt-1.5">{perk.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Eligibility & Note */}
          <div className="space-y-8 md:space-y-12 flex flex-col">
            
            {/* Eligibility Card */}
            <div className="launch-card glass rounded-2xl p-8 md:p-10 hover:-translate-y-2 transition-transform duration-300 border-white/10 hover:border-highlight/30 flex-grow">
              <h3 className="text-3xl font-bebas text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-highlight rounded-full"></span>
                Eligibility Criteria
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The experience is designed for creators who actively produce engaging content and maintain a strong audience presence aligned with Takkeru’s creative identity and community culture.
              </p>
              <ul className="space-y-6">
                {eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1">{item.icon}</div>
                    <span className="text-gray-200 leading-snug">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selection Note Card */}
            <div className="launch-card bg-black/40 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              <h4 className="text-xl font-bebas text-white/80 mb-3 uppercase tracking-wider">Selection Note</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Due to limited event capacity, only selected applicants will receive confirmation from the Takkeru team. Shortlisted participants will be contacted directly with further details regarding the launch event.
              </p>
            </div>
            
          </div>
        </div>

        {/* CTA Footer */}
        <div className="launch-footer max-w-3xl mx-auto text-center mt-12 md:mt-16">
          <p className="text-gray-300 mb-8 text-lg font-jp">
            Interested creators may complete the registration form below to be considered for the early access launch program.
          </p>
          <a 
            id="cta-creator-register"
            href="https://docs.google.com/forms/d/e/1FAIpQLScQaHbRVaINq-BZ4MniRXe3uzflUCmk-y5g5iT8D24M48fB-g/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Register now for the Takkeru exclusive café creator launch event"
            style={{ 
              display: 'inline-block',
              backgroundColor: 'transparent', 
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '16px 48px',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '24px',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              transition: 'all 0.4s ease',
              marginTop: '16px'
            }}
            className="hover:bg-white hover:text-[#111111] hover:border-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            REGISTER NOW
          </a>
        </div>

      </div>
    </section>
  );
}
