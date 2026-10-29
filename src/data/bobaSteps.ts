export interface BobaStep {
  id: string;
  label: string;
  hint: string;
}

export const BOBA_STEPS: BobaStep[] = [
  { id: 'flavor', label: 'Flavor', hint: 'Pick your tea' },
  { id: 'sweetness', label: 'Sweetness', hint: 'How sweet?' },
  { id: 'ice', label: 'Ice', hint: 'Set the chill' },
  { id: 'toppings', label: 'Toppings', hint: 'Pearls & more' },
  { id: 'size', label: 'Cup size', hint: 'Regular or Large' },
  { id: 'review', label: 'Review', hint: 'Check your cup' },
];
