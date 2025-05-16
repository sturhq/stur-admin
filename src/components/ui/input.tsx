import * as React from 'react';
import {cn} from '@/lib/utils';
import {Label} from './label';
import ErrorIcon from '@/assets/icons/error.svg';
import {Icon} from '@iconify/react';

type InputProps = React.ComponentProps<'input'> & {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, label, error, icon, errorMessage, ...props}, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] =
      React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prevState => !prevState);
    };
    return (
      <div className="flex flex-col gap-2 relative w-full">
        {label && <Label>{label}</Label>}
        {icon && (
          <div className="absolute left-3 top-[0.48rem]">{icon}</div>
        )}
        <input
          ref={ref}
          type={
            type === 'password'
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : type
          }
          className={cn(
            'border border-input rounded-xl h-11 px-3 py-2 text-sm focus:ring-4 focus:ring-[#C0C0C05C] outline-none transition-all duration-500 ease-in-out focus:transition-all focus:duration-[500] disabled:cursor-not-allowed',
            error && 'border-destructive',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
        {type === 'password' && (
          <div
            className={`absolute right-2  cursor-pointer ${label ? 'top-[2rem]' : 'top-[0.5rem]'}`}
            onClick={
              type === 'password' ? togglePasswordVisibility : undefined
            }
          >
            {isPasswordVisible ? (
              <Icon icon="heroicons:eye-16-solid" width={22} height={22} />
            ) : (
              <Icon
                icon="heroicons:eye-slash-16-solid"
                width={22}
                height={22}
              />
            )}
          </div>
        )}
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
Input.displayName = 'Input';

export {Input};
