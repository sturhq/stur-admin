import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const alertVariants = cva(
  'flex items-center gap-2 p-4 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring w-full',
  {
    variants: {
      variant: {
        default: 'bg-[#EBEEF1] text-[#6A7383]  border border-[#D5DBE1]',
        info: 'bg-[#CFF5F6] border-[#A2E5EF] border text-[#0055BC]',
        positive: 'bg-[#D7F7C2] border-[#A6EB84] border text-[#006908]',
        negative: 'bg-[#FFE7F2] border-[#FFCCDF] border text-[#B3093C]',
        warning: 'bg-[#FCEDB9] border-[#FCD579] border text-[#A82C00]',
        destructive: 'bg-[#DF1B41] border-[#DF1B41] border text-[#FFFFFF]',
        outline: 'bg-transparent text-[#6A7383] border border-[#D5DBE1]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({className, variant, ...props}: AlertProps) {
  return (
    <div className={cn(alertVariants({variant}), className)} {...props} />
  );
}

export {Alert, alertVariants};
