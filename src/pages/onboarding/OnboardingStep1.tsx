import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, Phone } from 'lucide-react';
import { TacticalInput } from '../../components/ui/TacticalInput';

export default function OnboardingStep1() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signUp, error, setError } = useAuthStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }
    setIsLoading(true);

    // In a real scenario with Supabase, we would handle phone auth differently.
    // For MVP, we will rely on email mostly.
    const identifier = method === 'email' ? email : phone;

    try {
      await signUp(identifier, password);
      // Move to step 2 after successful auth
      navigate('/onboarding/step2');
    } catch (err: Error | unknown) {
      setError((err as Error).message || 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Crear Cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Paso 1 de 3: Datos de acceso
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 tactical-glass border border-slate-700">

          {/* Method Toggle */}
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

          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            {method === 'email' ? (
              <TacticalInput
                label="Correo Electrónico"
                type="email"
                icon={<Mail className="h-5 w-5 text-slate-400" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            ) : (
              <TacticalInput
                label="Número de Teléfono"
                type="tel"
                icon={<Phone className="h-5 w-5 text-slate-400" />}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            )}

            <TacticalInput
              label="Contraseña"
              type="password"
              icon={<Lock className="h-5 w-5 text-slate-400" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 bg-slate-700 border-slate-600 rounded text-emerald-600 focus:ring-emerald-500"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-slate-300">
                  Acepto los términos y políticas
                </label>
                <p className="text-slate-500 text-xs mt-1">
                  Al registrarte, aceptas nuestras Condiciones de Servicio y Política de Privacidad.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Registrando...' : 'Siguiente Paso'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-400">O continuar con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-slate-700 rounded-md shadow-sm bg-slate-900 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <span className="sr-only">Sign in with Google</span>
                  Google
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-slate-700 rounded-md shadow-sm bg-slate-900 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <span className="sr-only">Sign in with Apple</span>
                  Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
