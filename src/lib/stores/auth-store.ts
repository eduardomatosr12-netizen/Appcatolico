'use client';

import { create } from 'zustand';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { getAuthInstance } from '@/lib/firebase';

const PROFILES_KEY = 'forja-auth-profiles';

interface ProfileMeta {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
}

function loadProfiles(): ProfileMeta[] {
  try {
    return JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveProfiles(profiles: ProfileMeta[]) {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch {
    // localStorage full or unavailable
  }
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isGuest: boolean;
  recentProfiles: ProfileMeta[];
  authError: string | null;

  initialize: () => (() => void);
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  switchProfile: (email: string, password: string) => Promise<void>;
  removeProfile: (uid: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isGuest: false,
  recentProfiles: [],
  authError: null,

  initialize: () => {
    const profiles = loadProfiles();
    set({ recentProfiles: profiles });

    const auth = getAuthInstance();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const profileMeta: ProfileMeta = {
          uid: user.uid,
          displayName: user.displayName || user.email?.split('@')[0] || 'Usuário',
          email: user.email || '',
          photoURL: user.photoURL,
        };

        set((state) => {
          const exists = state.recentProfiles.some((p) => p.uid === user.uid);
          const updated = exists
            ? state.recentProfiles.map((p) => (p.uid === user.uid ? profileMeta : p))
            : [profileMeta, ...state.recentProfiles];
          saveProfiles(updated);
          return { user, isLoading: false, isGuest: false, recentProfiles: updated };
        });
      } else {
        set((state) => ({
          user: null,
          isLoading: false,
          isGuest: state.isGuest,
        }));
      }
    });

    return unsubscribe;
  },

  signIn: async (email, password) => {
    set({ authError: null });
    try {
      await signInWithEmailAndPassword(getAuthInstance(), email, password);
    } catch (error) {
      const code = error instanceof FirebaseError ? error.code : 'unknown';
      const message = error instanceof Error ? error.message : 'Erro ao entrar';

      console.error('Firebase signIn error:', code, message);

      if (code === 'auth/configuration-not-found') {
        console.error(
          '[Forja] O método de login Email/Senha NÃO está ativado no Firebase Console.\n' +
          'Acesse: https://console.firebase.google.com → Build → Authentication → Sign-in method → Ative "Email/Password".'
        );
        set({ authError: 'Serviço de autenticação indisponível. Ative o login por email/senha no painel do Firebase.' });
        return;
      }

      set({ authError: translateAuthError(message) });
      throw error;
    }
  },

  signUp: async (email, password, displayName) => {
    set({ authError: null });
    try {
      const cred = await createUserWithEmailAndPassword(getAuthInstance(), email, password);
      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
    } catch (error) {
      const code = error instanceof FirebaseError ? error.code : 'unknown';
      const message = error instanceof Error ? error.message : 'Erro ao criar conta';

      console.error('Firebase signUp error:', code, message);

      if (code === 'auth/configuration-not-found') {
        console.error(
          '[Forja] O método de login Email/Senha NÃO está ativado no Firebase Console.\n' +
          'Acesse: https://console.firebase.google.com → Build → Authentication → Sign-in method → Ative "Email/Password".'
        );
        set({ authError: 'Serviço de autenticação indisponível. Ative o login por email/senha no painel do Firebase.' });
        return;
      }

      set({ authError: translateAuthError(message) });
      throw error;
    }
  },

  signOut: async () => {
    await firebaseSignOut(getAuthInstance());
    set({ user: null, isGuest: false });
  },

  continueAsGuest: () => {
    set({ isGuest: true, isLoading: false });
  },

  switchProfile: async (email, password) => {
    set({ authError: null });
    try {
      await signInWithEmailAndPassword(getAuthInstance(), email, password);
    } catch (error) {
      const code = error instanceof FirebaseError ? error.code : 'unknown';
      const message = error instanceof Error ? error.message : 'Erro ao trocar perfil';

      console.error('Firebase switchProfile error:', code, message);

      if (code === 'auth/configuration-not-found') {
        console.error(
          '[Forja] O método de login Email/Senha NÃO está ativado no Firebase Console.\n' +
          'Acesse: https://console.firebase.google.com → Build → Authentication → Sign-in method → Ative "Email/Password".'
        );
        set({ authError: 'Serviço de autenticação indisponível. Ative o login por email/senha no painel do Firebase.' });
        return;
      }

      set({ authError: translateAuthError(message) });
      throw error;
    }
  },

  removeProfile: (uid) => {
    set((state) => {
      const updated = state.recentProfiles.filter((p) => p.uid !== uid);
      saveProfiles(updated);
      return { recentProfiles: updated };
    });
  },

  clearError: () => set({ authError: null }),
}));

function translateAuthError(message: string): string {
  if (message.includes('auth/invalid-credential') || message.includes('auth/wrong-password') || message.includes('auth/user-not-found')) {
    return 'Email ou senha incorretos';
  }
  if (message.includes('auth/email-already-in-use')) {
    return 'Este email já está em uso';
  }
  if (message.includes('auth/weak-password')) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  if (message.includes('auth/invalid-email')) {
    return 'Email inválido';
  }
  if (message.includes('auth/configuration-not-found')) {
    return 'Serviço de autenticação indisponível. Ative o login por email/senha no painel do Firebase.';
  }
  return 'Ocorreu um erro. Tente novamente.';
}
