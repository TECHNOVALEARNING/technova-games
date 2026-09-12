import React from 'react';

interface LoadingSpinnerProps {
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  label = 'Chargement des jeux Technova...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 space-y-4 text-center font-['Outfit',sans-serif]">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-3 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-3 border-[#16a34a] border-t-transparent animate-spin" />
      </div>
      <p className="text-slate-500 text-xs font-semibold tracking-wide">
        {label}
      </p>
    </div>
  );
};
