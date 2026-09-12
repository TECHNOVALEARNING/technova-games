import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gamesService } from '../../services/gamesService';
import type { Game, AdminStats } from '../../types';
import { 
  Gamepad2, 
  CheckCircle2, 
  FileEdit, 
  Star, 
  PlusCircle, 
  ArrowRight, 
  Clock, 
  BarChart3
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [statsData, allGames] = await Promise.all([
          gamesService.getAdminStats(),
          gamesService.getGames(false)
        ]);
        setStats(statsData);
        setRecentGames(allGames.slice(0, 5));
      } catch (err) {
        console.error('Erreur chargement dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading || !stats) {
    return <LoadingSpinner label="Chargement du tableau de bord..." />;
  }

  const statCards = [
    {
      label: 'Total des jeux',
      value: stats.totalGames,
      sub: 'Jeux enregistrés',
      icon: Gamepad2,
      color: 'text-slate-700',
      bg: 'bg-slate-100 border-slate-200'
    },
    {
      label: 'Jeux en ligne',
      value: stats.publishedGames,
      sub: 'Visibles par le public',
      icon: CheckCircle2,
      color: 'text-[#16a34a]',
      bg: 'bg-green-50 border-green-200'
    },
    {
      label: 'Brouillons',
      value: stats.draftGames,
      sub: 'En cours de préparation',
      icon: FileEdit,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200'
    },
    {
      label: 'Mis en avant',
      value: stats.featuredGames,
      sub: 'Sélectionnés en vedette',
      icon: Star,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200'
    },
  ];

  return (
    <div className="space-y-6 font-['Outfit',sans-serif]">
      {/* Welcome banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vue d'ensemble Technova
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gérez votre catalogue de jeux web, publiez de nouvelles expériences et suivez vos indicateurs.
          </p>
        </div>
        <Link
          to="/admin/games/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-xs transition shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ajouter un jeu</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between hover:shadow-sm transition"
            >
              <div>
                <p className="text-xs text-slate-500 font-medium">
                  {card.label}
                </p>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {card.value}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{card.sub}</p>
              </div>

              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${card.bg} ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Category Breakdown + Recent Games */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <span>Répartition par Catégorie</span>
            </h3>
          </div>

          <div className="space-y-3.5">
            {Object.entries(stats.categoriesCount).map(([category, count]) => {
              const pct = stats.totalGames > 0 ? Math.round((count / stats.totalGames) * 100) : 0;
              return (
                <div key={category} className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-700">
                    <span className="font-semibold">{category}</span>
                    <span className="font-mono text-slate-500">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#16a34a] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/admin/games"
              className="text-xs text-[#16a34a] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Gérer les jeux de ces catégories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Recent Games Table snippet */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Jeux Récents</span>
            </h3>
            <Link
              to="/admin/games"
              className="text-xs text-[#16a34a] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Voir tout</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentGames.map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                    <img
                      src={game.image_url}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 truncate">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {game.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {game.category} • {game.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      game.status === 'published'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}
                  >
                    {game.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>

                  <Link
                    to={`/admin/games/${game.id}/edit`}
                    className="text-xs text-slate-600 hover:text-[#16a34a] font-semibold"
                  >
                    Éditer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
