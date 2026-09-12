import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Jeux', path: '/games' },
    { name: 'À propos', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group select-none">
            <motion.img 
              whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0] }}
              transition={{ duration: 0.3 }}
              src="/logo-icon.png" 
              alt="TechNova Games" 
              className="h-10 sm:h-11 w-auto object-contain cursor-pointer"
            />
            <div className="flex flex-col justify-center">
              <div className="font-heading text-xl sm:text-2xl font-black tracking-tight leading-none">
                <span className="text-[#0fb681]">Tech</span>
                <span className="text-slate-900">Nova</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-tech font-bold tracking-[0.25em] text-slate-500 uppercase mt-0.5">
                Games
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Centered with smooth indicator */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-semibold tracking-wide py-1 transition-colors ${
                    active
                      ? 'text-emerald-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side: Search & Admin Profile */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Search toggler / input */}
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative animate-in fade-in duration-200">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un jeu..."
                  onBlur={() => !searchQuery && setSearchOpen(false)}
                  className="w-56 pl-8 pr-4 py-1.5 text-xs rounded-full bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-slate-600 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
                title="Rechercher un jeu"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Admin Profile Link */}
            {user && (
              <Link
                to="/admin"
                className="text-slate-600 hover:text-emerald-600 p-1.5 rounded-full hover:bg-slate-100 transition flex items-center gap-1.5"
                title="Tableau de bord Admin"
              >
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <Link
                to="/admin"
                className="text-emerald-600 p-1.5"
                title="Admin"
              >
                <Shield className="w-5 h-5" />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-b border-slate-200 bg-white px-6 py-6 space-y-5 shadow-lg"
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un jeu..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-emerald-600'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-emerald-600 pt-2 border-t border-slate-200 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Tableau de bord Administrateur
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};
