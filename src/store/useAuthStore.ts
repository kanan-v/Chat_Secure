import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { generateKeyPair } from '../lib/encryption';

interface AuthState {
  user: any;
  session: any;
  keys: {
    publicKey: string;
    privateKey: string;
  } | null;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  keys: null,

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const keys = generateKeyPair();
      set({ session, user: session.user, keys });
    }
  },

  signIn: async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const { data: { session, user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new Error('Invalid email or password. Please try again or sign up if you don\'t have an account.');
      }
      throw new Error(error.message);
    }

    if (!session || !user) {
      throw new Error('Failed to sign in. Please try again.');
    }

    const keys = generateKeyPair();
    set({ session, user, keys });
  },

  signUp: async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const { data: { session, user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          email: email // Store email in user metadata
        }
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!session || !user) {
      throw new Error('Failed to create account. Please try again.');
    }

    // Generate keys and set the session immediately
    const keys = generateKeyPair();
    set({ session, user, keys });
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error('Failed to sign out. Please try again.');
    }
    set({ session: null, user: null, keys: null });
  },
}));