import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothEase } from './MotionReveal';

// =========================================================================
// 🖼️ MODIFIEZ ICI LES IMAGES QUI DÉFILENT DANS LA SECTION HERO
// 💡 CONSEIL QUALITÉ : Utilisez des images au format PAYSAGE (16:9 / 1920x1080)
// pour qu'elles restent parfaitement nettes ("claires et nettes") sur écran d'ordinateur
// sans être sur-zoomées ou coupées comme les affiches verticales mobiles.
// =========================================================================
export const HERO_BACKGROUND_IMAGES = [
  {
    id: 'hero-1',
    title: 'eFootball & Sports Web',
    image_url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=2000&q=90'
  },
  {
    id: 'hero-2',
    title: 'Call of Duty: Modern Warfare',
    image_url: 'https://wallpaperaccess.com/full/1077759.jpg'
  },
  {
    id: 'hero-3',
    title: 'Cyberpunk & Web Games',
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=90'
  },
  {
    id: 'hero-4',
    title: 'Vortex Strike',
    image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2000&q=90'
  }
];

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroImages = HERO_BACKGROUND_IMAGES;

  // Défilement automatique très fluide toutes les 7 secondes
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const scrollToGames = () => {
    const section = document.getElementById('catalogue-jeux');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[680px] flex flex-col justify-between pt-16 pb-12 sm:py-20">
      {/* 1. IMAGES DE FOND EN FONDU ENCHAÎNÉ ULTRA FLUIDE AVEC SUBTIL EFFET KEN BURNS */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-slate-950">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={heroImages[activeSlide]?.id || activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[activeSlide]?.image_url}
              alt={heroImages[activeSlide]?.title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Voiles de contraste sophistiqués */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-slate-950/50" />
        {/* Glow discret au centre */}
        <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. CONTENU DU HERO AVEC CASCADE D'ANIMATIONS ÉLÉGANTES */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-8">

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: smoothEase }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6 drop-shadow-lg"
        >
          Retrouver tous vos <br className="hidden sm:inline" />
          <span className="text-white">jeux au même endroit.</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: smoothEase }}
          className="text-slate-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-10 drop-shadow text-balance"
        >
          Tous vos jeux web préférés créés par Technova réunis sur une seule plateforme. Ne cherchez plus : explorez nos univers, relevez des défis épiques et lancez vos parties en un clic sans aucun téléchargement.
        </motion.p>

        {/* Bouton principal avec micro-animation au hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToGames}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-base transition-colors duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Retrouvez tous nos jeux</span>
          </motion.button>
        </motion.div>
      </div>

      {/* 3. FLÈCHE DISCRÈTE AVEC FLUIDITÉ CONTINUE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-2"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          onClick={scrollToGames}
          className="text-white/70 hover:text-white transition-colors p-2 cursor-pointer"
          aria-label="Faire défiler vers le bas"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};
