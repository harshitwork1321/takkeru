import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { url: "/images/Lady.jpeg", title: "Elegance in 2D", jp: "エレガンス" },
  { url: "/images/girl.png", title: "Tokyo Dreamer", jp: "夢見る人" },
  { url: "/images/boy.jpeg", title: "Urban Youth", jp: "都市の若者" },
  { url: "/images/men.png", title: "Noir Shadows", jp: "ノワールの影" },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative bg-primary">
          
          <div className="h-full w-[100vw] flex flex-col justify-center px-12 md:px-40">
            <span className="text-accent font-jp tracking-[0.4em] mb-4">体験</span>
            <h2 className="text-6xl md:text-[10rem] leading-none mb-8">2D EXPERIENCE<br />GALLERY</h2>
            <div className="flex items-center gap-6">
              <div className="w-20 h-[1px] bg-white/30" />
              <p className="text-subtle/40 uppercase tracking-[0.3em] text-sm">Scroll to traverse the dream</p>
            </div>
          </div>

          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className="h-full w-[100vw] flex items-center justify-center relative px-10 md:px-20">
              <div className="relative h-[70vh] w-full overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                />
                <div className="absolute bottom-10 left-10 text-white z-10">
                  <p className="text-accent font-jp text-2xl mb-2">{img.jp}</p>
                  <h3 className="text-4xl font-bebas tracking-widest">{img.title}</h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
