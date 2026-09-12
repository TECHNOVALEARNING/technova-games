import React from 'react';
import { FileText, ArrowLeft, Shield, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/MotionReveal';
import { motion } from 'framer-motion';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-1 font-sans">
      {/* Header */}
      <FadeIn distance={25} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <FileText className="w-3.5 h-3.5 text-emerald-600" />
          <span>Informations Légales</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Conditions d'Utilisation
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Les règles d'utilisation de la plateforme web Technova Games.
        </p>
      </FadeIn>

      {/* Terms Sections with smooth stagger */}
      <StaggerContainer staggerDelay={0.1} className="space-y-6">
        <StaggerItem>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-2.5 text-emerald-600 font-heading font-bold text-lg">
              <Globe className="w-5 h-5" />
              <h2>1. Objet du Service</h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Technova Games est une plateforme en ligne dont le but est de regrouper et de présenter les jeux web créés par le studio Technova. Les visiteurs peuvent librement parcourir les fiches de jeux, consulter leurs caractéristiques et être redirigés vers les sites de jeux pour y jouer.
            </p>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-2.5 text-emerald-600 font-heading font-bold text-lg">
              <Shield className="w-5 h-5" />
              <h2>2. Accès et Gratuité</h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              L'accès à la plateforme Technova Games et aux jeux web référencés est entièrement gratuit pour les utilisateurs. Aucun abonnement ni frais d'inscription ne sont exigés pour jouer.
            </p>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-2.5 text-emerald-600 font-heading font-bold text-lg">
              <Award className="w-5 h-5" />
              <h2>3. Propriété Intellectuelle</h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tous les contenus, logos, visuels, textes, marques et jeux web développés par Technova sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou redistribution sans autorisation préalable est interdite.
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
