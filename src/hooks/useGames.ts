import { useState, useEffect, useCallback } from 'react';
import type { Game } from '../types';
import { gamesService } from '../services/gamesService';

export function useGames(publishedOnly = true) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await gamesService.getGames(publishedOnly);
      setGames(data);
    } catch (err) {
      console.error('Erreur chargement jeux:', err);
      setError('Impossible de récupérer la liste des jeux.');
    } finally {
      setLoading(false);
    }
  }, [publishedOnly]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return { games, loading, error, refreshGames: fetchGames };
}

export function useGame(slug?: string) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    gamesService.getGameBySlug(slug)
      .then((data) => {
        if (isMounted) {
          if (!data) {
            setError('Jeu introuvable.');
          } else {
            setGame(data);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Erreur chargement jeu:', err);
          setError('Erreur lors du chargement des détails du jeu.');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { game, loading, error };
}
