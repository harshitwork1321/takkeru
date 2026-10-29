import type { BobaOption, BobaSelection } from '../../types/boba';

interface BobaPreviewProps {
  flavor: BobaOption | null;
  selection: BobaSelection;
  className?: string;
}

function pearls(hasPearls: boolean) {
  if (!hasPearls) return [];
  return [
    { left: '18%', bottom: '9%', size: 13 },
    { left: '32%', bottom: '6%', size: 14 },
    { left: '47%', bottom: '10%', size: 13 },
    { left: '61%', bottom: '6%', size: 14 },
    { left: '75%', bottom: '9%', size: 13 },
    { left: '25%', bottom: '16%', size: 12 },
    { left: '40%', bottom: '18%', size: 12 },
    { left: '55%', bottom: '16%', size: 12 },
    { left: '68%', bottom: '18%', size: 12 },
    { left: '50%', bottom: '24%', size: 11 },
  ];
}

export default function BobaPreview({ flavor, selection, className = '' }: BobaPreviewProps) {
  const tint = flavor?.tint ?? '#D8A46A';
  const hasPearls = (selection.toppingIds ?? []).includes('tapioca-pearls');
  const hasSyrup = (selection.toppingIds ?? []).includes('brown-sugar-syrup');
  const hasIce = selection.iceId !== 'no-ice';
  const isLarge = selection.sizeId === 'large';
  const initial = (flavor?.name ?? 'Boba').slice(0, 1);

  return (
    <figure className={`relative ${className}`} aria-hidden="true">
      <div
        className={`relative mx-auto transition-all duration-300 ${
          isLarge ? 'h-[420px] w-[240px]' : 'h-[380px] w-[210px]'
        }`}
      >
        {/* Straw */}
        <div className="absolute -top-4 left-1/2 z-20 h-16 w-5 -translate-x-1/2 rotate-6 rounded-full bg-accent" />
        {/* Cup rim */}
        <div className="absolute -top-1 left-1/2 z-10 h-4 w-[104%] -translate-x-1/2 rounded-full border-2 border-white/40 bg-white/10" />
        {/* Cup body */}
        <div className="absolute inset-x-0 bottom-0 top-3 overflow-hidden rounded-b-[48%] rounded-t-[12%] border-2 border-white/35 bg-white/[0.06] backdrop-blur-[2px]">
          {/* Liquid */}
          <div
            className="absolute inset-x-0 bottom-0 transition-all duration-300"
            style={{
              height: isLarge ? '82%' : '76%',
              background: `linear-gradient(180deg, ${tint}E6 0%, ${tint} 55%, ${tint}CC 100%)`,
            }}
          />
          {/* Brown sugar drizzle */}
          {hasSyrup && (
            <div className="absolute inset-x-0 bottom-0 h-[70%] opacity-70">
              <span className="absolute left-[22%] top-0 h-full w-1.5 rounded-full bg-[#4A2C18]/55" />
              <span className="absolute left-[48%] top-3 h-full w-2 rounded-full bg-[#4A2C18]/45" />
              <span className="absolute left-[72%] top-0 h-full w-1.5 rounded-full bg-[#4A2C18]/55" />
            </div>
          )}
          {/* Ice cubes */}
          {hasIce && (
            <div className="absolute inset-x-0 top-[12%] h-20">
              <span className="absolute left-[20%] top-0 h-8 w-8 rotate-12 rounded-md border border-white/50 bg-white/35" />
              <span className="absolute left-[46%] top-4 h-7 w-7 -rotate-6 rounded-md border border-white/50 bg-white/30" />
              <span className="absolute left-[64%] top-0 h-8 w-8 rotate-12 rounded-md border border-white/50 bg-white/35" />
            </div>
          )}
          {/* Pearls */}
          {pearls(hasPearls).map((pearl, index) => (
            <span
              key={index}
              className="absolute rounded-full bg-[#2B1A12] shadow-[inset_-2px_-2px_3px_rgba(255,255,255,0.15)]"
              style={{ left: pearl.left, bottom: pearl.bottom, width: pearl.size, height: pearl.size }}
            />
          ))}
          {/* Image fallback / flavor chip behind the liquid glass */}
          {flavor?.image && (
            <img
              src={flavor.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.18] mix-blend-luminosity"
            />
          )}
        </div>
        {/* Cup label */}
        <div className="absolute left-1/2 top-[38%] z-10 w-[76%] -translate-x-1/2 rounded-xl border border-white/25 bg-primary/80 px-3 py-2 text-center">
          <p className="font-bebas text-xl leading-none tracking-[0.12em] text-white">
            {flavor?.name ?? 'Classic Milk Tea'}
          </p>
          <p className="mt-1 font-inter text-[10px] uppercase tracking-[0.2em] text-subtle/60">
            {selection.sizeId === 'large' ? 'Large' : 'Regular'} cup
          </p>
        </div>
        {/* Fallback initial when no image at all */}
        {!flavor?.image && (
          <span className="absolute right-2 top-10 grid h-12 w-12 place-items-center rounded-full border border-golden/60 bg-primary/80 font-bebas text-2xl text-golden">
            {initial}
          </span>
        )}
      </div>
      <figcaption className="mt-4 text-center font-inter text-sm leading-relaxed text-subtle/50">
        <span className="font-semibold text-white">In this cup: </span>
        <span>
          {[flavor?.name, selection.sweetnessId?.replace('-', ' '), selection.iceId?.replace(/-/g, ' '), hasPearls ? 'tapioca pearls' : null, hasSyrup ? 'brown sugar syrup' : null]
            .filter(Boolean)
            .join(', ')}
          .
        </span>
      </figcaption>
    </figure>
  );
}
