import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 p-4 border-b border-slate-700">
        <h1 className="text-white text-xl font-bold">GanadePro</h1>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
