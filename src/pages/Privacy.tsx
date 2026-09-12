import React from 'react';
import { ShieldCheck, Lock, UserCheck, EyeOff, Server, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/MotionReveal';
import { motion } from 'framer-motion';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-1 font-sans">
      {/* Header */}
      <FadeIn distance={25} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Protection de votre vie privée</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Politique de Confidentialité
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Sur Technova Games, la règle est simple : nous ne collectons aucune donnée personnelle sur nos joueurs.
        </p>
      </FadeIn>

      {/* Main Content Sections with smooth stagger */}
      <StaggerContainer staggerDelay={0.1} className="space-y-6">
        {/* Article 1: Zéro collecte */}
        <StaggerItem>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-3 text-emerald-600 font-heading font-bold text-lg sm:text-xl">
              <EyeOff className="w-6 h-6" />
              <h2>1. Zéro Donnée Personnelle Collectée sur les Joueurs</h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Pour jouer aux jeux web sur Technova Games, <strong>aucune inscription n'est requise</strong>. Nous ne vous demandons ni nom, ni adresse email, ni mot de passe, ni numéro de téléphone, ni information bancaire.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Vous pouvez parcourir le catalogue et lancer n'importe quel jeu web de manière totalement libre et anonyme.
            </p>
          </motion.div>
        </StaggerItem>

        {/* Article 2: Connexion réservée admin */}
        <StaggerItem>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-3 text-emerald-600 font-heading font-bold text-lg sm:text-xl">
              <Lock className="w-6 h-6" />
              <h2>2. Accès de Connexion Réservé à l'Administrateur</h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              L'espace d'authentification (`/admin/login`) sert uniquement à l'équipe d'administration de Technova pour accéder au tableau de bord afin d'ajouter, modifier ou organiser les liens des jeux web.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Aucun compte joueur n'est créé, stocké ou analysé. Le système d'authentification ne concerne que le gestionnaire de la plateforme.
            </p>
          </motion.div>
        </StaggerItem>

        {/* Article 3: Pas de traqueurs */}
        <StaggerItem>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-3 text-teal-600 font-heading font-bold text-lg sm:text-xl">
              <UserCheck className="w-6 h-6" />
              <h2>3. Pas de Publicités Intrusives ni Revente de Données</h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Technova Games ne vend, ne loue et n'échange aucune donnée à des tiers ou régies publicitaires. Notre plateforme existe uniquement comme un espace convivial pour réunir et faire découvrir nos projets de jeux.
            </p>
          </motion.div>
        </StaggerItem>

        {/* Article 4: Données techniques locales */}
        <StaggerItem>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-3 text-indigo-600 font-heading font-bold text-lg sm:text-xl">
              <Server className="w-6 h-6" />
              <h2>4. Stockage Technique Local (Sur votre navigateur)</h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Certaines données strictement techniques (comme vos préférences d'affichage temporaires) sont conservées localement dans le stockage interne de votre propre navigateur (`localStorage`). Ces données ne quittent jamais votre appareil.
            </p>
          </motion.div>
        </StaggerItem>
      </StaggerContainer>

      {/* Back button */}
      <FadeIn delay={0.2} distance={15} className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </Link>
        <span className="text-xs text-slate-400 font-tech">
          Technova Games • 2026
        </span>
      </FadeIn>
    </div>
  );
};
