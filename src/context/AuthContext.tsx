import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isSupabaseConnected: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isDemoAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_AUTH_KEY = 'technova_demo_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (isSupabaseConfigured) {
      // 1. Check existing session in Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // 2. Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Fallback demo mode: check local storage
      const savedDemoAuth = localStorage.getItem(DEMO_AUTH_KEY);
      if (savedDemoAuth === 'active') {
        setIsDemoAdmin(true);
        // Create mock user structure
        setUser({
          id: 'demo-admin-id',
          app_metadata: {},
          user_metadata: { name: 'Admin Technova' },
          aud: 'authenticated',
          email: 'admin@technova.games',
          created_at: new Date().toISOString()
        } as unknown as User);
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }

        setSession(data.session);
        setUser(data.user);
        setLoading(false);
        return { success: true };
      } catch (err: unknown) {
        setLoading(false);
        const message = err instanceof Error ? err.message : 'Erreur de connexion inattendue.';
        return { success: false, error: message };
      }
    }

    // Demo Mode login fallback
    // Accept valid demo password or email
    if (email && password.length >= 6) {
      localStorage.setItem(DEMO_AUTH_KEY, 'active');
      setIsDemoAdmin(true);
      setUser({
        id: 'demo-admin-id',
        app_metadata: {},
        user_metadata: { name: 'Admin Technova (Démo)' },
        aud: 'authenticated',
        email: email || 'admin@technova.games',
        created_at: new Date().toISOString()
      } as unknown as User);
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { 
        success: false, 
        error: 'Identifiants invalides. En mode démo, utilisez un email et un mot de passe d\'au moins 6 caractères.' 
      };
    }
  };

  const logout = async (): Promise<void> => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(DEMO_AUTH_KEY);
    setIsDemoAdmin(false);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isSupabaseConnected: isSupabaseConfigured,
        login,
        logout,
        isDemoAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
