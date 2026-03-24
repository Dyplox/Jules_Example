import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import { useSettingsStore } from './store/settingsStore';
import { Loader2 } from 'lucide-react';

// Layouts & Pages
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Onboarding Pages
import Slider from './pages/onboarding/Slider';
import OnboardingStep1 from './pages/onboarding/OnboardingStep1';
import OnboardingStep2 from './pages/onboarding/OnboardingStep2';
import OnboardingStep3Admin from './pages/onboarding/OnboardingStep3Admin';
import OnboardingStep3Employee from './pages/onboarding/OnboardingStep3Employee';

// Basic Placeholder components for routing
const Dashboard = () => <div className="p-4 text-white">Dashboard Principal GanadePro</div>;
const Perfil = () => <div className="p-4 text-white">Mi Perfil / Configuración PIN</div>;

const ProtectedRoute = () => {
  const { session } = useAuthStore();
  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};

function App() {
  const hasSeenOnboarding = useSettingsStore((state) => state.hasSeenOnboarding);
  const { session, setSession } = useAuthStore();
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
        {/* Onboarding Flow */}
        <Route path="/onboarding" element={!hasSeenOnboarding ? <Slider /> : <Navigate to="/auth/login" />} />
        <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
        <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
        <Route path="/onboarding/step3-admin" element={<OnboardingStep3Admin />} />
        <Route path="/onboarding/step3-employee" element={<OnboardingStep3Employee />} />

        {/* Auth Routes */}
        <Route
          path="/auth/login"
          element={!session ? (hasSeenOnboarding ? <Login /> : <Navigate to="/onboarding" />) : <Navigate to="/" />}
        />
        <Route
          path="/auth/register"
          element={!session ? <Register /> : <Navigate to="/" />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Perfil />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
