import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setSession: (session: Session | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true, // Start loading to avoid flickering
  error: null,

  setError: (error) => set({ error }),

  setSession: (session) => set({ session, user: session?.user || null, isLoading: false }),

  initializeAuth: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session, user: session?.user || null, isLoading: false });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user || null, isLoading: false });
    });
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      set({ session: data.session, user: data.user, isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        let msg = error.message;
        if (msg.includes('Invalid login credentials')) msg = 'Credenciales incorrectas';
        if (msg.includes('User already registered')) msg = 'El usuario ya está registrado';
        if (msg.includes('Password should be at least')) msg = 'La contraseña es muy corta';
        set({ error: msg, isLoading: false });
      }
      throw error;
    }
  },

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      set({ session: data.session, user: data.user, isLoading: false });
    } catch (error) {
       if (error instanceof Error) {
        let msg = error.message;
        if (msg.includes('Invalid login credentials')) msg = 'Credenciales incorrectas';
        if (msg.includes('User already registered')) msg = 'El usuario ya está registrado';
        if (msg.includes('Password should be at least')) msg = 'La contraseña es muy corta';
        set({ error: msg, isLoading: false });
      }
      throw error;
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ session: null, user: null, isLoading: false });
    } catch (error) {
       if (error instanceof Error) {
        let msg = error.message;
        if (msg.includes('Invalid login credentials')) msg = 'Credenciales incorrectas';
        if (msg.includes('User already registered')) msg = 'El usuario ya está registrado';
        if (msg.includes('Password should be at least')) msg = 'La contraseña es muy corta';
        set({ error: msg, isLoading: false });
      }
      throw error;
    }
  },
}));
