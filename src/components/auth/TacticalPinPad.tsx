import { useState, useEffect } from 'react';
import { Delete, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TacticalPinPadProps {
  onComplete: (pin: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export function TacticalPinPad({ onComplete, onCancel, isLoading, error }: TacticalPinPadProps) {
  const [pin, setPin] = useState('');

  const handleNumberClick = (num: string) => {
    if (pin.length < 4 && !isLoading) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        onComplete(newPin);
      }
    }
  };

  const handleDelete = () => {
    if (!isLoading) {
      setPin(prev => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    if (error) {
      // Clear PIN on error to allow retry
      setPin('');
    }
  }, [error]);

  const dots = [1, 2, 3, 4];

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between w-full mb-8 items-center">
        <h3 className="text-xl font-bold text-white tracking-tighter uppercase font-tactical">
          Ingresar PIN
        </h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* PIN Dots */}
      <div className="flex gap-6 mb-10">
        {dots.map((dot, i) => (
          <div
            key={dot}
            className={cn(
              "h-4 w-4 rounded-full border-2 transition-all duration-200",
              pin.length > i
                ? "bg-emerald-500 border-emerald-500 scale-125 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                : "bg-transparent border-slate-600"
            )}
          />
        ))}
      </div>

      {error && (
        <div className="mb-6 text-red-400 text-sm font-tactical text-center animate-bounce">
          {error}
        </div>
      )}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            type="button"
            disabled={isLoading}
            onClick={() => handleNumberClick(num.toString())}
            className="h-20 bg-slate-800/50 border-2 border-slate-700 rounded-2xl text-2xl font-bold text-white hover:bg-slate-700 hover:border-emerald-500/50 active:scale-95 transition-all font-tactical flex items-center justify-center disabled:opacity-50"
          >
            {num}
          </button>
        ))}
        <div className="h-20" /> {/* Spacer */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleNumberClick('0')}
          className="h-20 bg-slate-800/50 border-2 border-slate-700 rounded-2xl text-2xl font-bold text-white hover:bg-slate-700 hover:border-emerald-500/50 active:scale-95 transition-all font-tactical flex items-center justify-center disabled:opacity-50"
        >
          0
        </button>
        <button
          type="button"
          disabled={isLoading || pin.length === 0}
          onClick={handleDelete}
          className="h-20 bg-slate-800/50 border-2 border-slate-700 rounded-2xl text-white hover:bg-slate-700 hover:border-red-500/50 active:scale-95 transition-all flex items-center justify-center disabled:opacity-30"
        >
          <Delete className="h-8 w-8" />
        </button>
      </div>

      {isLoading && (
        <div className="mt-8 text-emerald-500 font-tactical animate-pulse uppercase tracking-widest text-xs font-bold">
          Verificando...
        </div>
      )}
    </div>
  );
}
