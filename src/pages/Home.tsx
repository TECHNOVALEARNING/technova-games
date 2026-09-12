import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { GameGrid } from '../components/GameGrid';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { useGames } from '../hooks/useGames';
import {
  HelpCircle,
  MessageSquare,
  MapPin,
  ArrowRight,
  Zap,
  MonitorSmartphone,
  ShieldCheck,
  Gamepad2,
  Layers,
  ExternalLink
} from 'lucide-react';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ConvergeItem,
} from '../components/MotionReveal';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { games, loading } = useGames(true);

  // Take first 4 games for the 2x2 grid
  const featuredGames = games.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen text-slate-900 font-sans">
      {/* 1. Hero Section with Seamless Animated Background */}
      <Hero />

      {/* 2. Barre d'engagements & piliers de jeu avec cascade fluide au scroll */}
      <section className="py-10 bg-white/75 backdrop-blur-md border-y border-slate-200/70 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {/* Feature 1 */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex items-center gap-3.5 group cursor-default p-2 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 group-hover:bg-emerald-100/70 transition-all duration-300 shadow-xs">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight font-heading">
                    100% Instantané
                  </h4>
                  <p className="text-xs text-slate-500">Zéro téléchargement, jouez en 1 clic</p>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Feature 2 */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex items-center gap-3.5 group cursor-default p-2 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 group-hover:bg-emerald-100/70 transition-all duration-300 shadow-xs">
                  <MonitorSmartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight font-heading">
                    Tous Navigateurs
                  </h4>
                  <p className="text-xs text-slate-500">Fluide sur PC, Mac, mobile & tablette</p>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Feature 3 */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex items-center gap-3.5 group cursor-default p-2 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 group-hover:bg-emerald-100/70 transition-all duration-300 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight font-heading">
                    Accès Totalement Libre
                  </h4>
                  <p className="text-xs text-slate-500">Aucun compte joueur obligatoire</p>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Feature 4 */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex items-center gap-3.5 group cursor-default p-2 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 group-hover:bg-emerald-100/70 transition-all duration-300 shadow-xs">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight font-heading">
                    Moteur 60 FPS
                  </h4>
                  <p className="text-xs text-slate-500">Expériences HTML5 & WebGL réactives</p>
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Green Banner with 3 White Floating Cards (Effet de convergence spectaculaire) */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeIn distance={20} className="relative rounded-3xl bg-[#10b981] p-8 sm:p-14 overflow-hidden shadow-2xl shadow-emerald-900/10">
          {/* Faint Background Watermark Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-white/[0.08] font-black text-7xl sm:text-9xl whitespace-nowrap tracking-tighter font-heading">
              TECHNOVA GAMES
            </span>
          </div>

          {/* 3 White Floating Cards with Smooth Convergence */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 : Arrive de la gauche */}
            <ConvergeItem position="left" delay={0.05}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="bg-white text-slate-900 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col items-center text-center h-full border border-slate-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6 shadow-xs">
                  <HelpCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">
                  Trouver votre solution
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Sélectionnez votre jeu parmi notre collection triée par catégories et affinez selon vos envies.
                </p>
              </motion.div>
            </ConvergeItem>

            {/* Card 2 : Émerge du centre avec subtil zoom */}
            <ConvergeItem position="center" delay={0.15}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="bg-white text-slate-900 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col items-center text-center h-full border border-slate-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6 shadow-xs">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">
                  Dites nous tout !
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Vous avez la possibilité de nous faire des retours pour améliorer continuellement chaque jeu.
                </p>
              </motion.div>
            </ConvergeItem>

            {/* Card 3 : Arrive de la droite */}
            <ConvergeItem position="right" delay={0.25}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="bg-white text-slate-900 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col items-center text-center h-full border border-slate-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6 shadow-xs">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">
                  Notez votre expérience
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Pour guider les nouveaux joueurs sur le prochain jeu, n'hésitez pas à partager vos impressions.
                </p>
              </motion.div>
            </ConvergeItem>
          </div>
        </FadeIn>
      </section>

      {/* 4. Main Games Showcase: "Trouvez votre jeu sur notre page dédiée" (Strictly 2 per row) */}
      <section id="catalogue-jeux" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:pb-24 w-full">
        <FadeIn distance={25} className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Gamepad2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sélection à l'affiche</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Trouvez votre jeu sur notre page dédiée
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Les jeux Technova sont triés dans une page dédiée, ils sont triés par date de sortie ou par préférence.
          </p>
        </FadeIn>

        {loading ? (
          <LoadingSpinner label="Chargement des jeux..." />
        ) : featuredGames.length > 0 ? (
          <div>
            {/* Strictly 2 cards per row with smooth staggered cascade */}
            <GameGrid games={featuredGames} />

            {/* Link bottom right matching reference: "Voir la liste des jeux" with micro-animation */}
            <FadeIn delay={0.2} distance={15} className="mt-10 flex justify-end">
              <Link
                to="/games"
                className="group text-sm font-bold text-slate-800 hover:text-emerald-600 inline-flex items-center gap-2 transition-colors py-2 px-4 rounded-full hover:bg-emerald-50"
              >
                <span>Voir la liste complète des jeux</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-600" />
              </Link>
            </FadeIn>
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 5. Section Écosystème Technova : Au-delà du jeu vidéo (Placée juste avant le footer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 w-full">
        <FadeIn distance={30} className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>GALAXIE TECHNOVA</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
                Au-delà du jeu vidéo
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              Découvrez les autres plateformes et solutions numériques créées par Technova. Cliquez pour visiter chaque univers.
            </p>
          </div>

          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Technova Learning */}
            <StaggerItem>
              <motion.a
                whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
                href="https://www.technovalearning.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 hover:border-emerald-500 hover:bg-white shadow-2xs hover:shadow-lg hover:shadow-emerald-500/5 transition-colors duration-300 flex flex-col justify-between group h-full cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-slate-900 group-hover:text-emerald-600 transition-colors font-heading">
                      Technova Learning
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Plateforme de formation interactive et d'apprentissage numérique pour monter en compétences.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/70 text-[11px] font-bold text-emerald-600">
                  <span>www.technovalearning.com</span>
                  <span className="group-hover:translate-x-1 transition-transform">Visiter ↗</span>
                </div>
              </motion.a>
            </StaggerItem>

            {/* Sonorya */}
            <StaggerItem>
              <motion.a
                whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
                href="https://www.sonorya.co"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 hover:border-emerald-500 hover:bg-white shadow-2xs hover:shadow-lg hover:shadow-emerald-500/5 transition-colors duration-300 flex flex-col justify-between group h-full cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-slate-900 group-hover:text-emerald-600 transition-colors font-heading">
                      Sonorya
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Expériences audio immersives et création d'univers sonores de nouvelle génération.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/70 text-[11px] font-bold text-emerald-600">
                  <span>www.sonorya.co</span>
                  <span className="group-hover:translate-x-1 transition-transform">Visiter ↗</span>
                </div>
              </motion.a>
            </StaggerItem>

            {/* Humanizer */}
            <StaggerItem>
              <motion.a
                whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
                href="https://www.humanizerai.space"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/90 hover:border-emerald-500 hover:bg-white shadow-2xs hover:shadow-lg hover:shadow-emerald-500/5 transition-colors duration-300 flex flex-col justify-between group h-full cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-slate-900 group-hover:text-emerald-600 transition-colors font-heading">
                      Humanizer
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Solutions et outils avancés basés sur l'intelligence artificielle pour humaniser et enrichir vos contenus.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/70 text-[11px] font-bold text-emerald-600">
                  <span>www.humanizerai.space</span>
                  <span className="group-hover:translate-x-1 transition-transform">Visiter ↗</span>
                </div>
              </motion.a>
            </StaggerItem>
          </StaggerContainer>
        </FadeIn>
      </section>
    </div>
  );
};
