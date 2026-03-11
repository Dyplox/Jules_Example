import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Save, MapPin, Target } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TacticalInput } from '../../components/ui/TacticalInput';

export function Setup() {
  const navigate = useNavigate();

  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular guardado de configuración
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-tactical-900 flex flex-col p-6">
      <div className="flex-1 w-full max-w-md mx-auto space-y-8 mt-12">
        <div className="text-left">
          <div className="inline-flex h-12 w-12 bg-primary-500/10 border border-primary-500/30 rounded-xl items-center justify-center mb-6">
            <Settings className="h-6 w-6 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-sans">
            Inicialización del <br/><span className="text-primary-400">Sistema</span>
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Define los parámetros de la base operativa.
          </p>
        </div>

        <form onSubmit={handleSave} className="mt-10 space-y-8">
          <div className="space-y-6">
            <TacticalInput
              label="Nombre de la Base (Finca)"
              required
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              placeholder="Ej. Hacienda El Roble"
              autoFocus
            />

            <div className="relative">
              <TacticalInput
                label="Coordenadas / Ubicación"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Región o Municipio"
              />
              <MapPin className="absolute right-3 top-10 h-5 w-5 text-gray-500" />
            </div>

            <div className="relative">
              <TacticalInput
                label="Objetivo Principal (Cría, Engorde, Leche)"
                required
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Propósito operativo"
              />
              <Target className="absolute right-3 top-10 h-5 w-5 text-gray-500" />
            </div>
          </div>

          <div className="pt-8">
            <Button
              type="submit"
              variant="tactical"
              className="w-full h-16 text-lg font-black tracking-widest uppercase rounded-xl"
              isLoading={isLoading}
            >
              <Save className="mr-2 h-5 w-5" />
              Guardar Parámetros
            </Button>
            <p className="mt-4 text-center text-xs text-gray-500 uppercase tracking-widest">
              Conexión Encriptada P2P
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
