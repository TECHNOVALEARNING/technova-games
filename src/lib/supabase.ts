import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey !== 'your-anon-public-key' &&
  !supabaseUrl.includes('your-project')
);

// If not configured, provide a dummy client fallback to prevent initial crash
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder-domain-technova.supabase.co', 'placeholder-anon-key');

if (!isSupabaseConfigured) {
  console.info(
    '%c[TECHNOVA GAMES] Mode Démo / Fallback Local actif.\nPour connecter votre vraie base Supabase, renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans le fichier .env et exécutez le script supabase/schema.sql.',
    'color: #16a34a; font-weight: bold; background: #f0fdf4; padding: 4px 8px; border-radius: 4px;'
  );
}
