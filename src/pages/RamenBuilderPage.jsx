import { useEffect, useMemo, useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, Leaf, Soup } from 'lucide-react';
import CartButton from '../components/cart/CartButton';
import CartDrawer from '../components/cart/CartDrawer';
import Toast from '../components/cart/Toast';
import useCart from '../hooks/useCart';
import { RAMEN_CATALOG } from '../data/ramenCatalog';
import { STEPS } from '../data/ramenSteps';
import { quoteRamen } from '../lib/ramenPrice';
import { resetSelection, toggleId, selectExtra } from '../lib/ramenSelection';
import { makeBowl } from '../lib/ramenCart';
import { formatPrice } from '../lib/cart';
import BowlSummary from '../components/ramen/BowlSummary';
import StepRail from '../components/ramen/StepRail';
import {
  BaseSelector,
  BrothSelector,
  SpiceSelector,
  ToppingSelector,
  ExtrasSelector,
} from '../components/ramen/Selectors';

const STAGE_COPY = {
  base: {
    title: '1. Choose your base',
    sub: 'The foundation of your perfect bowl.',
    image: '/images/noodle-board.jpg',
    imageAlt: 'Fresh ramen noodles on a wooden board with scallions and sesame',
  },
  broth: {
    title: '2. Choose your broth',
    sub: 'Pick your flavor.',
    image: '/images/tonkotsu.jpg',
    imageAlt: 'Creamy tonkotsu broth in a black bowl',
  },
  spice: {
    title: '3. Choose your spice level',
    sub: 'Set the heat.',
    image: '/images/hero-bowl.jpg',
    imageAlt: 'Finished ramen bowl with chili and scallions',
  },
  toppings: {
    title: '4. Add toppings',
    sub: 'Add your favorites.',
    image: '/images/hero-bowl.jpg',
    imageAlt: 'Ramen topped with pork, egg and nori',
  },
  extras: {
    title: '5. Add extras',
    sub: 'Make it extra.',
    image: '/images/noodle-board.jpg',
    imageAlt: 'A nest of ramen noodles ready to cook',
  },
  review: {
    title: '6. Review your bowl',
    sub: 'Check your bowl.',
    image: '/images/hero-bowl.jpg',
    imageAlt: 'Signature ramen bowl',
  },
};

const WHY = [
  {
    icon: Soup,
    title: 'Authentic flavors',
    body: 'Inspired by Japanese and Korean cuisine',
  },
  {
    icon: Leaf,
    title: 'Fresh ingredients',
    body: 'No shortcuts, just real taste',
  },
  {
    icon: Heart,
    title: 'Made with care',
    body: 'For true food lovers',
  },
];

function scrollToBuilder() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('build')?.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  });
}

export default function RamenBuilderPage() {
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const [selection, setSelection] = useState(resetSelection);
  const [step, setStep] = useState('base');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quote = useMemo(() => quoteRamen(RAMEN_CATALOG, selection), [selection]);
  const ingredientNames = quote.lines.filter((line) => line.group !== 'bowl').map((line) => line.name);
  const stage = STAGE_COPY[step];
  const stepIndex = STEPS.findIndex((item) => item.id === step);

  const statusText = quote.purchasable
    ? `Estimated price ${formatPrice(quote.totalInr)}. Bowl ready to add to cart.`
    : `Price unavailable. ${
        quote.unpricedNames.length > 0
          ? `${quote.unpricedNames.join(', ')} ${quote.unpricedNames.length > 1 ? 'are' : 'is'} not on the published menu.`
          : 'Choose a published base, broth and spice level.'
      }`;

  const edit = (nextStep) => {
    setStep(nextStep);
    scrollToBuilder();
  };

  const handleAddToCart = () => {
    const bowl = makeBowl(selection);
    if (!bowl) return;
    const added = addItem(RAMEN_CATALOG.signatureProductId, bowl);
    if (added) openCart();
  };

  const handleRemoveTopping = (id) =>
    setSelection((current) => ({ ...current, toppingIds: toggleId(current.toppingIds, id) }));

  const handleRemoveExtra = (id) =>
    setSelection((current) => ({
      ...current,
      extraIds: selectExtra(RAMEN_CATALOG, current.extraIds, id),
    }));

  const handleReset = () => setSelection(resetSelection());

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-primary text-secondary relative overflow-x-hidden">
        <div className="grain-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

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
                    ラーメン
                  </p>
                  <span className="[writing-mode:vertical-rl] border border-accent px-1 py-2 font-jp text-xs text-accent">
                    最高
                  </span>
                </div>
                <p className="font-bebas text-sm uppercase tracking-[0.4em] text-accent">
                  Smash · Slurp · Sip
                </p>
                <h1 className="mt-4 font-bebas uppercase leading-[0.9] tracking-wide text-white text-5xl sm:text-6xl xl:text-7xl">
                  Your ramen.
                  <span className="mt-1 block">Your rules.</span>
                </h1>
                <p className="mt-5 max-w-md font-inter text-base sm:text-lg text-subtle/60">
                  Build your bowl, choose your heat, and make every slurp your own.
                </p>
                <button
                  type="button"
                  onClick={scrollToBuilder}
                  className="group mt-6 inline-flex min-h-12 items-center gap-3 rounded-xl bg-accent px-6 font-bebas text-lg uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden"
                >
                  Build my bowl
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Middle — live bowl preview */}
              <figure className="relative mx-auto w-full max-w-md lg:max-w-lg xl:max-w-md">
                <div className="pointer-events-none absolute -top-6 right-0 z-10 hidden w-36 text-right sm:block">
                  <p className="font-inter text-sm italic leading-tight text-white/80">
                    Fresh ingredients
                    <br />
                    Bold flavors
                    <br />
                    Real ramen
                  </p>
                  <span className="ml-auto mt-2 block h-0.5 w-16 -rotate-2 bg-accent" />
                </div>
                <div className="aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                  <img
                    src="/images/hero-bowl.jpg"
                    alt="Photograph of a ramen bowl with chashu pork, soft-boiled egg, nori and scallions"
                    width={1408}
                    height={1408}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 font-inter text-sm leading-relaxed text-subtle/50">
                  <span className="font-semibold text-white">In this bowl: </span>
                  <span>
                    {ingredientNames.length > 0 ? ingredientNames.join(', ') : 'Nothing selected yet'}.
                  </span>
                </figcaption>
              </figure>

              {/* Right — live summary card */}
              <BowlSummary
                quote={quote}
                variant="card"
                onEdit={edit}
                onRemoveTopping={handleRemoveTopping}
                onRemoveExtra={handleRemoveExtra}
                onReset={handleReset}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </section>

        {/* ── Section B — Step rail ───────────────────────────── */}
        <StepRail current={step} onChange={setStep} />

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
                  {step === 'base' && (
                    <BaseSelector
                      value={selection.baseId}
                      onChange={(id) => setSelection((current) => ({ ...current, baseId: id }))}
                    />
                  )}
                  {step === 'broth' && (
                    <BrothSelector
                      value={selection.brothId}
                      onChange={(id) => setSelection((current) => ({ ...current, brothId: id }))}
                    />
                  )}
                  {step === 'spice' && (
                    <SpiceSelector
                      value={selection.spiceLevelId}
                      onChange={(id) => setSelection((current) => ({ ...current, spiceLevelId: id }))}
                    />
                  )}
                  {step === 'toppings' && (
                    <ToppingSelector
                      value={selection.toppingIds}
                      onToggle={(id) =>
                        setSelection((current) => ({
                          ...current,
                          toppingIds: toggleId(current.toppingIds, id),
                        }))
                      }
                    />
                  )}
                  {step === 'extras' && (
                    <ExtrasSelector
                      value={selection.extraIds}
                      onChange={(id) =>
                        setSelection((current) => ({
                          ...current,
                          extraIds: selectExtra(RAMEN_CATALOG, current.extraIds, id),
                        }))
                      }
                    />
                  )}
                </div>
                <div className="mt-6 flex gap-3">
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(STEPS[stepIndex - 1].id)}
                      className="min-h-11 rounded-xl border border-white/15 px-5 font-bebas text-base uppercase tracking-[0.15em] text-subtle/70 hover:border-accent hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(STEPS[stepIndex + 1].id)}
                    className="min-h-11 rounded-xl bg-accent px-5 font-bebas text-base uppercase tracking-[0.15em] text-white hover:bg-white hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden"
                  >
                    Next
                  </button>
                </div>
              </motion.div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <img
                  src={stage.image}
                  alt={stage.imageAlt}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>

              <aside>
                <h3 className="font-bebas text-xs uppercase tracking-[0.2em] text-white">
                  Why TAKKERU ramen?
                </h3>
                <ul className="mt-5 space-y-5">
                  {WHY.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-golden/50 text-golden">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-inter text-sm font-semibold text-white">
                          {item.title}
                        </span>
                        <span className="block font-inter text-sm text-subtle/50">{item.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 block h-px w-16 bg-accent" />
              </aside>
            </div>
          ) : (
            <div className="max-w-2xl">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white">{stage.title}</h2>
              <p className="mt-2 font-inter text-subtle/50">{stage.sub}</p>
              <div className="mt-6">
                <BowlSummary
                  quote={quote}
                  variant="review"
                  onEdit={edit}
                  onRemoveTopping={handleRemoveTopping}
                  onRemoveExtra={handleRemoveExtra}
                  onReset={handleReset}
                  onAddToCart={handleAddToCart}
                />
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(STEPS[stepIndex - 1].id)}
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
