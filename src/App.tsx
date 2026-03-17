import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import { Loader2 } from 'lucide-react';

// Carga perezosa de los componentes pesados (Code Splitting por Rutas)
const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })));
const Welcome = lazy(() => import('./pages/onboarding/Welcome').then(m => ({ default: m.Welcome })));
const Setup = lazy(() => import('./pages/onboarding/Setup').then(m => ({ default: m.Setup })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));

const ProtectedRoute = () => {
  const { session } = useAuthStore();
  if (!session) {
    return <Navigate to="/onboarding" replace />;
  }
  return <Outlet />;
};

const AuthRoute = () => {
  const { session } = useAuthStore();
  if (session) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const LoadingFallback = () => (
  <div className="min-h-screen bg-tactical-900 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="h-8 w-8 text-primary-500 animate-spin mx-auto mb-2" />
      <p className="text-primary-400 text-xs tracking-widest uppercase animate-pulse">
        Cargando interfaz...
      </p>
    </div>
  </div>
);

function App() {
  const { setSession } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitializing(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-tactical-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-primary-400 text-sm tracking-widest uppercase animate-pulse">
            Iniciando Sistemas Base...
          </p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/onboarding" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding/setup" element={<Setup />} />
            <Route path="/" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
