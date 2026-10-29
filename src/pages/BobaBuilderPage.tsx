import { useEffect, useMemo, useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CartButton from '../components/cart/CartButton';
import CartDrawer from '../components/cart/CartDrawer';
import Toast from '../components/cart/Toast';
import useCart from '../hooks/useCart';
import { BOBA_CATALOG } from '../data/bobaCatalog';
import { BOBA_STEPS } from '../data/bobaSteps';
import { quoteBoba } from '../lib/bobaPrice';
import { resetBobaSelection, toggleId } from '../lib/bobaSelection';
import { makeBobaDrink } from '../lib/bobaCart';
import { formatPrice } from '../lib/cart';
import BobaSummary from '../components/boba/BobaSummary';
import BobaStepRail from '../components/boba/BobaStepRail';
import BobaPreview from '../components/boba/BobaPreview';
import BobaWhy from '../components/boba/BobaWhy';
import {
  FlavorSelector,
  SweetnessSelector,
  IceSelector,
  ToppingSelector,
  CupSizeSelector,
} from '../components/boba/Selectors';

const STAGE_COPY: Record<string, { title: string; sub: string }> = {
  flavor: {
    title: '1. Choose your flavor',
    sub: 'Four ways to sip — all at the published price.',
  },
  sweetness: {
    title: '2. Choose your sweetness',
    sub: 'From barely sweet to dessert sweet.',
  },
  ice: {
    title: '3. Choose your ice',
    sub: 'Set the chill.',
  },
  toppings: {
    title: '4. Add toppings',
    sub: 'Pearls included; off-menu extras block checkout.',
  },
  size: {
    title: '5. Choose your cup size',
    sub: 'Regular or Large (+₹50).',
  },
  review: {
    title: '6. Review your boba',
    sub: 'Check your cup before it joins the cart.',
  },
};

function scrollToBuilder() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('build')?.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  });
}

export default function BobaBuilderPage() {
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const [selection, setSelection] = useState(resetBobaSelection);
  const [step, setStep] = useState('flavor');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quote = useMemo(() => quoteBoba(BOBA_CATALOG, selection), [selection]);
  const stage = STAGE_COPY[step];
  const stepIndex = BOBA_STEPS.findIndex((item) => item.id === step);
  const flavor = BOBA_CATALOG.flavors.find((f) => f.id === selection.flavorId) ?? null;

  const statusText = quote.purchasable
    ? `Estimated price ${formatPrice(quote.totalInr)}. Drink ready to add to cart.`
    : `Price unavailable. ${
        quote.unpricedNames.length > 0
          ? `${quote.unpricedNames.join(', ')} ${quote.unpricedNames.length > 1 ? 'are' : 'is'} not on the published menu.`
          : 'Choose a published flavor, sugar level, ice level and cup size.'
      }`;

  const edit = (nextStep: string) => {
    setStep(nextStep);
    scrollToBuilder();
  };

  const handleAddToCart = () => {
    const boba = makeBobaDrink(selection);
    if (!boba) return;
    const added = addItem(BOBA_CATALOG.productId, null, boba);
    if (added) openCart();
  };

  const handleToggleTopping = (id: string) =>
    setSelection((current) => ({ ...current, toppingIds: toggleId(current.toppingIds, id) }));

  const handleRemoveExtra = (id: string) =>
    setSelection((current) => ({
      ...current,
      extraIds: current.extraIds.filter((item) => item !== id),
    }));

  const handleReset = () => setSelection(resetBobaSelection());

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-primary text-secondary relative overflow-x-hidden">
        <div className="grain-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-golden/10 rounded-full blur-[120px] pointer-events-none" />

        {/* ── Top bar ─────────────────────────────────────────── */}
        <div className="container mx-auto px-6 pt-6 relative z-10 flex items-center justify-between gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-subtle/40 hover:text-accent transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-bebas tracking-[0.2em] text-lg uppercase">Back to Home</span>
          </motion.button>
          <CartButton />
        </div>

        {/* ── Section A — Editorial intro + live summary ──────── */}
        <section className="relative">
          <div className="container mx-auto px-6">
            <div className="grid items-center gap-8 pt-8 pb-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_320px]">
              {/* Left — headline */}
              <div className="relative z-10 max-w-xl xl:pl-14">
                <div className="hidden xl:absolute xl:left-0 xl:top-1 xl:flex xl:flex-col xl:gap-3">
                  <p className="[writing-mode:vertical-rl] font-jp text-sm tracking-[0.3em] text-subtle/50">
                    ボバティー
                  </p>
                  <span className="[writing-mode:vertical-rl] border border-golden px-1 py-2 font-jp text-xs text-golden">
                    最高
                  </span>
                </div>
                <p className="font-bebas text-sm uppercase tracking-[0.4em] text-accent">
                  Smash · Slurp · Sip
                </p>
                <h1 className="mt-4 font-bebas uppercase leading-[0.9] tracking-wide text-white text-5xl sm:text-6xl xl:text-7xl">
                  Your boba.
                  <span className="mt-1 block">Your vibe.</span>
                </h1>
                <p className="mt-5 max-w-md font-inter text-base sm:text-lg text-subtle/60">
                  Pick your flavor, set the sweetness and ice, load the pearls — every cup is yours alone.
                </p>
                <button
                  type="button"
                  onClick={scrollToBuilder}
                  className="group mt-6 inline-flex min-h-12 items-center gap-3 rounded-xl bg-accent px-6 font-bebas text-lg uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden"
                >
                  Build my boba
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Middle — live cup preview */}
              <BobaPreview flavor={flavor} selection={selection} className="mx-auto w-full max-w-md lg:max-w-lg xl:max-w-md" />

              {/* Right — live summary card */}
              <BobaSummary
                quote={quote}
                variant="card"
                onEdit={edit}
                onRemoveTopping={handleToggleTopping}
                onRemoveExtra={handleRemoveExtra}
                onReset={handleReset}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </section>

        {/* ── Section B — Step rail ───────────────────────────── */}
        <BobaStepRail current={step} onChange={setStep} />

        {/* ── Sections C–F — Builder stages ───────────────────── */}
        <section id="build" className="scroll-mt-6 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <p role="status" aria-live="polite" className="sr-only">
            {statusText}
          </p>

          {step !== 'review' ? (
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_260px]">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 className="font-bebas text-3xl sm:text-4xl text-white">{stage.title}</h2>
                <p className="mt-2 font-inter text-subtle/50">{stage.sub}</p>
                <div className="mt-6">
                  {step === 'flavor' && (
                    <FlavorSelector
                      value={selection.flavorId}
                      onChange={(id) => setSelection((current) => ({ ...current, flavorId: id }))}
                    />
                  )}
                  {step === 'sweetness' && (
                    <SweetnessSelector
                      value={selection.sweetnessId}
                      onChange={(id) => setSelection((current) => ({ ...current, sweetnessId: id }))}
                    />
                  )}
                  {step === 'ice' && (
                    <IceSelector
                      value={selection.iceId}
                      onChange={(id) => setSelection((current) => ({ ...current, iceId: id }))}
                    />
                  )}
                  {step === 'toppings' && (
                    <ToppingSelector
                      value={[...selection.toppingIds, ...selection.extraIds]}
                      onToggle={(id) => {
                        if (selection.extraIds.includes(id)) {
                          handleRemoveExtra(id);
                        } else if (selection.toppingIds.includes(id)) {
                          handleToggleTopping(id);
                        } else if (BOBA_CATALOG.extras.some((e) => e.id === id)) {
                          setSelection((current) => ({ ...current, extraIds: [...current.extraIds, id] }));
                        } else {
                          handleToggleTopping(id);
                        }
                      }}
                    />
                  )}
                  {step === 'size' && (
                    <CupSizeSelector
                      value={selection.sizeId}
                      onChange={(id) => setSelection((current) => ({ ...current, sizeId: id }))}
                    />
                  )}
                </div>
                <div className="mt-6 flex gap-3">
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(BOBA_STEPS[stepIndex - 1].id)}
                      className="min-h-11 rounded-xl border border-white/15 px-5 font-bebas text-base uppercase tracking-[0.15em] text-subtle/70 hover:border-accent hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(BOBA_STEPS[stepIndex + 1].id)}
                    className="min-h-11 rounded-xl bg-accent px-5 font-bebas text-base uppercase tracking-[0.15em] text-white hover:bg-white hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden"
                  >
                    Next
                  </button>
                </div>
              </motion.div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <img
                  src={flavor?.image ?? BOBA_CATALOG.image}
                  alt={flavor ? `${flavor.name} boba tea` : 'TAKKERU boba tea'}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>

              <BobaWhy />
            </div>
          ) : (
            <div className="max-w-2xl">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white">{stage.title}</h2>
              <p className="mt-2 font-inter text-subtle/50">{stage.sub}</p>
              <div className="mt-6">
                <BobaSummary
                  quote={quote}
                  variant="review"
                  onEdit={edit}
                  onRemoveTopping={handleToggleTopping}
                  onRemoveExtra={handleRemoveExtra}
                  onReset={handleReset}
                  onAddToCart={handleAddToCart}
                />
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(BOBA_STEPS[stepIndex - 1].id)}
                  className="min-h-11 rounded-xl border border-white/15 px-5 font-bebas text-base uppercase tracking-[0.15em] text-subtle/70 hover:border-accent hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </section>

        <CartDrawer />
        <Toast />
      </main>
    </MotionConfig>
  );
}
