import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, Sparkles, ArrowRight, ShieldCheck, Globe, Zap, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, smoothEase } from '../components/MotionReveal';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    category: 'Général',
    question: 'Qu\'est-ce que Technova Games ?',
    answer: 'Technova Games est la plateforme centrale qui regroupe tous les sites de jeux web créés et développés par l\'équipe Technova. Au lieu de chercher chaque jeu séparément, cette vitrine vous permet de retrouver toutes nos créations au même endroit et de lancer une partie en un clic.'
  },
  {
    category: 'Général',
    question: 'Comment lancer une partie ?',
    answer: 'C\'est immédiat : parcourez le catalogue, choisissez le jeu qui vous intéresse et cliquez sur sa carte ou sur le bouton "Jouer". Vous serez automatiquement redirigé vers le site web officiel du jeu pour démarrer votre partie directement.'
  },
  {
    category: 'Technique',
    question: 'Dois-je télécharger ou installer des fichiers pour jouer ?',
    answer: 'Non, absolument aucun téléchargement ni aucune installation ! Tous nos jeux sont 100% en ligne : ils s\'exécutent directement dans votre navigateur web (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).'
  },
  {
    category: 'Technique',
    question: 'Puis-je jouer depuis un smartphone ou une tablette ?',
    answer: 'Oui ! Nos jeux web sont développés pour s\'adapter aux différentes tailles d\'écran. Vous pouvez jouer sur votre ordinateur (PC/Mac) ou sur vos appareils mobiles connectés à internet.'
  },
  {
    category: 'Compte & Données',
    question: 'Faut-il créer un compte joueur pour accéder aux jeux ?',
    answer: 'Non, aucun compte joueur n\'est requis pour jouer. Vous pouvez accéder à tous les jeux librement et anonymement. L\'espace de connexion avec mot de passe est strictement réservé à l\'administrateur de Technova pour gérer le catalogue.'
  },
  {
    category: 'Compte & Données',
    question: 'Est-ce que l\'accès aux jeux est gratuit ?',
    answer: 'Oui, tous les jeux créés par Technova et référencés sur cette plateforme sont entièrement accessibles gratuitement.'
  },
  {
    category: 'Support',
    question: 'Comment signaler un bug ou proposer une idée de jeu ?',
    answer: 'Vos retours sont précieux ! Vous pouvez nous faire part de vos idées ou signaler un dysfonctionnement en nous écrivant via nos plateformes ou directement par email.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-1 font-sans">
      {/* Header */}
      <FadeIn distance={25} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Foire Aux Questions</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Questions Fréquentes
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Retrouvez toutes les réponses essentielles concernant le fonctionnement des jeux web de Technova.
        </p>
      </FadeIn>

      {/* Accordion List with Smooth Stagger and Framer Motion Expansion */}
      <StaggerContainer staggerDelay={0.08} className="space-y-4 mb-16">
        {FAQ_LIST.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <StaggerItem key={idx}>
              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors hover:border-emerald-500/50">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full shrink-0 font-heading">
                      {item.category}
                    </span>
                    <span className="font-heading font-bold text-base sm:text-lg text-slate-900">
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className="text-slate-400 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  </motion.div>
                </button>

                {/* Animated collapse / expand */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: smoothEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Bottom CTA Box */}
      <FadeIn distance={20} className="p-8 sm:p-10 rounded-3xl bg-emerald-50 border border-emerald-200/80 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
          Vous avez d'autres questions ?
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Plongez directement dans notre catalogue pour tester les jeux web créés par Technova ou découvrez l'histoire du studio.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/games"
            className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
          >
            Explorer les jeux
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 rounded-full bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 font-bold text-xs sm:text-sm transition-all"
          >
            À propos du studio
          </Link>
        </div>
      </FadeIn>
    </div>
  );
};
