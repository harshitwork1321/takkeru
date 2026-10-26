import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-2 border px-3 py-1 font-bebas text-sm tracking-[0.2em] transition-colors',
  {
    variants: {
      variant: {
        accent: 'border-accent/60 bg-accent/10 text-accent',
        golden: 'border-golden/60 bg-golden/10 text-golden',
        outline: 'border-white/25 bg-white/[0.03] text-white/85',
        dark: 'border-primary/20 bg-primary/5 text-primary',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  }
);

export default function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
