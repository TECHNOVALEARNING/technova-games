import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Game, GameFormData, AdminStats } from '../types';
import { INITIAL_DEMO_GAMES } from './demoGames';
import { storageService } from './storageService';

const LOCAL_STORAGE_KEY = 'technova_games_data_v3';

// Helper for local mock storage
function getLocalGames(): Game[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_GAMES));
      return INITIAL_DEMO_GAMES;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_DEMO_GAMES;
  }
}

function saveLocalGames(games: Game[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));
  } catch (e) {
    console.error('Erreur de sauvegarde locale des jeux:', e);
  }
}

export const gamesService = {
  /**
   * Fetch all games, optionally filtered by published status
   */
  async getGames(filterPublishedOnly = true): Promise<Game[]> {
    if (isSupabaseConfigured) {
      try {
        let query = supabase
          .from('games')
          .select('*')
          .order('created_at', { ascending: false });

        if (filterPublishedOnly) {
          query = query.eq('status', 'published');
        }

        const { data, error } = await query;

        if (error) {
          console.warn('Erreur Supabase getGames, passage au stockage local:', error.message);
          return getLocalGames().filter(g => !filterPublishedOnly || g.status === 'published');
        }

        return data as Game[];
      } catch (err) {
        console.warn('Exception Supabase getGames:', err);
        return getLocalGames().filter(g => !filterPublishedOnly || g.status === 'published');
      }
    }

    // Local storage fallback
    const games = getLocalGames();
    return filterPublishedOnly ? games.filter(g => g.status === 'published') : games;
  },

  /**
   * Fetch single game by its unique slug
   */
  async getGameBySlug(slug: string): Promise<Game | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) {
          console.warn('Erreur Supabase getGameBySlug:', error.message);
          const localMatch = getLocalGames().find(g => g.slug === slug);
          return localMatch || null;
        }

        return data as Game | null;
      } catch (err) {
        console.warn('Exception Supabase getGameBySlug:', err);
        const localMatch = getLocalGames().find(g => g.slug === slug);
        return localMatch || null;
      }
    }

    const localMatch = getLocalGames().find(g => g.slug === slug);
    return localMatch || null;
  },

  /**
   * Fetch single game by id (used for editing in admin)
   */
  async getGameById(id: string): Promise<Game | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.warn('Erreur Supabase getGameById:', error.message);
          return getLocalGames().find(g => g.id === id) || null;
        }

        return data as Game | null;
      } catch (err) {
        console.warn('Exception Supabase getGameById:', err);
        return getLocalGames().find(g => g.id === id) || null;
      }
    }

    return getLocalGames().find(g => g.id === id) || null;
  },

  /**
   * Create a new game in Supabase
   */
  async createGame(gameData: GameFormData): Promise<Game> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('games')
        .insert([gameData])
        .select()
        .single();

      if (error) {
        throw new Error(`Erreur lors de l'ajout du jeu: ${error.message}`);
      }

      return data as Game;
    }

    // Local fallback
    const games = getLocalGames();
    const newGame: Game = {
      ...gameData,
      id: 'game-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    games.unshift(newGame);
    saveLocalGames(games);
    return newGame;
  },

  /**
   * Update an existing game in Supabase
   */
  async updateGame(id: string, gameData: Partial<GameFormData>): Promise<Game> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('games')
        .update({
          ...gameData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Erreur lors de la modification du jeu: ${error.message}`);
      }

      return data as Game;
    }

    // Local fallback
    const games = getLocalGames();
    const index = games.findIndex(g => g.id === id);
    if (index === -1) {
      throw new Error('Jeu introuvable.');
    }

    const updated: Game = {
      ...games[index],
      ...gameData,
      updated_at: new Date().toISOString()
    };

    games[index] = updated;
    saveLocalGames(games);
    return updated;
  },

  /**
   * Delete a game and remove its cover image from Supabase Storage
   */
  async deleteGame(id: string): Promise<void> {
    const existingGame = await this.getGameById(id);

    if (existingGame?.image_url) {
      await storageService.deleteGameCover(existingGame.image_url);
    }

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Erreur lors de la suppression du jeu: ${error.message}`);
      }
      return;
    }

    // Local fallback
    const games = getLocalGames().filter(g => g.id !== id);
    saveLocalGames(games);
  },

  /**
   * Get statistics for Admin Dashboard
   */
  async getAdminStats(): Promise<AdminStats> {
    const allGames = await this.getGames(false);

    const categoriesCount: Record<string, number> = {};
    allGames.forEach(g => {
      categoriesCount[g.category] = (categoriesCount[g.category] || 0) + 1;
    });

    return {
      totalGames: allGames.length,
      publishedGames: allGames.filter(g => g.status === 'published').length,
      draftGames: allGames.filter(g => g.status === 'draft').length,
      featuredGames: allGames.filter(g => g.featured).length,
      categoriesCount
    };
  }
};
