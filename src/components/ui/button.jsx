import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-3 whitespace-nowrap font-bebas tracking-[0.12em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        accent:
          'bg-accent text-white shadow-[0_18px_45px_rgba(214,40,40,0.25)] hover:-translate-y-1 hover:bg-white hover:text-primary',
        outline:
          'border border-white/25 bg-white/[0.03] text-white backdrop-blur-sm hover:-translate-y-1 hover:border-white hover:bg-white/10',
        dark: 'bg-primary text-cream hover:-translate-y-1 hover:bg-primary/80',
        outlineDark:
          'border border-primary/30 text-primary hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10',
        ghost:
          'text-accent underline decoration-accent/40 underline-offset-[6px] hover:decoration-accent',
      },
      size: {
        default: 'px-8 py-4 text-xl',
        lg: 'px-12 py-5 text-xl tracking-[0.2em]',
        sm: 'px-5 py-2.5 text-base tracking-[0.15em]',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'default',
    },
  }
);

export default function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
