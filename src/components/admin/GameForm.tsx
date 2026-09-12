import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Game, GameFormData, GameCategory, GameDifficulty, GameStatus } from '../../types';
import { storageService } from '../../services/storageService';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  AlertCircle, 
  ArrowLeft,
  Link as LinkIcon
} from 'lucide-react';

interface GameFormProps {
  initialData?: Game;
  onSubmit: (data: GameFormData) => Promise<void>;
  isSubmitting: boolean;
  title: string;
}

const CATEGORIES: GameCategory[] = ['Quiz', 'Arcade', 'Réflexion', 'Action', 'Stratégie', 'Autres'];
const DIFFICULTIES: GameDifficulty[] = ['Facile', 'Moyen', 'Difficile', 'Expert'];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export const GameForm: React.FC<GameFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
  title
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState<GameCategory>(initialData?.category || 'Quiz');
  const [difficulty, setDifficulty] = useState<GameDifficulty>(initialData?.difficulty || 'Moyen');
  const [players, setPlayers] = useState(initialData?.players || '1 joueur');
  const [gameUrl, setGameUrl] = useState(initialData?.game_url || '');
  const [status, setStatus] = useState<GameStatus>(initialData?.status || 'published');
  const [isNew, setIsNew] = useState(initialData?.is_new ?? true);
  const [featured, setFeatured] = useState(initialData?.featured ?? false);

  // Cover image states
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.image_url || '');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(!initialData);

  // Auto-generate slug when name changes (if autoSlug enabled)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (autoSlug) {
      setSlug(generateSlug(val));
    }
  };

  // Image Selection & Preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Veuillez sélectionner un fichier image valide.');
      return;
    }

    setImageError(null);
    setSelectedFile(file);

    // Create local object URL for instant preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageError(null);

    if (!previewUrl && !imageUrl && !selectedFile) {
      setImageError('Veuillez fournir une jaquette (upload ou URL).');
      return;
    }

    try {
      let finalImageUrl = imageUrl;

      // If a new file was selected, upload it via storageService
      if (selectedFile) {
        setUploadingImage(true);
        finalImageUrl = await storageService.uploadGameCover(selectedFile);
        setUploadingImage(false);
      }

      const payload: GameFormData = {
        title: name.trim(),
        slug: slug.trim() || generateSlug(name),
        description: description.trim(),
        image_url: finalImageUrl,
        category,
        difficulty,
        players: players.trim() || '1 joueur',
        game_url: gameUrl.trim() || `/games/${slug.trim() || generateSlug(name)}`,
        featured,
        is_new: isNew,
        status
      };

      await onSubmit(payload);
    } catch (err) {
      setUploadingImage(false);
      const msg = err instanceof Error ? err.message : 'Erreur lors de l\'enregistrement';
      setImageError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl font-['Outfit',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/90">
        <div>
          <button
            type="button"
            onClick={() => navigate('/admin/games')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition mb-1.5 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Retour à la liste des jeux
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate('/admin/games')}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting || uploadingImage}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 text-white font-bold text-xs transition shadow-sm cursor-pointer"
          >
            {isSubmitting || uploadingImage ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{uploadingImage ? 'Upload de la jaquette...' : 'Enregistrement...'}</span>
              </>
            ) : (
              <span>Enregistrer le jeu</span>
            )}
          </button>
        </div>
      </div>

      {imageError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{imageError}</span>
        </div>
      )}

      {/* SECTION 1: Informations générales */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <span>1. Informations générales</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nom du jeu <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="ex: Cyber Quiz, Quantum Runner..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] text-sm transition"
            />
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Slug (identifiant URL) <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setAutoSlug(!autoSlug)}
                className="text-[11px] text-[#16a34a] font-semibold hover:underline"
              >
                {autoSlug ? 'Manuel' : 'Automatique'}
              </button>
            </div>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setAutoSlug(false);
                setSlug(e.target.value);
              }}
              placeholder="ex: cyber-odyssey"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-mono text-sm focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Description du jeu <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez les règles, le gameplay et l'intérêt du jeu..."
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] text-sm leading-relaxed transition"
          />
        </div>

        {/* Category, Difficulty, Players */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Catégorie <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GameCategory)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Difficulté <span className="text-rose-500">*</span>
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as GameDifficulty)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nombre de joueurs <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
              placeholder="ex: 1 joueur, 1-2 joueurs"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Média & Jaquette */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <span>2. Image de Couverture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* File Upload Zone */}
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-slate-700">
              Téléverser une image (Stockage Cloud Supabase)
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-[#16a34a] rounded-2xl p-6 text-center cursor-pointer transition bg-slate-50/50 hover:bg-slate-50 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-[#16a34a] mx-auto mb-3 group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-800">
                Glissez une image ici ou <span className="text-[#16a34a] underline">parcourir</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                PNG, JPG, WEBP jusqu'à 5 Mo
              </p>
            </div>

            {/* Direct URL Fallback */}
            <div className="pt-1">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Ou coller une URL d'image web directe
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              />
            </div>
          </div>

          {/* Cover Preview */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Aperçu de la jaquette
            </label>
            {previewUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[16/9] group shadow-xs">
                <img
                  src={previewUrl}
                  alt="Aperçu cover"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-700 hover:bg-rose-600 hover:text-white transition shadow-sm cursor-pointer"
                  title="Supprimer la jaquette"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="aspect-[16/9] rounded-xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-400 p-4">
                <ImageIcon className="w-8 h-8 mb-2 stroke-1" />
                <span className="text-xs font-medium">Aucune image sélectionnée</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: URL et Intégration */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <span>3. Lien du site de jeu</span>
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            URL du jeu (site web externe ou chemin)
          </label>
          <div className="relative">
            <input
              type="text"
              value={gameUrl}
              onChange={(e) => setGameUrl(e.target.value)}
              placeholder="ex: https://monsite-de-jeu.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] font-mono"
            />
            <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            L'URL du site web de votre jeu vers lequel le visiteur sera redirigé lorsqu'il cliquera sur la carte.
          </p>
        </div>
      </div>

      {/* SECTION 4: Publication & Options */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <span>4. Publication & Visibilité</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Status */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-700 mb-2">Statut</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStatus('published')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                  status === 'published'
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                En ligne
              </button>
              <button
                type="button"
                onClick={() => setStatus('draft')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                  status === 'draft'
                    ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Brouillon
              </button>
            </div>
          </div>

          {/* Nouveau */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-700 mb-2">Badge "Nouveau"</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsNew(true)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                  isNew
                    ? 'bg-[#16a34a] border-[#16a34a] text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Oui
              </button>
              <button
                type="button"
                onClick={() => setIsNew(false)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                  !isNew
                    ? 'bg-slate-700 border-slate-700 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Non
              </button>
            </div>
          </div>

          {/* Featured */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-700 mb-2">Mis en Vedette</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFeatured(true)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                  featured
                    ? 'bg-[#16a34a] border-[#16a34a] text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Oui
              </button>
              <button
                type="button"
                onClick={() => setFeatured(false)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                  !featured
                    ? 'bg-slate-700 border-slate-700 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
