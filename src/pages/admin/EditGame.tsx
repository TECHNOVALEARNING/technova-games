import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameForm } from '../../components/admin/GameForm';
import { gamesService } from '../../services/gamesService';
import type { Game, GameFormData } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { AlertCircle } from 'lucide-react';

export const EditGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('ID de jeu manquant.');
      setLoading(false);
      return;
    }

    gamesService.getGameById(id)
      .then((data) => {
        if (!data) {
          setError('Jeu introuvable.');
        } else {
          setGame(data);
        }
      })
      .catch((err) => {
        console.error('Erreur chargement jeu pour édition:', err);
        setError('Impossible de charger les données du jeu.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (formData: GameFormData) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await gamesService.updateGame(id, formData);
      navigate('/admin/games', {
        state: { message: `Le jeu "${formData.title}" a été mis à jour avec succès !` }
      });
    } catch (err) {
      console.error('Erreur modification jeu:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Chargement des informations du jeu..." />;
  }

  if (error || !game) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-rose-200 text-center max-w-lg mx-auto my-12 shadow-sm font-['Outfit',sans-serif]">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Erreur</h2>
        <p className="text-sm text-slate-500 mb-6">{error || 'Jeu introuvable.'}</p>
        <button
          onClick={() => navigate('/admin/games')}
          className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
        >
          Retourner à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="py-2">
      <GameForm
        title={`Modifier : ${game.title}`}
        initialData={game}
        onSubmit={handleUpdate}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
