import CartButton from '../cart/CartButton';
import useHomeSectionNav from './useHomeSectionNav';

const HOME_LINKS = [
  { label: 'Menu', section: 'menu', className: '' },
  { label: 'Our Story', section: 'story', className: 'hidden md:inline-flex' },
];

export default function BobaNav() {
  const goHomeSection = useHomeSectionNav();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-primary">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            goHomeSection('home');
          }}
          className="group flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden"
        >
          <img
            src="/images/logo-nav.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
          />
          <span className="leading-none">
            <span className="block font-bebas text-base leading-none tracking-[0.18em] text-white transition-colors duration-200 group-hover:text-accent sm:text-lg">
              TAKKERU
            </span>
            <span className="mt-0.5 block font-bebas text-[10px] leading-none tracking-[0.32em] text-accent">
              BOBA LAB
            </span>
          </span>
        </a>

        <nav aria-label="Boba lab" className="flex min-w-0 items-center gap-4 sm:gap-7">
          {HOME_LINKS.map((link) => (
            <button
              key={link.section}
              type="button"
              onClick={() => goHomeSection(link.section)}
              className={`min-h-11 rounded-lg font-bebas text-sm uppercase tracking-[0.18em] text-subtle/60 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden sm:text-base ${link.className}`}
            >
              {link.label}
            </button>
          ))}
          <span
            aria-current="page"
            className="font-bebas text-sm uppercase tracking-[0.18em] text-accent sm:text-base"
          >
            Boba Lab
          </span>
        </nav>

        <CartButton />
      </div>
    </header>
  );
}
