import { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';

export default function FlavorCard({ flavor, index, isActive, onActivate }) {
  const videoRef = useRef(null);
  const [mode, setMode] = useState('poster');

  useEffect(() => {
    if (mode === 'playing' && !isActive && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [mode, isActive]);

  const number = String(index + 1).padStart(2, '0');

  const handlePlay = () => {
    setMode('playing');
    onActivate(flavor.id);
  };

  const handleClose = () => {
    if (videoRef.current) videoRef.current.pause();
    setMode('poster');
  };

  const handleError = () => setMode('error');

  return (
    <article className="group w-full max-w-[400px]">
      <div className="relative aspect-[9/16] overflow-hidden border-2 border-white/15 bg-black transition-colors duration-300 group-hover:border-accent/70">
        <img
          src={flavor.poster}
          alt={flavor.posterAlt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
            mode === 'playing' ? 'opacity-0' : 'opacity-100 group-hover:scale-[1.03]'
          }`}
        />

        {mode === 'playing' && (
          <video
            ref={videoRef}
            src={flavor.video}
            poster={flavor.poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            onError={handleError}
            aria-label={flavor.videoLabel}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {mode === 'poster' && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={flavor.videoLabel}
            className="absolute inset-0 z-10 flex items-center justify-center focus-visible:outline-none"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-black/45 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[2px] transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-active:scale-95 group-focus-visible:ring-4 group-focus-visible:ring-accent/70">
              <Play className="ml-0.5 h-6 w-6 fill-current" strokeWidth={0} />
            </span>
          </button>
        )}

        {mode === 'playing' && (
          <button
            type="button"
            onClick={handleClose}
            aria-label={`Close ${flavor.name} video`}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white/90 backdrop-blur-[2px] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {mode === 'error' && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap border border-white/25 bg-black/70 px-3 py-1.5 font-bebas text-sm tracking-[0.2em] text-white/85">
            PREVIEW UNAVAILABLE
          </span>
        )}

        {mode !== 'playing' && (
          <>
            <span className="pointer-events-none absolute left-4 top-3 select-none border border-white/25 bg-black/55 px-2.5 py-1 font-bebas text-sm tracking-[0.2em] text-white/95 backdrop-blur-[2px]">
              {number}
            </span>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
            <span className="pointer-events-none absolute bottom-4 left-4 font-jp text-xs tracking-[0.3em] text-white/90">
              {flavor.japanese}
            </span>
          </>
        )}
      </div>

      <div className="mt-5">
        <h3 className="font-bebas text-3xl leading-none tracking-[0.08em] text-white">
          {flavor.name}
        </h3>
        <p className="mt-3 font-inter text-sm leading-relaxed text-white/65">
          {flavor.description}
        </p>
      </div>
    </article>
  );
}
