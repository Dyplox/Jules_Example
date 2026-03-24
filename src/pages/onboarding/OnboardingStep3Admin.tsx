import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { MapPin, Info, PlusCircle } from 'lucide-react';
import { TacticalInput } from '../../components/ui/TacticalInput';
import { generateSecureInviteCode } from '../../utils/crypto';

export default function OnboardingStep3Admin() {
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [farmName, setFarmName] = useState('');
  const [country, setCountry] = useState('');
  const [cattleType, setCattleType] = useState('');
  const [lots, setLots] = useState([{ name: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddLot = () => {
    setLots([...lots, { name: '' }]);
  };

  const handleLotChange = (index: number, value: string) => {
    const newLots = [...lots];
    newLots[index].name = value;
    setLots(newLots);
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setIsLoading(true);

    try {
      // Create Farm
      const inviteCode = generateSecureInviteCode();
      const { data: farm, error: farmError } = await supabase
        .from('farms')
        .insert([{
          admin_id: session.user.id,
          name: farmName,
          country: country,
          cattle_type: cattleType,
          invite_code: inviteCode
        }])
        .select()
        .single();

      if (farmError) throw farmError;

      // Create Lots
      const validLots = lots.filter(l => l.name.trim() !== '');
      if (validLots.length > 0) {
        const { error: lotsError } = await supabase
          .from('farm_lots')
          .insert(validLots.map(l => ({
            farm_id: farm.id,
            name: l.name
          })));
        if (lotsError) throw lotsError;
      }

      // Finish Onboarding -> Redirect to Dashboard
      navigate('/');
    } catch (err: Error | unknown) {
      setError((err as Error).message || 'Error al crear la finca');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Configurar Finca
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Paso 3 de 3: Datos de tu propiedad
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 tactical-glass border border-slate-700">
          <form className="space-y-6" onSubmit={handleFinish}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <TacticalInput
              label="Nombre de la Finca / Propiedad"
              type="text"
              icon={<MapPin className="h-5 w-5 text-slate-400" />}
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              required
            />

            <TacticalInput
              label="País o Región"
              type="text"
              icon={<MapPin className="h-5 w-5 text-slate-400" />}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />

            <TacticalInput
              label="Tipo de Ganado Principal"
              type="text"
              icon={<Info className="h-5 w-5 text-slate-400" />}
              placeholder="Ej. Lechero, Carne, Doble propósito"
              value={cattleType}
              onChange={(e) => setCattleType(e.target.value)}
              required
            />

            <div className="pt-4 border-t border-slate-700">
              <h3 className="text-lg font-medium text-white mb-2">
                Divisiones o Lotes
              </h3>
              <p className="text-xs text-slate-400 mb-4">Agrega los potreros o lotes donde tienes dividido el ganado.</p>

              {lots.map((lot, index) => (
                <div key={index} className="mb-3">
                  <TacticalInput
                    label={`Nombre del Lote ${index + 1}`}
                    type="text"
                    value={lot.name}
                    onChange={(e) => handleLotChange(index, e.target.value)}
                    required={index === 0}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddLot}
                className="mt-2 flex items-center text-emerald-500 hover:text-emerald-400 text-sm font-medium transition-colors"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Agregar otro lote
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Guardando...' : 'Finalizar y Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
