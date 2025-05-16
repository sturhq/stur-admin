import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import {Circle} from 'lucide-react';

import {cn} from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({className, ...props}, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({className, ...props}, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-[1.3rem] w-[1.3rem] rounded-full border text-primary shadow focus:outline-none focus:ring-4 focus:ring-[#0196ED5C] outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center ">
        <Circle className="h-[0.6rem] w-[0.6rem] fill-white" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export {RadioGroup, RadioGroupItem};
