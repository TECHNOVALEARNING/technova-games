import React from 'react';
import type { Game } from '../types';
import { Star, ExternalLink, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameCardProps {
  game: Game;
  index?: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, index = 0 }) => {
  const gameUrl = game.game_url || '#';
  const rating = '4.9';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.08, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="h-full"
    >
      <a
        href={gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col h-full rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/70 transition-colors duration-300 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer"
      >
        {/* Top Game Artwork Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img
            src={game.image_url}
            alt={game.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
          />

          {/* Gradient Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent transition-opacity duration-300 group-hover:opacity-85" />

          {/* Badge Top Left if new */}
          {game.is_new && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40">
                Nouveau
              </span>
            </div>
          )}

          {/* Hover play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
            <div className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-sm flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl shadow-emerald-500/50">
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Jouer maintenant</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="p-5 sm:p-6 bg-white space-y-3 flex-1 flex flex-col justify-between">
          <div>
            {/* Top Line: Title & Rating */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {game.title}
              </h3>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full shrink-0">
                <span>{rating}</span>
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              </div>
            </div>

            {/* Middle Line: Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Web Instant
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {game.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {game.difficulty || 'Normal'}
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Bottom Line: Metadata info */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Technova Games • Sans téléchargement</span>
            <span className="text-emerald-600 group-hover:underline flex items-center gap-1 font-bold">
              <span>Lancer</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
};
