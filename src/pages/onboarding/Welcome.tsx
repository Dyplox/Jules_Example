import { useNavigate } from 'react-router-dom';
import { WifiOff, Tractor, ArrowRight, BatteryMedium } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light overflow-hidden bg-grid-pattern font-body text-slate-900">
      {/* Header: Tactical Offline/Online Status */}
      <header className="flex items-center justify-between p-4 bg-background-light border-b-4 border-black shrink-0">
        <div className="flex items-center gap-2 px-3 py-1 bg-primary border-2 border-black shadow-tactical-sm">
          <WifiOff className="h-4 w-4" strokeWidth={3} />
          <span className="font-display text-xs font-bold tracking-widest uppercase text-black">
            Modo Offline Activo
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase tracking-tighter leading-none text-slate-900">
              Señal Satelital
            </span>
            <span className="text-xs font-bold font-display text-slate-900">
              GPS: 100%
            </span>
          </div>
          <div className="h-10 w-10 flex items-center justify-center border-2 border-black bg-white shadow-tactical-sm">
            <BatteryMedium className="h-6 w-6 text-black" strokeWidth={2.5} />
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 overflow-y-auto">
        {/* Tactical Branding/Illustration */}
        <div className="w-full max-w-sm aspect-square bg-white border-4 border-black shadow-tactical relative flex items-center justify-center overflow-hidden shrink-0">
          <div className="absolute top-2 left-2 flex gap-1">
            <div className="w-2 h-2 bg-tactical-orange"></div>
            <div className="w-2 h-2 bg-black"></div>
          </div>

          {/* Visual Component */}
          <div className="flex flex-col items-center">
            <div className="text-black leading-none mb-4">
              <Tractor className="h-32 w-32" strokeWidth={1.5} />
            </div>
            <div className="px-4 py-1 bg-black text-white font-display text-xl uppercase tracking-[0.2em] font-bold">
              Sector 01-A
            </div>
          </div>

          {/* Crosshair elements for tactical look */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-black"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-black"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-black"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-black"></div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 max-w-md shrink-0">
          <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-black uppercase">
            BIENVENIDO A <br />
            <span className="text-primary bg-black px-2 mt-1 inline-block">GANADEPRO</span>
          </h1>
          <div className="h-1 w-20 bg-tactical-orange mx-auto my-4"></div>
          <p className="text-lg font-medium leading-tight text-slate-800 uppercase tracking-tight">
            Administración ganadera integral diseñada para el campo. Sin conexión, sin complicaciones.
          </p>
        </div>

        {/* Tactical Indicators */}
        <div className="flex items-center gap-4 py-2 shrink-0">
          <div className="w-12 h-3 bg-primary border-2 border-black"></div>
          <div className="w-12 h-3 bg-slate-200 border-2 border-black"></div>
          <div className="w-12 h-3 bg-slate-200 border-2 border-black"></div>
        </div>
      </main>

      {/* Massive CTA Footer */}
      <footer className="p-6 bg-background-light border-t-4 border-black shrink-0">
        <Button
          onClick={() => navigate('/login')}
          variant="tactical-pro"
          className="w-full h-20 text-3xl flex items-center justify-center gap-4 group"
        >
          SIGUIENTE
          <ArrowRight className="h-8 w-8 font-black group-hover:translate-x-2 transition-transform" strokeWidth={3} />
        </Button>
        <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-tighter font-tactical">
          <span>VER: 4.2.0-STABLE</span>
          <span>ENC: AES-256 MIL-SPEC</span>
        </div>
      </footer>
    </div>
  );
}
