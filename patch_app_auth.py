import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add useEffect and auth initialization
import_pattern = r"import \{ BrowserRouter as Router, Routes, Route, Navigate \} from 'react-router-dom';"
import_replacement = "import { useEffect } from 'react';\nimport { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';"

content = content.replace(import_pattern, import_replacement)

app_func_pattern = r"function App\(\) \{\n  const hasSeenOnboarding = useSettingsStore\(\(state\) => state\.hasSeenOnboarding\);\n  const \{ session \} = useAuthStore\(\);"

app_func_replacement = """function App() {
  const hasSeenOnboarding = useSettingsStore((state) => state.hasSeenOnboarding);
  const { session, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Cargando...</div>;
  }"""

content = content.replace(app_func_pattern, app_func_replacement)

with open('src/App.tsx', 'w') as f:
    f.write(content)
