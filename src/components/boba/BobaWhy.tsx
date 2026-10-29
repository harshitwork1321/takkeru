import { CupSoda, Droplets, Timer } from 'lucide-react';

const WHY = [
  {
    icon: CupSoda,
    title: 'Freshly brewed',
    body: 'Milk tea made to order, every cup',
  },
  {
    icon: Droplets,
    title: 'Real pearls',
    body: 'Hand-cooked tapioca, never soggy',
  },
  {
    icon: Timer,
    title: 'Ready in minutes',
    body: 'Chilled fast, sipped faster',
  },
];

export default function BobaWhy() {
  return (
    <aside>
      <h3 className="font-bebas text-xs uppercase tracking-[0.2em] text-white">
        Why TAKKERU boba?
      </h3>
      <ul className="mt-5 space-y-5">
        {WHY.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-golden/50 text-golden">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-inter text-sm font-semibold text-white">{item.title}</span>
              <span className="block font-inter text-sm text-subtle/50">{item.body}</span>
            </span>
          </li>
        ))}
      </ul>
      <span className="mt-6 block h-px w-16 bg-accent" />
    </aside>
  );
}
