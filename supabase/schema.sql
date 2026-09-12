-- ==============================================================================
-- TECHNOVA GAMES - SCHEMA COMPLET DE LA BASE DE DONNÉES ET DU STORAGE SUPABASE
-- ==============================================================================
-- Copiez-collez l'intégralité de ce script dans l'éditeur SQL de votre projet Supabase
-- (Dashboard Supabase > SQL Editor > New query > Run).
-- ==============================================================================

-- 1. Activer l'extension UUID si nécessaire
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Créer la table principale des jeux (public.games)
CREATE TABLE IF NOT EXISTS public.games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Quiz', 'Arcade', 'Réflexion', 'Action', 'Stratégie', 'Autres')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Facile', 'Moyen', 'Difficile', 'Expert')),
    players TEXT NOT NULL DEFAULT '1 joueur',
    game_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    is_new BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Index d'optimisation des performances de recherche
CREATE INDEX IF NOT EXISTS idx_games_slug ON public.games(slug);
CREATE INDEX IF NOT EXISTS idx_games_category ON public.games(category);
CREATE INDEX IF NOT EXISTS idx_games_status ON public.games(status);
CREATE INDEX IF NOT EXISTS idx_games_created_at ON public.games(created_at DESC);

-- 4. Fonction et déclencheur automatique pour la date de mise à jour (updated_at)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_games_updated_at ON public.games;
CREATE TRIGGER tr_games_updated_at
    BEFORE UPDATE ON public.games
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- 5. Activer la sécurité Row Level Security (RLS)
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- 6. Politiques RLS pour les visiteurs publics
-- Les visiteurs (anonymes et connectés) peuvent uniquement consulter les jeux publiés
DROP POLICY IF EXISTS "Public can view published games" ON public.games;
CREATE POLICY "Public can view published games"
    ON public.games
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

-- 7. Politiques RLS pour l'administrateur connecté
-- L'admin connecté a un contrôle total (lecture de tous les jeux y compris brouillons, création, modification, suppression)
DROP POLICY IF EXISTS "Admins have full select access" ON public.games;
CREATE POLICY "Admins have full select access"
    ON public.games
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Admins can insert games" ON public.games;
CREATE POLICY "Admins can insert games"
    ON public.games
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update games" ON public.games;
CREATE POLICY "Admins can update games"
    ON public.games
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can delete games" ON public.games;
CREATE POLICY "Admins can delete games"
    ON public.games
    FOR DELETE
    TO authenticated
    USING (true);

-- 8. Configuration du Bucket de stockage Supabase Storage pour les jaquettes (game-covers)
INSERT INTO storage.buckets (id, name, public)
VALUES ('game-covers', 'game-covers', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Politiques RLS du Storage pour le bucket 'game-covers'
DROP POLICY IF EXISTS "Public can view game covers" ON storage.objects;
CREATE POLICY "Public can view game covers"
    ON storage.objects
    FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'game-covers');

DROP POLICY IF EXISTS "Admins can upload game covers" ON storage.objects;
CREATE POLICY "Admins can upload game covers"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'game-covers');

DROP POLICY IF EXISTS "Admins can update game covers" ON storage.objects;
CREATE POLICY "Admins can update game covers"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'game-covers')
    WITH CHECK (bucket_id = 'game-covers');

DROP POLICY IF EXISTS "Admins can delete game covers" ON storage.objects;
CREATE POLICY "Admins can delete game covers"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'game-covers');

-- 9. Jeux initiaux Technova (Seed Data)
INSERT INTO public.games (title, slug, description, image_url, category, difficulty, players, game_url, featured, is_new, status)
VALUES
(
    'Cyber Odyssey',
    'cyber-odyssey',
    'Explorez une métropole cyberpunk dystopique dans ce jeu d''action-aventure immersif jouable directement dans votre navigateur.',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    'Action',
    'Moyen',
    '1 joueur',
    'https://cyberodyssey.technovagames.com',
    true,
    true,
    'published'
),
(
    'Neon Runner',
    'neon-runner',
    'Foncez à toute vitesse sur des autoroutes luminescentes au rythme d''une bande-son synthwave énergique. Esquivez les obstacles et battez vos records.',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    'Arcade',
    'Difficile',
    '1 joueur',
    'https://neonrunner.technovagames.com',
    true,
    true,
    'published'
),
(
    'Shadow Protocol',
    'shadow-protocol',
    'Infiltrez des installations sécurisées et neutralisez les défenses ennemies dans ce jeu tactique d''espionnage au tour par tour.',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    'Stratégie',
    'Expert',
    '1 joueur',
    'https://shadowprotocol.technovagames.com',
    true,
    false,
    'published'
),
(
    'Vortex Strike',
    'vortex-strike',
    'Prenez les commandes d''un vaisseau de combat interstellaire et affrontez des vagues d''envahisseurs dans un shoot''em up spatial explosif.',
    'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
    'Action',
    'Moyen',
    '1-2 joueurs',
    'https://vortexstrike.technovagames.com',
    true,
    false,
    'published'
)
ON CONFLICT (slug) DO NOTHING;
