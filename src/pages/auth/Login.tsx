import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, Phone, Tractor, WifiOff, ArrowRight } from 'lucide-react';
import { TacticalInput } from '../../components/ui/TacticalInput';
import { Button } from '../../components/ui/Button';
import { useSettingsStore } from '../../store/settingsStore';

export default function Login() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, isLoading, error, setError } = useAuthStore();
  const { useBiometrics, pinSet } = useSettingsStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(identifier, password);
      navigate('/');
    } catch (err: Error | unknown) {
      setError((err as Error).message || 'Error al iniciar sesión');
    }
  };

  const handleQuickAccess = () => {
    // Navigate to quick access PIN/Biometrics screen
    console.log("Quick Access trigger");
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col font-body text-slate-900">
      {/* Header Robusto */}
      <header className="bg-dark-header text-white p-4 flex items-center justify-between border-b-4 border-primary shrink-0">
        <div className="flex items-center gap-3">
          <Tractor className="h-8 w-8 text-primary" strokeWidth={2} />
          <h2 className="font-display text-2xl font-bold tracking-tighter uppercase">GANADEPRO</h2>
        </div>
        <div className="flex items-center gap-2 bg-black/20 px-3 py-1 border border-primary/30">
          <WifiOff className="h-4 w-4 text-primary" strokeWidth={2} />
          <span className="text-[10px] font-bold tracking-widest font-tactical text-primary uppercase">SYNC: OFFLINE</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 max-w-lg mx-auto w-full overflow-y-auto">
        <div className="mb-8 mt-4">
          <h1 className="text-slate-900 text-4xl font-bold font-display uppercase tracking-tight">
            INICIO DE SESIÓN
          </h1>
          <div className="h-1.5 w-20 bg-primary mt-2"></div>
          <p className="text-slate-600 mt-4 text-lg font-medium">
            Acceso táctico para gestión de ganado en campo.
          </p>
        </div>

        {/* Method Toggle */}
        <div className="flex bg-slate-200 rounded-none p-1 border-2 border-dark-header mb-6 shadow-[4px_4px_0_0_#0f172a]">
          <button
            onClick={() => setMethod('email')}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
              method === 'email' ? 'bg-dark-header text-white' : 'text-slate-600 hover:text-dark-header'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setMethod('phone')}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
              method === 'phone' ? 'bg-dark-header text-white' : 'text-slate-600 hover:text-dark-header'
            }`}
          >
            Teléfono
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500 text-white font-tactical font-bold border-4 border-black p-4 text-sm uppercase shadow-[4px_4px_0_0_#000]">
              {error}
            </div>
          )}

          <TacticalInput
            label={method === 'email' ? 'Identificación (Email)' : 'Número de Teléfono'}
            type={method === 'email' ? 'email' : 'tel'}
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={method === 'email' ? "EJ: OP@GANADEPRO.COM" : "EJ: +57 300..."}
            icon={method === 'email' ? <Mail className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
          />

          <TacticalInput
            label="Contraseña de Seguridad"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<Lock className="h-6 w-6" />}
          />

          <div className="pt-4 space-y-4">
            <Button
              type="submit"
              variant="tactical-orange"
              className="w-full h-20 text-xl font-tactical font-black"
              isLoading={isLoading}
            >
              ENTRAR AL SISTEMA
            </Button>

            {pinSet && (
               <Button
                  type="button"
                  variant="tactical-pro"
                  onClick={handleQuickAccess}
                  className="w-full h-16 text-lg font-tactical font-bold"
                >
                  ACCESO RÁPIDO {useBiometrics ? '(BIOMETRÍA / PIN)' : '(PIN)'}
                </Button>
            )}
          </div>
        </form>

        <div className="mt-8 text-center pb-8">
          <Link
            to="/onboarding/step1"
            className="inline-flex items-center gap-2 text-dark-header font-bold uppercase tracking-tighter hover:underline decoration-2 underline-offset-4"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={3} />
            ¿NO TIENES CUENTA? REGISTRARSE
          </Link>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full h-2 bg-primary shrink-0 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.2)]"></div>
    </div>
  );
}
