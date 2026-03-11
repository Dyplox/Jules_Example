import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

export function Dashboard() {
  const navigate = useNavigate();
  const { session, signOut } = useAuthStore();

  const handleLogout = async () => {
    await signOut();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-tactical-900 text-white p-6">
      <header className="flex justify-between items-center py-4 border-b border-tactical-800">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500/10 p-2 rounded-lg border border-primary-500/30">
            <LayoutDashboard className="text-primary-400 h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold uppercase tracking-wider text-sm">Centro de Mando</h1>
            <p className="text-xs text-primary-400 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Enlace Seguro
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} className="text-gray-400 hover:text-white">
          <LogOut className="h-5 w-5" />
        </Button>
      </header>

      <main className="mt-8 space-y-6">
        <div className="tactical-glass p-6 rounded-2xl border-l-4 border-l-primary-500">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Bienvenido, Operador</h2>
          <p className="text-gray-400 text-sm">
            ID: <span className="text-primary-400 font-mono">{session?.user?.email}</span>
          </p>
          <p className="text-gray-400 text-sm mt-4">
            El sistema base está en línea. Los módulos de inventario y tácticas están en desarrollo para la próxima versión.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="tactical-glass p-4 rounded-xl flex flex-col items-center justify-center text-center opacity-50 cursor-not-allowed">
            <div className="h-10 w-10 bg-tactical-800 rounded-full flex items-center justify-center mb-2">
              <span className="text-gray-500">0</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Cabezas</span>
          </div>
          <div className="tactical-glass p-4 rounded-xl flex flex-col items-center justify-center text-center opacity-50 cursor-not-allowed">
            <div className="h-10 w-10 bg-tactical-800 rounded-full flex items-center justify-center mb-2">
              <span className="text-gray-500">0</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Alertas</span>
          </div>
        </div>
      </main>
    </div>
  );
}
