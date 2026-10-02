import { useRef, useState, useEffect, useCallback } from 'react';

export default function LazyVideo({
  src,
  poster,
  fallbackImage,
  className = '',
  containerClassName = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  fit = 'cover',
  backdrop = false,
  objectPosition = 'center',
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleIntersection = useCallback((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsVisible(true);
      // Play on every re-entry (e.g. marquee items scrolling back into view)
      const video = videoRef.current;
      if (video) {
        const playPromise = video.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      }
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '200px',
      threshold: 0,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;
    const video = videoRef.current;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — poster stays visible
      });
    }
  }, [isVisible, isLoaded]);

  const handleError = () => setHasError(true);
  const handleLoadedData = () => setIsLoaded(true);

  const showFallback = hasError || !src;
  const safePoster = poster || fallbackImage;
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-primary ${containerClassName}`}
    >
      {/* Blurred backdrop — keeps portrait video from ever sitting on a black box */}
      {backdrop && safePoster && (
        <img
          src={safePoster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full scale-125 object-cover blur-2xl transition-opacity duration-500 ${isLoaded && !hasError ? 'opacity-55' : 'opacity-100'}`}
        />
      )}

      {/* Poster / fallback image — always rendered for safety */}
      {safePoster && !backdrop && (
        <img
          src={safePoster}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isLoaded && !hasError ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
        />
      )}

      {/* Full-bleed fallback if the video fails to load */}
      {hasError && safePoster && (
        <img
          src={safePoster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}

      {/* Video — only render src once visible */}
      {!showFallback && (
        <video
          ref={videoRef}
          src={isVisible ? src : undefined}
          poster={undefined}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          onError={handleError}
          onLoadedData={handleLoadedData}
          style={{ objectPosition }}
          className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        />
      )}
    </div>
  );
}
