import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-tactical-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-500/10 border border-primary-500/30 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-sans">
            Acceso <span className="text-primary-400">Táctico</span>
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Ingresa tus credenciales para acceder a la base de datos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 tactical-glass p-8 rounded-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <TacticalInput
              label="Identificador (Email)"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operador@ganadepro.com"
            />
            <TacticalInput
              label="Código de Acceso (Password)"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-400 hover:text-primary-300">
                ¿Olvidaste tu código?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="tactical"
            className="w-full h-14 text-lg tracking-wider font-bold"
            isLoading={isLoading}
          >
            INICIAR ENLACE <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="mt-4 text-center text-sm text-gray-400">
            ¿No tienes autorización?{' '}
            <Link to="/register" className="font-medium text-primary-400 hover:text-primary-300">
              Solicitar Acceso
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
