import { useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { ArrowUp, ShoppingBag } from 'lucide-react';
import CartDrawer from '../components/cart/CartDrawer';
import Toast from '../components/cart/Toast';
import useCart from '../hooks/useCart';
import { BOBA_CATALOG } from '../data/bobaCatalog';
import { quoteBoba } from '../lib/bobaPrice';
import { resetBobaSelection, toggleId } from '../lib/bobaSelection';
import { makeBobaDrink } from '../lib/bobaCart';
import { formatPrice } from '../lib/cart';
import BobaNav from '../components/boba/BobaNav';
import BobaHero from '../components/boba/BobaHero';
import FlavorGallery from '../components/boba/FlavorGallery';
import BobaCustomizer from '../components/boba/BobaCustomizer';
import useHomeSectionNav from '../components/boba/useHomeSectionNav';

export default function BobaBuilderPage() {
  const goHomeSection = useHomeSectionNav();
  const { addItem, openCart } = useCart();
  const [selection, setSelection] = useState(resetBobaSelection);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quote = useMemo(() => quoteBoba(BOBA_CATALOG, selection), [selection]);
  const flavor = BOBA_CATALOG.flavors.find((item) => item.id === selection.flavorId) ?? null;

  const statusText = quote.purchasable
    ? `Estimated price ${formatPrice(quote.totalInr)}. Drink ready to add to cart.`
    : `Price unavailable. ${
        quote.unpricedNames.length > 0
          ? `${quote.unpricedNames.join(', ')} ${
              quote.unpricedNames.length > 1 ? 'are' : 'is'
            } not on the published menu.`
          : 'Choose a published flavor, sugar level, ice level and cup size.'
      }`;

  const handleAddToCart = () => {
    const boba = makeBobaDrink(selection);
    if (!boba) return;
    const added = addItem(BOBA_CATALOG.productId, null, boba);
    if (added) openCart();
  };

  const handleToppingToggle = (id: string) =>
    setSelection((current) => {
      if (current.extraIds.includes(id)) {
        return { ...current, extraIds: current.extraIds.filter((item) => item !== id) };
      }
      if (BOBA_CATALOG.extras.some((extra) => extra.id === id)) {
        return { ...current, extraIds: [...current.extraIds, id] };
      }
      return { ...current, toppingIds: toggleId(current.toppingIds, id) };
    });

  const handleReset = () => setSelection(resetBobaSelection());

  const backToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  const blockText = quote.unpricedNames.length > 0
    ? `${quote.unpricedNames.join(', ')} not on the menu`
    : 'Finish your selections to order';

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-cream text-primary">
        <BobaNav />

        <BobaHero />

        <FlavorGallery
          value={selection.flavorId}
          onChange={(id) => setSelection((current) => ({ ...current, flavorId: id }))}
        />

        <BobaCustomizer
          selection={selection}
          quote={quote}
          flavor={flavor}
          onSweetnessChange={(id) =>
            setSelection((current) => ({ ...current, sweetnessId: id }))
          }
          onIceChange={(id) => setSelection((current) => ({ ...current, iceId: id }))}
          onSizeChange={(id) => setSelection((current) => ({ ...current, sizeId: id }))}
          onToppingToggle={handleToppingToggle}
          onReset={handleReset}
          onAddToCart={handleAddToCart}
        />

        <p role="status" aria-live="polite" className="sr-only">
          {statusText}
        </p>

        <footer className="border-t border-white/10 bg-primary pb-28 text-cream lg:pb-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bebas text-2xl leading-none tracking-[0.2em] text-white">
                TAKKERU <span className="text-accent">BOBA LAB</span>
              </p>
              <p className="mt-2 font-inter text-sm text-subtle/50">
                Made to order · Hand-cooked pearls · Published prices only
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => goHomeSection('menu')}
                className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 font-bebas text-base uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden"
              >
                Full menu
              </button>
              <button
                type="button"
                onClick={backToTop}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 font-bebas text-base uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
                Back to top
              </button>
            </div>
          </div>
        </footer>

        {/* ── Mobile quick-order bar ───────────────────────────── */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg lg:hidden">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-bebas text-[10px] uppercase tracking-[0.2em] text-primary/50">
                Est. total
              </p>
              <p className="font-bebas text-3xl leading-none tabular-nums text-primary">
                {quote.purchasable ? formatPrice(quote.totalInr) : '—'}
              </p>
              {!quote.purchasable && (
                <p className="mt-0.5 truncate font-inter text-[11px] text-accent">
                  {blockText}
                </p>
              )}
            </div>
            <button
              type="button"
              disabled={!quote.purchasable}
              onClick={handleAddToCart}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-2xl bg-accent px-5 font-bebas text-base uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-primary/10 disabled:text-primary/40"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Add to cart
            </button>
          </div>
        </div>

        <CartDrawer />
        <Toast />
      </main>
    </MotionConfig>
  );
}
