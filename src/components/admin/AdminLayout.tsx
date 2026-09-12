import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Gamepad2, 
  PlusCircle, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, isSupabaseConnected, isDemoAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Gestion des Jeux', path: '/admin/games', icon: Gamepad2, exact: true },
    { label: 'Nouveau Jeu', path: '/admin/games/new', icon: PlusCircle, exact: false },
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900 font-['Outfit',sans-serif]">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header / Logo */}
        <div className="h-16 px-6 border-b border-slate-200/80 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              TECHNOVA<span className="text-[#16a34a]">.</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider bg-green-50 text-[#16a34a] border border-green-200 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? 'bg-green-50 border border-green-200 text-[#16a34a] font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#16a34a]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 pt-6 mb-2">
            Raccourcis
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-slate-600 hover:text-[#16a34a] hover:bg-slate-50 transition font-medium"
          >
            <span className="flex items-center gap-3">
              <Gamepad2 className="w-4 h-4 text-slate-400" />
              <span>Voir le site public</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </nav>

        {/* Supabase Status Pill */}
        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-green-100 text-[#16a34a] border border-green-200 flex items-center justify-center font-bold text-xs shrink-0">
                A
              </div>
              <div className="min-w-0 truncate">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  {user?.email || 'Administrateur'}
                </div>
                <div className="text-[11px] text-slate-500 truncate font-medium">
                  Administrateur
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/90 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h2 className="font-bold text-base text-slate-900">
              Console d'Administration
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/games/new"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-xs transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nouveau jeu</span>
            </Link>
          </div>
        </header>

        {/* Nested page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
