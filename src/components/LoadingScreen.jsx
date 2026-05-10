import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: onComplete,
        });
      },
    });

    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Slightly faster playback
    }

    tl.fromTo(textRef.current, 
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtextRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.7, y: 0, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    )
    .to(containerRef.current, {
      duration: 0.5,
    }) // Short pause
    .to([textRef.current, subtextRef.current], {
      opacity: 0,
      y: -30,
      filter: 'blur(10px)',
      duration: 0.7,
      ease: 'power3.in',
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 scale-110"
      >
        <source src="/videos/loader-sketch-loop.mp4" type="video/mp4" />
      </video>
      
      <div className="relative z-10 text-center">
        <h1 
          ref={textRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bebas text-secondary tracking-[0.2em]"
        >
          TAKKERU
        </h1>
        <p 
          ref={subtextRef}
          className="mt-4 text-sm md:text-base font-inter text-secondary tracking-[0.3em] uppercase opacity-0"
        >
          Anime 2D Theme Café of Delhi
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-white/20">
        <div className="h-full bg-accent w-0 animate-[loading_2.5s_ease-in-out_forwards]"></div>
      </div>
      
      <div className="grain-overlay" />
    </div>
  );
}
