import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface TacticalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TacticalInput = forwardRef<HTMLInputElement, TacticalInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-primary-300 mb-1.5 uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          className={cn(
            "flex h-12 w-full rounded-lg border border-tactical-700 bg-tactical-800 px-3 py-2 text-sm text-primary-50 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
TacticalInput.displayName = 'TacticalInput';

export { TacticalInput };
