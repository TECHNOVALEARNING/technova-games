import React from 'react';
import { Gamepad2, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Aucun jeu disponible',
  message = 'Les nouveaux jeux apparaîtront ici dès leur publication.',
  onReset
}) => {
  return (
    <div className="p-12 text-center bg-[#0d101e]/60 rounded-3xl border border-white/[0.06] max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
        <Gamepad2 className="w-8 h-8 text-cyan-400/60" />
      </div>
      <h3 className="font-['Rajdhani'] text-2xl font-bold text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        {message}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser les filtres
        </button>
      )}
    </div>
  );
};
