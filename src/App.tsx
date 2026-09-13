import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Public Pages
import { Home } from './pages/Home';
import { Games } from './pages/Games';

import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

// Admin Pages & Components
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminGames } from './pages/admin/AdminGames';
import { AddGame } from './pages/admin/AddGame';
import { EditGame } from './pages/admin/EditGame';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Public Layout Wrapper with Sticky Navbar & Footer
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-slate-900 overflow-x-clip w-full">
      <Navbar />
      <main className="flex-1 flex flex-col overflow-x-clip w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// 404 Component
const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="font-['Outfit',sans-serif] font-black text-8xl text-[#22c55e] mb-2">
        404
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Page Introuvable</h2>
      <p className="text-slate-600 text-sm max-w-sm mb-6">
        Cette zone de l'univers Technova Games n'existe pas ou a été déplacée.
      </p>
      <a
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#22c55e] text-black font-semibold text-xs hover:bg-[#16a34a] transition"
      >
        Retour à l'accueil
      </a>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          {/* Admin Auth Route */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="games" element={<AdminGames />} />
            <Route path="games/new" element={<AddGame />} />
            <Route path="games/:id/edit" element={<EditGame />} />
          </Route>

          {/* 404 Fallback */}
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
