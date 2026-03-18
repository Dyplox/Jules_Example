import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface TacticalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const TacticalInput = forwardRef<HTMLInputElement, TacticalInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-slate-900 font-bold uppercase tracking-wider text-sm font-tactical">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            className={cn(
              "w-full h-16 border-4 border-dark-header bg-white px-4 focus:ring-0 focus:border-primary text-slate-900 font-tactical text-lg rounded-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-header/40 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500 font-tactical">{error}</p>
        )}
      </div>
    );
  }
);
TacticalInput.displayName = 'TacticalInput';

export { TacticalInput };
