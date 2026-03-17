import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Fingerprint, UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TacticalInput } from '../../components/ui/TacticalInput';
import { useAuthStore } from '../../store/authStore';

export function Register() {
  const navigate = useNavigate();

  const { signUp, isLoading, error } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('Los códigos de acceso no coinciden');
      return;
    }
    await signUp(email, password);
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-tactical-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-500/10 border border-primary-500/30 rounded-full flex items-center justify-center mb-4">
            <Fingerprint className="h-8 w-8 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-sans">
            Solicitud de <span className="text-primary-400">Acceso</span>
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Registra tus credenciales para la base de datos táctica
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 tactical-glass p-8 rounded-2xl">
          {(error || localError) && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
              {localError || error}
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
              placeholder="Mínimo 8 caracteres"
            />
            <TacticalInput
              label="Confirmar Código"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite el código de acceso"
            />
          </div>

          <Button
            type="submit"
            variant="tactical"
            className="w-full h-14 text-lg tracking-wider font-bold"
            isLoading={isLoading}
          >
            REGISTRAR PERFIL <UserPlus className="ml-2 h-5 w-5" />
          </Button>

          <p className="mt-4 text-center text-sm text-gray-400">
            ¿Ya tienes autorización?{' '}
            <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300">
              Iniciar Enlace
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
