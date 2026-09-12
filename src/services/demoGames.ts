import type { Game } from '../types';

export const INITIAL_DEMO_GAMES: Game[] = [
  {
    id: 'game-1-cyber-odyssey',
    title: 'Cyber Odyssey',
    slug: 'cyber-odyssey',
    description: 'Explorez une métropole cyberpunk dystopique dans ce jeu d\'action-aventure immersif jouable directement dans votre navigateur.',
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    category: 'Action',
    difficulty: 'Moyen',
    players: '1 joueur',
    game_url: 'https://cyberodyssey.technovagames.com',
    featured: true,
    is_new: true,
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'game-2-neon-runner',
    title: 'Neon Runner',
    slug: 'neon-runner',
    description: 'Foncez à toute vitesse sur des autoroutes luminescentes au rythme d\'une bande-son synthwave énergique. Esquivez les obstacles et battez vos records.',
    image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    category: 'Arcade',
    difficulty: 'Difficile',
    players: '1 joueur',
    game_url: 'https://neonrunner.technovagames.com',
    featured: true,
    is_new: true,
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'game-3-shadow-protocol',
    title: 'Shadow Protocol',
    slug: 'shadow-protocol',
    description: 'Infiltrez des installations sécurisées et neutralisez les défenses ennemies dans ce jeu tactique d\'espionnage au tour par tour.',
    image_url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    category: 'Stratégie',
    difficulty: 'Expert',
    players: '1 joueur',
    game_url: 'https://shadowprotocol.technovagames.com',
    featured: true,
    is_new: false,
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'game-4-vortex-strike',
    title: 'Vortex Strike',
    slug: 'vortex-strike',
    description: 'Prenez les commandes d\'un vaisseau de combat interstellaire et affrontez des vagues d\'envahisseurs dans un shoot\'em up spatial explosif.',
    image_url: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
    category: 'Action',
    difficulty: 'Moyen',
    players: '1-2 joueurs',
    game_url: 'https://vortexstrike.technovagames.com',
    featured: true,
    is_new: false,
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    updated_at: new Date().toISOString()
  }
];
