import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Welcome } from './pages/onboarding/Welcome';
import { Setup } from './pages/onboarding/Setup';
import { Dashboard } from './pages/Dashboard';
import { Loader2 } from 'lucide-react';

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
    </BrowserRouter>
  );
}

export default App;
