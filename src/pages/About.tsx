import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Zap,
  ShieldCheck,
  Gamepad2
} from 'lucide-react';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ConvergeItem
} from '../components/MotionReveal';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-1 font-sans">
      {/* 1. EN-TÊTE PRINCIPALE */}
      <FadeIn distance={30} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5">
          Le portail officiel de tous les <br className="hidden sm:inline" />
          <span className="text-emerald-600">jeux web créés par Technova</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Découvrez, explorez et lancez instantanément tous les sites et expériences de jeux web conçus par l'équipe Technova, réunis sur une seule et même plateforme.
        </p>
      </FadeIn>

      {/* 2. CE QUE FAIT LA PLATEFORME */}
      <FadeIn distance={25} className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 mb-14 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block font-heading">
            Notre Mission
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Centraliser nos créations pour vous faire jouer en un clic
          </h2>
          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              Au fil de nos projets, l'équipe Technova a développé plusieurs sites web de jeux interactifs, chacun ayant son propre univers, ses règles et ses défis.
            </p>
            <p>
              <strong>Technova Games</strong> est né pour être le hub central de cet écosystème : une vitrine épurée et moderne qui rassemble tous nos jeux en ligne. Plus besoin de chercher partout : chaque carte sur la plateforme est directement reliée au site officiel du jeu correspondant.
            </p>
          </div>
        </div>

        {/* 3 Étapes claires : Comment ça fonctionne avec cascade fluide */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-slate-100"
        >
          <StaggerItem>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 h-full"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-100/80 text-emerald-700 font-tech font-bold text-lg flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Parcourez le catalogue
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explorez nos différents jeux classés par univers, catégories et niveaux de difficulté.
              </p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 h-full"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-100/80 text-emerald-700 font-tech font-bold text-lg flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Cliquez sur le jeu
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Chaque carte contient le lien direct vers le site web du jeu créé par Technova.
              </p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 h-full"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-100/80 text-emerald-700 font-tech font-bold text-lg flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Jouez directement en ligne
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Le jeu se lance directement dans votre navigateur web, sans aucune installation.
              </p>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </FadeIn>

      {/* 3. NOS ENGAGEMENTS POUR LES JOUEURS (Effet de convergence fluide) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {/* Engagement 1 : 100% en ligne */}
        <ConvergeItem position="left" delay={0.05}>
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/70 hover:shadow-xl hover:shadow-emerald-500/5 transition-colors duration-300 space-y-4 h-full"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900">
              100% Web & En Ligne
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tous nos jeux tournent directement dans votre navigateur web (sur ordinateur, smartphone ou tablette). Vous n'avez rien à télécharger, rien à installer.
            </p>
          </motion.div>
        </ConvergeItem>

        {/* Engagement 2 : Accès Libre & Gratuit */}
        <ConvergeItem position="center" delay={0.15}>
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/70 hover:shadow-xl hover:shadow-emerald-500/5 transition-colors duration-300 space-y-4 h-full"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900">
              Accès Immédiat & Libre
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pas d'inscription forcée pour tester un jeu. Cliquez sur la carte qui vous plaît et lancez une partie instantanément sans friction.
            </p>
          </motion.div>
        </ConvergeItem>

        {/* Engagement 3 : Expériences Réactives */}
        <ConvergeItem position="right" delay={0.25}>
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
            className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/70 hover:shadow-xl hover:shadow-emerald-500/5 transition-colors duration-300 space-y-4 h-full"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900">
              Fluide & Réactif (60 FPS)
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nous concevons des jeux légers, optimisés pour un chargement rapide et une réactivité maximale sur les technologies web modernes.
            </p>
          </motion.div>
        </ConvergeItem>
      </div>

      {/* 4. APPEL À L'ACTION FINAL AVEC MICRO-ANIMATION */}
      <FadeIn distance={20} className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 sm:p-12 text-white shadow-xl shadow-emerald-900/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-200 mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>PRÊT À JOUER ?</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
            Explorez notre collection dès maintenant
          </h3>
          <p className="text-emerald-100 text-sm max-w-lg">
            Aucun compte requis. Choisissez votre univers préféré et démarrez votre session en un clic.
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/games"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 hover:text-emerald-700 font-bold text-sm shadow-lg shadow-black/10 transition shrink-0 cursor-pointer"
          >
            <span>Voir tous les jeux</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </FadeIn>
    </div>
  );
};
