import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGames } from '../hooks/useGames';
import { GameGrid } from '../components/GameGrid';
import { GameFilters } from '../components/GameFilters';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { Gamepad2 } from 'lucide-react';
import { FadeIn } from '../components/MotionReveal';
import { motion } from 'framer-motion';

export const Games: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { games, loading } = useGames(true);

  // Read initial values from URL query parameters if present
  const initialCategory = searchParams.get('category') || 'Tous';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Toutes');

  // Sync state if URL search parameters change
  useEffect(() => {
    const urlCat = searchParams.get('category');
    if (urlCat) setSelectedCategory(urlCat);

    const urlSearch = searchParams.get('search');
    if (urlSearch !== null) setSearch(urlSearch);
  }, [searchParams]);

  // Update URL params
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'Tous') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params, { replace: true });
  };

  const handleSearchChange = (query: string) => {
    setSearch(query);
    const params = new URLSearchParams(searchParams);
    if (!query) {
      params.delete('search');
    } else {
      params.set('search', query);
    }
    setSearchParams(params, { replace: true });
  };

  // Dynamic filtering in React
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // 1. Search filter: matches title, description, or category
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || (
        game.title.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q)
      );

      // 2. Category filter
      const matchesCategory = selectedCategory === 'Tous' || game.category === selectedCategory;

      // 3. Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'Toutes' || game.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [games, search, selectedCategory, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full flex-1 font-sans">
      {/* Page Header with smooth entrance */}
      <FadeIn distance={25} className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Gamepad2 className="w-4 h-4 text-emerald-600" />
          <span>CATALOGUE COMPLET TECHNOVA</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Tous les Jeux
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
          Explorez l'ensemble des jeux web créés par Technova. Cliquez sur n'importe quelle carte pour lancer instantanément le jeu sans téléchargement.
        </p>
      </FadeIn>

      {/* Filters Bar with smooth entrance */}
      <FadeIn delay={0.1} distance={20}>
        <GameFilters
          search={search}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          totalResults={filteredGames.length}
        />
      </FadeIn>

      {/* Game Content */}
      {loading ? (
        <LoadingSpinner label="Chargement du catalogue des jeux..." />
      ) : filteredGames.length > 0 ? (
        /* Strictly 2xN grid on desktop with smooth staggered cards */
        <motion.div
          key={`${selectedCategory}-${selectedDifficulty}-${search}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <GameGrid games={filteredGames} />
        </motion.div>
      ) : (
        <EmptyState
          title="Aucun jeu ne correspond à vos critères"
          message="Essaie de modifier tes termes de recherche ou de sélectionner une autre catégorie."
          onReset={() => {
            setSearch('');
            setSelectedCategory('Tous');
            setSelectedDifficulty('Toutes');
            setSearchParams({}, { replace: true });
          }}
        />
      )}
    </div>
  );
};
