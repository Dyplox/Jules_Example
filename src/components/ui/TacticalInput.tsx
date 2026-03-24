import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TacticalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const TacticalInput = forwardRef<HTMLInputElement, TacticalInputProps>(
  ({ className, label, error, icon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-white font-bold uppercase tracking-wider text-sm font-tactical">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center z-10 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            className={cn(
              "w-full h-16 border-2 border-slate-700 bg-slate-800/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-tactical text-lg rounded-xl transition-all disabled:cursor-not-allowed disabled:opacity-50",
              icon ? "pl-12" : "pl-4",
              isPassword ? "pr-12" : "pr-4",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            type={inputType}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white focus:outline-none z-10 p-1"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
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
