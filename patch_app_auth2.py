import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add useEffect import
if "import { useEffect }" not in content:
    content = content.replace(
        "import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';",
        "import { useEffect } from 'react';\nimport { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';"
    )

# Replace App function
old_app = """function App() {
  const hasSeenOnboarding = useSettingsStore((state) => state.hasSeenOnboarding);
  const { session } = useAuthStore();"""

new_app = """function App() {
  const hasSeenOnboarding = useSettingsStore((state) => state.hasSeenOnboarding);
  const { session, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-tactical">CARGANDO SISTEMA...</div>;
  }"""

content = content.replace(old_app, new_app)

with open('src/App.tsx', 'w') as f:
    f.write(content)
