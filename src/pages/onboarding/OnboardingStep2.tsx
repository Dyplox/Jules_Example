import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, ShieldCheck } from 'lucide-react';
import { TacticalInput } from '../../components/ui/TacticalInput';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import { Button } from '../../components/ui/Button';
import { validateAge, validatePin } from '../../utils/validators';
import { hashPin } from '../../utils/crypto';

// Note: In real production, we will import Capacitor Biometrics here

export default function OnboardingStep2() {
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const setPinSet = useSettingsStore((state) => state.setPinSet);
  const setUseBiometrics = useSettingsStore((state) => state.setUseBiometrics);
  const setLastUserId = useSettingsStore((state) => state.setLastUserId);

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState<'admin' | 'employee'>('admin');
  const [pin, setPin] = useState('');
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setError(null);

    // Validations
    if (!fullName.trim()) {
      setError('El nombre completo es requerido');
      return;
    }

    const ageError = validateAge(age);
    if (ageError) {
      setError(ageError);
      return;
    }

    const pinError = validatePin(pin);
    if (pinError) {
      setError(pinError);
      return;
    }

    setIsLoading(true);

    try {
      const hashedPin = await hashPin(pin);

      // Create profile record
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: session.user.id,
          full_name: fullName,
          age: parseInt(age),
          role: role,
          pin_hash: hashedPin,
        }
      ]);

      if (profileError) throw profileError;

      // Update local settings
      setPinSet(true);
      setUseBiometrics(biometricsEnabled);
      setLastUserId(session.user.id);

      // Navigate based on role
      if (role === 'admin') {
        navigate('/onboarding/step3-admin');
      } else {
        navigate('/onboarding/step3-employee');
      }
    } catch (err: Error | unknown) {
      let msg = (err as Error).message;
      if (msg.includes('Invalid login credentials')) msg = 'Credenciales incorrectas';
      if (msg.includes('User already registered')) msg = 'El usuario ya está registrado';
      if (msg.includes('Password should be at least')) msg = 'La contraseña es muy corta';
      if (msg.includes('duplicate key value')) msg = 'Este registro ya existe';
      setError(msg || 'Error al guardar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Configurar Perfil
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Paso 2 de 3: Datos personales y seguridad
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 tactical-glass border border-slate-700">

          <form className="space-y-6" onSubmit={handleSaveProfile}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <TacticalInput
              id="fullName" name="fullName" label="Nombre Completo"
              type="text"
              icon={<User className="h-5 w-5 text-slate-400" />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <TacticalInput
              id="age" name="age" label="Edad"
              type="number"
              icon={<Calendar className="h-5 w-5 text-slate-400" />}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                ¿Cuál es tu rol?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    role === 'admin'
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-semibold">Dueño / Admin</span>
                  <span className="text-xs mt-1 block opacity-80">Administra fincas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employee')}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    role === 'employee'
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-semibold">Empleado</span>
                  <span className="text-xs mt-1 block opacity-80">Únete a una finca</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <h3 className="text-lg font-medium text-white flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Seguridad de Acceso Rápido
              </h3>

              <TacticalInput
                id="pin" name="pin" label="Crear PIN (4 dígitos numéricos)"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 4) setPin(val);
                }}
                required
                placeholder="****"
              />

              <div className="mt-4 flex items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-700">
                <div>
                  <h4 className="text-sm font-medium text-white">Usar Biometría</h4>
                  <p className="text-xs text-slate-400">Huella digital o FaceID</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    biometricsEnabled ? 'bg-emerald-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
              {isLoading ? "Guardando..." : "Continuar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
