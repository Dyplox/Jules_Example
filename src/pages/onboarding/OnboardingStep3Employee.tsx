import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { Key } from 'lucide-react';
import { TacticalInput } from '../../components/ui/TacticalInput';

export default function OnboardingStep3Employee() {
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoinFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setIsLoading(true);

    try {
      // Find the farm using the invite code
      const { data: farm, error: fetchError } = await supabase
        .from('farms')
        .select('id, name')
        .eq('invite_code', inviteCode.trim().toUpperCase())
        .single();

      if (fetchError || !farm) {
        throw new Error('Código de invitación inválido o finca no encontrada');
      }

      // Associate employee to the farm
      const { error: joinError } = await supabase
        .from('farm_members')
        .insert([{
          farm_id: farm.id,
          user_id: session.user.id
        }]);

      if (joinError) {
        // Handle duplicate join cleanly
        if (joinError.code === '23505') {
          console.log('Ya eres miembro de esta finca');
        } else {
          throw joinError;
        }
      }

      // Done -> Dashboard
      navigate('/');
    } catch (err: Error | unknown) {
      setError((err as Error).message || 'Error al unirse a la finca');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Unirte a una Finca
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Paso 3 de 3: Código de invitación
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 tactical-glass border border-slate-700">
          <form className="space-y-6" onSubmit={handleJoinFarm}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-6">
              <p className="text-sm text-slate-300">
                Pídele al administrador o dueño de la finca que te comparta el <strong className="text-white font-bold">Código de Invitación</strong> de su propiedad.
              </p>
            </div>

            <TacticalInput
              label="Código de Invitación"
              type="text"
              icon={<Key className="h-5 w-5 text-slate-400" />}
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Ej: ABC123"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Buscando...' : 'Verificar y Entrar'}
            </button>

            <div className="mt-4 text-center">
               <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Saltar por ahora (Entrar sin Finca)
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
