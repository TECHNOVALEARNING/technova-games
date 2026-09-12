export type GameCategory = 
  | 'Quiz'
  | 'Arcade'
  | 'Réflexion'
  | 'Action'
  | 'Stratégie'
  | 'Autres';

export type GameDifficulty = 
  | 'Facile'
  | 'Moyen'
  | 'Difficile'
  | 'Expert';

export type GameStatus = 'published' | 'draft';

export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  category: GameCategory;
  difficulty: GameDifficulty;
  players: string; // e.g. "1 joueur", "1-2 joueurs", "Multijoueur"
  game_url?: string;
  featured: boolean;
  is_new: boolean;
  status: GameStatus;
  created_at: string;
  updated_at?: string;
}

export type GameFormData = Omit<Game, 'id' | 'created_at' | 'updated_at'>;

export interface FilterState {
  search: string;
  category: string;
  difficulty: string;
  sortBy: 'latest' | 'title' | 'popular';
}

export interface AdminStats {
  totalGames: number;
  publishedGames: number;
  draftGames: number;
  featuredGames: number;
  categoriesCount: Record<string, number>;
}
