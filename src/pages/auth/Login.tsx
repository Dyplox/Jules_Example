import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, Phone } from 'lucide-react';
import { TacticalInput } from '../../components/ui/TacticalInput';
import { useSettingsStore } from '../../store/settingsStore';

export default function Login() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, error, setError } = useAuthStore();
  const { useBiometrics, pinSet } = useSettingsStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(identifier, password);
      navigate('/');
    } catch (err: Error | unknown) {
      setError((err as Error).message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAccess = () => {
    // Navigate to quick access PIN/Biometrics screen
    // TODO: implement unlock screen
    console.log("Quick Access trigger");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
          Ingresar a GanadePro
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 tactical-glass border border-slate-700">

          <div className="flex bg-slate-900 rounded-lg p-1 mb-6">
            <button
              onClick={() => setMethod('email')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                method === 'email' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setMethod('phone')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                method === 'phone' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Teléfono
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <TacticalInput
              label={method === 'email' ? 'Correo Electrónico' : 'Número de Teléfono'}
              type={method === 'email' ? 'email' : 'tel'}
              icon={method === 'email' ? <Mail className="h-5 w-5 text-slate-400" /> : <Phone className="h-5 w-5 text-slate-400" />}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <TacticalInput
              label="Contraseña"
              type="password"
              icon={<Lock className="h-5 w-5 text-slate-400" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>

            {pinSet && (
               <button
                  type="button"
                  onClick={handleQuickAccess}
                  className="w-full mt-3 flex justify-center py-3 px-4 border border-slate-600 rounded-md text-sm font-medium text-slate-300 hover:text-white bg-slate-900 transition-colors"
                >
                  Acceso Rápido {useBiometrics ? '(Biometría / PIN)' : '(PIN)'}
                </button>
            )}
          </form>

          <div className="mt-6 text-center">
             <p className="text-sm text-slate-400">
               ¿No tienes cuenta?{' '}
               <Link to="/onboarding/step1" className="text-emerald-500 hover:text-emerald-400 font-medium">
                 Regístrate aquí
               </Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
