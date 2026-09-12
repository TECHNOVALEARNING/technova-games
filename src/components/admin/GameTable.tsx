import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Game } from '../../types';
import { Edit3, Trash2, ExternalLink, Search } from 'lucide-react';

interface GameTableProps {
  games: Game[];
  onDeleteClick: (game: Game) => void;
}

export const GameTable: React.FC<GameTableProps> = ({ games, onDeleteClick }) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = games.filter((g) => {
    const q = filterQuery.toLowerCase();
    return (
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.difficulty.toLowerCase().includes(q) ||
      g.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 font-['Outfit',sans-serif]">
      {/* Search within table */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filtrer par nom, catégorie, difficulté..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          {filtered.length} jeu{filtered.length > 1 ? 'x' : ''} répertorié{filtered.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th scope="col" className="py-3.5 px-4">Jaquette</th>
              <th scope="col" className="py-3.5 px-4">Titre & Slug</th>
              <th scope="col" className="py-3.5 px-4">Catégorie</th>
              <th scope="col" className="py-3.5 px-4">Difficulté</th>
              <th scope="col" className="py-3.5 px-4">Statut</th>
              <th scope="col" className="py-3.5 px-4">Date</th>
              <th scope="col" className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length > 0 ? (
              filtered.map((game) => (
                <tr key={game.id} className="hover:bg-slate-50/70 transition">
                  {/* Cover */}
                  <td className="py-3 px-4">
                    <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                      <img
                        src={game.image_url}
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  {/* Title & Badges */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{game.title}</span>
                      {game.is_new && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-[#16a34a] border border-green-200">
                          NOUVEAU
                        </span>
                      )}
                      {game.featured && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          VEDETTE
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
                      /{game.slug}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                      {game.category}
                    </span>
                  </td>

                  {/* Difficulty */}
                  <td className="py-3 px-4 text-xs font-semibold">
                    <span
                      className={
                        game.difficulty === 'Facile'
                          ? 'text-emerald-600'
                          : game.difficulty === 'Moyen'
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }
                    >
                      {game.difficulty}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        game.status === 'published'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-amber-50 border-amber-200 text-amber-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          game.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      {game.status === 'published' ? 'En ligne' : 'Brouillon'}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-xs text-slate-500 font-mono">
                    {new Date(game.created_at).toLocaleDateString('fr-FR')}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={game.game_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Tester le jeu dans un nouvel onglet"
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-[#16a34a] hover:bg-green-50 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <Link
                        to={`/admin/games/${game.id}/edit`}
                        title="Modifier ce jeu"
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => onDeleteClick(game)}
                        title="Supprimer ce jeu"
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 text-xs font-medium">
                  Aucun jeu trouvé avec ces critères.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
