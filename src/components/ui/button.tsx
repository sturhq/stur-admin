import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';
import {Spinner} from './spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus:ring-4 focus:ring-[#0196ED5C]   disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none transition-[primary-animation] duration-500',
  {
    variants: {
      variant: {
        default:
          'bg-button text-primary-foreground shadow hover:opacity-80 focus:ring-4 focus:ring-[#C0C0C05C] disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:opacity-50',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-white text-secondary-foreground border  secondary-button-shadow hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline disabled:cursor-not-allowed',
      },
      size: {
        default: 'h-[2.5rem] px-4 px-4',
        sm: 'h-[1.5rem] rounded-xl px-3 text-xs !leading-[0px]',
        md: 'h-[1.75rem] rounded-xl px-3 text-xs !leading-[0px]',
        lg: 'h-[2.5rem] rounded-xl px-4',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {className, variant, size, asChild = false, loading, ...props},
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({variant, size, className}))}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading ? (
          <Spinner variant="spin" size="medium" intent="current" />
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
