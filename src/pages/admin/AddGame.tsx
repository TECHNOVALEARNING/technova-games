import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameForm } from '../../components/admin/GameForm';
import { gamesService } from '../../services/gamesService';
import type { GameFormData } from '../../types';

export const AddGame: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (formData: GameFormData) => {
    setIsSubmitting(true);
    try {
      await gamesService.createGame(formData);
      navigate('/admin/games', {
        state: { message: `Le jeu "${formData.title}" a été créé avec succès !` }
      });
    } catch (err) {
      console.error('Erreur ajout jeu:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-4">
      <GameForm
        title="Ajouter un nouveau jeu Technova"
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
