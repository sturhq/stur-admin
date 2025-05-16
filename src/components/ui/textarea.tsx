import * as React from 'react';
import ErrorIcon from '@/assets/icons/error.svg';
import {cn} from '@/lib/utils';
import {Label} from './label';
import clsx from 'clsx';

type TextareaProps = React.ComponentProps<'textarea'> & {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  mainClass?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, label, error, errorMessage, mainClass, ...props}, ref) => {
    return (
      <div className={clsx(mainClass, 'flex flex-col gap-2 relative')}>
        {label && <Label>{label}</Label>}
        <textarea
          ref={ref}
          className={cn(
            'border border-input rounded-xl px-3 py-2 text-sm focus:ring-4 focus:ring-[#C0C0C05C] outline-none transition-all duration-500 ease-in-out focus:transition-all focus:duration-[500]',
            error && 'border-destructive',
            className
          )}
          {...props}
        />
        {error && (
          <div className="flex items-center gap-2 text-destructive text-xs font-light">
            <img src={ErrorIcon} alt="error" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
