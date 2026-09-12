import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { GameCategory } from '../types';
import { motion } from 'framer-motion';

interface GameFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (diff: string) => void;
  totalResults: number;
}

const CATEGORIES: (string | GameCategory)[] = [
  'Tous',
  'Action',
  'Arcade',
  'Stratégie',
  'Réflexion',
  'Quiz',
  'Autres'
];

const DIFFICULTIES = ['Toutes', 'Facile', 'Moyen', 'Difficile', 'Expert'];

export const GameFilters: React.FC<GameFiltersProps> = ({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  totalResults
}) => {
  const hasActiveFilters = search !== '' || selectedCategory !== 'Tous' || selectedDifficulty !== 'Toutes';

  const handleReset = () => {
    onSearchChange('');
    onCategoryChange('Tous');
    onDifficultyChange('Toutes');
  };

  return (
    <div className="space-y-6 mb-10">
      {/* Top row: Search input + difficulty select */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Live Search input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher par titre, description ou mot-clé..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-slate-200/90 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm shadow-xs focus:ring-2 focus:ring-emerald-500/15 transition-all duration-200 font-sans"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-900 p-0.5 rounded cursor-pointer"
              title="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Difficulty dropdown */}
        <div className="relative min-w-[180px]">
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl bg-white border border-slate-200/90 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer shadow-xs focus:ring-2 focus:ring-emerald-500/15 transition-all duration-200 font-sans"
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff} value={diff} className="bg-white text-slate-900">
                Difficulté : {diff}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Counter and reset button */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            <strong className="text-emerald-600 font-tech text-sm">{totalResults}</strong> jeu{totalResults > 1 ? 'x' : ''} trouvé{totalResults > 1 ? 's' : ''}
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-emerald-600 hover:text-emerald-700 hover:underline font-bold cursor-pointer"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
