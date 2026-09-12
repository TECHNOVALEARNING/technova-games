import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../../hooks/useGames';
import { gamesService } from '../../services/gamesService';
import type { Game } from '../../types';
import { GameTable } from '../../components/admin/GameTable';
import { DeleteModal } from '../../components/admin/DeleteModal';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { PlusCircle, Gamepad2, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminGames: React.FC = () => {
  // Load ALL games including drafts
  const { games, loading, refreshGames } = useGames(false);

  const [selectedGameForDelete, setSelectedGameForDelete] = useState<Game | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleDeleteClick = (game: Game) => {
    setSelectedGameForDelete(game);
  };

  const handleConfirmDelete = async () => {
    if (!selectedGameForDelete) return;

    try {
      setIsDeleting(true);
      await gamesService.deleteGame(selectedGameForDelete.id);
      setSelectedGameForDelete(null);
      setFeedback({
        type: 'success',
        message: `Le jeu "${selectedGameForDelete.title}" a été supprimé avec succès.`
      });
      await refreshGames();
    } catch (err) {
      console.error('Erreur suppression:', err);
      const msg = err instanceof Error ? err.message : 'Erreur lors de la suppression du jeu.';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 font-['Outfit',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/90">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-1">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Catalogue du Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tous les Jeux ({games.length})
          </h1>
        </div>

        <Link
          to="/admin/games/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-xs transition shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ajouter un jeu</span>
        </Link>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-700 font-semibold text-sm ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Table */}
      {loading ? (
        <LoadingSpinner label="Chargement de la liste des jeux..." />
      ) : (
        <GameTable games={games} onDeleteClick={handleDeleteClick} />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={selectedGameForDelete !== null}
        gameTitle={selectedGameForDelete?.title || ''}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setSelectedGameForDelete(null)}
      />
    </div>
  );
};
