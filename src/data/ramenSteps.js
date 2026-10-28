/**
 * The six builder steps. Order defines the rail, the Back/Next flow and
 * how review is reached.
 *
 * @typedef {'base' | 'broth' | 'spice' | 'toppings' | 'extras' | 'review'} StepId
 */

/** @type {{ id: StepId, label: string, hint: string }[]} */
export const STEPS = [
  { id: 'base', label: 'Base', hint: 'Choose your noodle' },
  { id: 'broth', label: 'Broth', hint: 'Pick your flavor' },
  { id: 'spice', label: 'Spice level', hint: 'Set the heat' },
  { id: 'toppings', label: 'Toppings', hint: 'Add your favorites' },
  { id: 'extras', label: 'Extras', hint: 'Make it extra' },
  { id: 'review', label: 'Review', hint: 'Check your bowl' },
];
