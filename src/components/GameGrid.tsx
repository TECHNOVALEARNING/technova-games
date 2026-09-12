import React from 'react';
import type { Game } from '../types';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: Game[];
}

export const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  return (
    /* Strictly 2 cards per line on desktop and tablet, 1 on mobile */
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
      {games.map((game, idx) => (
        <GameCard key={game.id} game={game} index={idx} />
      ))}
    </div>
  );
};
