import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap, Database, WifiOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function Welcome() {
  return (
    <div className="min-h-screen bg-tactical-900 flex flex-col justify-between p-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=3400&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-tactical-900 via-tactical-900/80 to-transparent"></div>

      <div className="relative z-10 pt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-semibold tracking-wider mb-6">
          <ShieldCheck className="h-4 w-4" />
          SISTEMA ACTIVADO
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1.1]">
          Operaciones<br />
          <span className="text-primary-500">Ganaderas</span><br />
          Avanzadas
        </h1>
        <p className="mt-4 text-gray-400 text-lg max-w-sm">
          Plataforma táctica para el control total del inventario. Diseño offline-first para terrenos difíciles.
        </p>

        <div className="mt-12 space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-tactical-800 p-3 rounded-xl border border-tactical-700 text-primary-400">
              <WifiOff className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Operaciones Sin Conexión</h3>
              <p className="text-sm text-gray-500">Registra datos en campo sin señal. Sincronización automática al conectar.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-tactical-800 p-3 rounded-xl border border-tactical-700 text-primary-400">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Base de Datos Segura</h3>
              <p className="text-sm text-gray-500">Almacenamiento encriptado de registros médicos, peso y trazabilidad.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-tactical-800 p-3 rounded-xl border border-tactical-700 text-primary-400">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Interfaz Táctica Rápida</h3>
              <p className="text-sm text-gray-500">Diseñada para alta visibilidad bajo el sol y uso rápido con una sola mano.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-8 pt-12">
        <Link to="/onboarding/setup">
          <Button variant="primary" className="w-full h-16 text-lg font-black tracking-widest uppercase rounded-xl">
            Iniciar Configuración <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
        <div className="text-center mt-6">
          <Link to="/login" className="text-sm font-semibold text-gray-400 hover:text-white uppercase tracking-wider">
            Ya tengo un perfil táctico
          </Link>
        </div>
      </div>
    </div>
  );
}
