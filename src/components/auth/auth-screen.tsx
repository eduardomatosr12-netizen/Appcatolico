'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { SacredCard } from '@/components/ui/sacred-card';

export function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, continueAsGuest, recentProfiles, switchProfile, removeProfile, authError, clearError } = useAuthStore();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    clearError();
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName);
      }
    } catch {
      // Error is handled by the store
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileSwitch(profile: { email: string }) {
    setLoading(true);
    clearError();
    try {
      const profileData = recentProfiles.find((p) => p.email === profile.email);
      if (profileData) {
        await switchProfile(profile.email, '');
      }
    } catch {
      // Error handled by store
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-[#0B0B0E] flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-sm flex flex-col items-center gap-6 py-8">
        <div className="text-center space-y-2">
          <span className="font-serif text-2xl tracking-[0.25em] font-bold text-[#C5A059]">
            LUMEN
          </span>
          <p className="text-xs text-[#8A8A8E]">App Católico</p>
        </div>

        {recentProfiles.length > 0 && (
          <div className="w-full space-y-3">
            <p className="text-[10px] uppercase tracking-wider text-[#6A6A6E] text-center">
              Perfis salvos
            </p>
            <div className="space-y-2">
              {recentProfiles.map((profile) => (
                <div
                  key={profile.uid}
                  className="flex items-center gap-3 rounded-2xl bg-[#16161A] border border-white/[0.05] p-3 hover:border-[#C5A059]/20 transition-colors cursor-pointer group"
                  onClick={() => handleProfileSwitch(profile)}
                >
                  <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#C5A059]">
                      {profile.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">
                      {profile.displayName}
                    </p>
                    <p className="text-xs text-[#6A6A6E] truncate">{profile.email}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProfile(profile.uid);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-[#6A6A6E] hover:text-red-400 transition-all p-1"
                    aria-label="Remover perfil"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] text-[#6A6A6E]">ou</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
          </div>
        )}

        <SacredCard className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center">
              <h2 className="font-serif text-lg font-bold text-white">
                {mode === 'login' ? 'Entrar' : 'Criar conta'}
              </h2>
              <p className="text-xs text-[#8A8A8E] mt-1">
                {mode === 'login'
                  ? 'Entre para sincronizar seus dados'
                  : 'Crie uma conta para começar'}
              </p>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8A8A8E] font-semibold block mb-1.5">
                  Nome
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full rounded-xl bg-[#0B0B0E] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C5A059]/40"
                />
              </div>
            )}

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8A8A8E] font-semibold block mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
                className="w-full rounded-xl bg-[#0B0B0E] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C5A059]/40"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8A8A8E] font-semibold block mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="w-full rounded-xl bg-[#0B0B0E] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C5A059]/40"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 text-center bg-red-400/10 rounded-xl px-3 py-2">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#C5A059] px-4 py-3 text-sm font-bold text-[#0B0B0E] hover:bg-[#D4B87A] active:bg-[#B8943F] transition-colors disabled:opacity-50"
            >
              {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
            </button>

            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); clearError(); }}
              className="w-full text-center text-xs text-[#C5A059] hover:text-[#D4B87A] transition-colors"
            >
              {mode === 'login'
                ? 'Não tem conta? Criar agora'
                : 'Já tem conta? Entrar'}
            </button>
          </form>
        </SacredCard>

        <button
          onClick={continueAsGuest}
          className="text-xs text-[#6A6A6E] hover:text-[#8A8A8E] transition-colors"
        >
          Continuar como visitante
        </button>
      </div>
    </div>
  );
}
