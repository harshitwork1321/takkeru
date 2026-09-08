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
        // Autoplay blocked — video still visible as poster
      });
    }
  }, [isVisible, isLoaded]);

  const handleError = () => {
    setHasError(true);
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const showFallback = hasError || !src;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
      {/* Poster / fallback image — always rendered for safety */}
      {poster && (
        <img
          src={poster}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded && !hasError ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
        />
      )}

      {/* Fallback image if video fails */}
      {hasError && fallbackImage && (
        <img
          src={fallbackImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Video — only render src when visible */}
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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        />
      )}
    </div>
  );
}
