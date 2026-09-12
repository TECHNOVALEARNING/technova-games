import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from './MotionReveal';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080b11] border-t border-slate-800/80 text-slate-300 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <FadeIn distance={20} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Identité du studio */}
          <div className="lg:col-span-6 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group select-none">
              <motion.img 
                whileHover={{ scale: 1.08 }}
                src="/logo-icon.png" 
                alt="TechNova Games" 
                className="h-12 w-auto object-contain transition-transform duration-300"
              />
              <div className="flex flex-col">
                <div className="font-heading text-2xl font-black tracking-tight leading-none text-white">
                  <span className="text-[#0fb681]">Tech</span>
                  <span>Nova</span>
                </div>
                <span className="text-[11px] font-tech font-bold tracking-[0.25em] text-emerald-400 uppercase mt-1">
                  Games
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Plateforme indépendante de jeux web créée par le studio Technova. Nous concevons des expériences de jeu rapides, immersives et accessibles à tous sans téléchargement.
            </p>
          </div>

          {/* Explorer le catalogue */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Catalogue de Jeux
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/games" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Tous les jeux
                </Link>
              </li>
              <li>
                <Link to="/games?category=Action" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Action & Aventure
                </Link>
              </li>
              <li>
                <Link to="/games?category=Arcade" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Arcade & Vitesse
                </Link>
              </li>
              <li>
                <Link to="/games?category=Stratégie" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Stratégie & Tactique
                </Link>
              </li>
              <li>
                <Link to="/games?category=Réflexion" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Réflexion & Casse-têtes
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Plateforme */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Plateforme
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Catalogue de jeux
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  À propos du studio
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  FAQ & Support
                </Link>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Barre inférieure épurée */}
        <div className="mt-14 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TECHNOVA GAMES. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-slate-400 transition-colors">Conditions</Link>
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
