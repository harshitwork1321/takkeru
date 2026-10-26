import { useState, useCallback } from 'react';
import { MapPin, Navigation, Play, X } from 'lucide-react';
import { STATUS_LABELS } from '../../data/locations';

const STATUS_STYLES = {
  open: 'border-emerald-400/60 bg-black/70 text-emerald-300',
  closed: 'border-white/30 bg-black/70 text-white/70',
  'coming-soon': 'border-accent/70 bg-black/70 text-accent',
  unconfirmed: 'border-golden/60 bg-black/70 text-golden',
};

/**
 * One location card: poster-first media, click-to-mount native video with
 * controls (never autoplay-with-sound on load), optional address, hours and
 * directions link — only rendered from config, never fabricated.
 */
export default function LocationCard({ location, isActive, onActivate }) {
  const [failed, setFailed] = useState(false);

  const hasVideo = Boolean(location.video) && !failed;

  // isActive (owned by the parent) is the single source of truth: starting a
  // video on one card automatically unmounts and stops any other card's video.
  const handleToggle = useCallback(() => {
    if (!location.video || failed) return;
    onActivate(isActive ? null : location.id);
  }, [failed, isActive, location.id, location.video, onActivate]);

  const handleStart = useCallback(() => {
    onActivate(location.id);
  }, [location.id, onActivate]);

  return (
    <article className="group flex h-full flex-col border border-white/10 bg-[#181818] transition-colors duration-300 hover:border-accent/50">
      {/* ── Media ─────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
        {hasVideo && isActive ? (
          <video
            key={location.id}
            src={location.video}
            poster={location.poster}
            controls
            autoPlay
            playsInline
            preload="none"
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <>
            <img
              src={location.poster}
              alt={location.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {location.video && !failed && (
              <button
                type="button"
                onClick={handleStart}
                aria-label={`Watch the location video for ${location.name}`}
                className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/55 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-white text-white" aria-hidden="true" />
                </span>
              </button>
            )}
            {failed && (
              <span className="absolute bottom-3 left-3 border border-white/20 bg-black/70 px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Video unavailable
              </span>
            )}
          </>
        )}

        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 border px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.18em] ${STATUS_STYLES[location.status] || STATUS_STYLES.unconfirmed}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${location.status === 'open' ? 'bg-emerald-300' : location.status === 'coming-soon' ? 'bg-accent animate-pulse' : 'bg-white/50'}`}
            aria-hidden="true"
          />
          {STATUS_LABELS[location.status] || STATUS_LABELS.unconfirmed}
        </span>

        {hasVideo && isActive && (
          <button
            type="button"
            onClick={handleToggle}
            aria-label={`Close the location video for ${location.name}`}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-white/30 bg-black/70 text-white transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-bebas text-2xl leading-none tracking-[0.05em] text-[#FFF8EE] sm:text-3xl">
          {location.name}
        </h3>
        <p className="mt-2 flex items-center gap-2 font-inter text-sm text-white/55">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
          {location.city}
        </p>

        {location.address && (
          <p className="mt-3 font-inter text-sm leading-relaxed text-white/65">{location.address}</p>
        )}
        {location.hours && (
          <p className="mt-1.5 font-inter text-sm text-white/50">{location.hours}</p>
        )}

        <p className="mt-4 font-inter text-sm leading-relaxed text-white/45">{location.sub}</p>

        {/* ── Actions ─────────────────────────────────────── */}
        <div className="mt-auto pt-5">
          {hasVideo ? (
            <button
              type="button"
              onClick={handleToggle}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-white/20 px-4 py-3 font-bebas text-base tracking-[0.14em] text-white/85 transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              {isActive ? 'CLOSE VIDEO' : 'WATCH LOCATION VIDEO'}
            </button>
          ) : (
            <p className="font-inter text-[11px] uppercase tracking-[0.2em] text-white/35">
              Location video coming soon
            </p>
          )}

          {location.directionsUrl && (
            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-bebas text-base tracking-[0.14em] text-accent underline decoration-accent/40 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              GET DIRECTIONS
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
