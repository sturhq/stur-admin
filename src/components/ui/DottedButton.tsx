import {Plus} from 'lucide-react';
import React from 'react';
import {cn} from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const DottedButton = ({
  children,
  className,
  onClick,
  ...props
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 w-fit p-2 text-[#6A7383] font-semibold border border-dashed border-[#D5DBE1] rounded-full py-[0.25rem] px-[0.5rem]',
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center  bg-[#6A7383] rounded-full h-4 w-4">
        <Plus size={12} color="white" strokeWidth="3px" />
      </span>
      {children}
    </button>
  );
};
