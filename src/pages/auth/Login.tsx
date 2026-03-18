import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WifiOff, Tractor, Mail, Lock, ArrowRight, Home, RefreshCw, UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TacticalInput } from '../../components/ui/TacticalInput';
import { useAuthStore } from '../../store/authStore';

export function Login() {
  const navigate = useNavigate();
  const { signIn, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
    navigate('/');
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500 text-white font-tactical font-bold border-4 border-black p-4 text-sm uppercase">
              {error}
            </div>
          )}

          {/* Campo Email */}
          <TacticalInput
            label="Identificación (Email)"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EJ: OP@GANADEPRO.COM"
            icon={<Mail className="h-6 w-6" />}
          />

          {/* Campo Contraseña */}
          <TacticalInput
            label="Contraseña de Seguridad"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<Lock className="h-6 w-6" />}
          />

          {/* Botón Entrar */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="tactical-orange"
              className="w-full h-20 text-xl font-tactical font-black"
              isLoading={isLoading}
            >
              ENTRAR AL SISTEMA
            </Button>
          </div>
        </form>

        {/* Link Volver al Login */}
        <div className="mt-8 text-center pb-8">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-dark-header font-bold uppercase tracking-tighter hover:underline decoration-2 underline-offset-4"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={3} />
            ¿NO TIENES CUENTA? REGISTRARSE
          </Link>
        </div>
      </main>

      {/* Bottom Navigation Simulado */}
      <nav className="bg-white border-t-4 border-dark-header flex justify-around items-center py-2 px-4 mt-auto shrink-0">
        <div className="flex flex-col items-center gap-1 p-2 text-dark-header/40 cursor-not-allowed">
          <Home className="h-6 w-6" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase font-tactical">Inicio</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 text-dark-header/40 cursor-not-allowed">
          <RefreshCw className="h-6 w-6" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase font-tactical">Sinc</span>
        </div>
        <Link to="/register" className="flex flex-col items-center gap-1 p-2 text-dark-header hover:text-primary transition-colors">
          <UserPlus className="h-6 w-6" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase font-tactical">Registro</span>
        </Link>
      </nav>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-primary shrink-0 z-50"></div>
    </div>
  );
}
