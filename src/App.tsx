import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useSettingsStore } from './store/settingsStore';

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

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuthStore();
  if (!session) {
    return <Navigate to="/auth/login" />;
  }
  return <>{children}</>;
};

function App() {
  const hasSeenOnboarding = useSettingsStore((state) => state.hasSeenOnboarding);
  const { session } = useAuthStore();

  return (
    <Router>
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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Perfil />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
