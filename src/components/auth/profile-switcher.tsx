'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';

export function ProfileSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, recentProfiles, signOut, switchProfile, authError, clearError } = useAuthStore();
  const [switchingProfile, setSwitchingProfile] = useState<string | null>(null);
  const [switchPassword, setSwitchPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSwitchingProfile(null);
        setSwitchPassword('');
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  if (!user) return null;

  const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();

  async function handleSwitch(e: React.FormEvent) {
    e.preventDefault();
    if (!switchingProfile) return;
    setLoading(true);
    clearError();
    try {
      await switchProfile(switchingProfile, switchPassword);
      setOpen(false);
      setSwitchingProfile(null);
      setSwitchPassword('');
    } catch {
      // Error handled by store
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] hover:bg-[#C5A059]/20 transition-all text-sm font-bold"
        aria-label="Perfil"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-[9999] w-64 rounded-2xl bg-[#16161A] border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.8)] p-3 space-y-2">
          <div className="px-2 py-1.5 border-b border-white/5 mb-1">
            <p className="text-sm font-medium text-gray-200 truncate">
              {user.displayName || 'Usuário'}
            </p>
            <p className="text-xs text-[#6A6A6E] truncate">{user.email}</p>
          </div>

          {!switchingProfile && recentProfiles.length > 1 && (
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-wider text-[#6A6A6E] px-2">
                Trocar perfil
              </p>
              {recentProfiles
                .filter((p) => p.uid !== user.uid)
                .map((profile) => (
                  <button
                    key={profile.uid}
                    onClick={() => {
                      setSwitchingProfile(profile.email);
                      setSwitchPassword('');
                      clearError();
                    }}
                    className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-[#8A8A8E]">
                        {profile.displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs text-gray-300 truncate">{profile.displayName}</p>
                      <p className="text-[10px] text-[#6A6A6E] truncate">{profile.email}</p>
                    </div>
                  </button>
                ))}
            </div>
          )}

          {switchingProfile && (
            <form onSubmit={handleSwitch} className="space-y-2">
              <p className="text-[10px] text-[#8A8A8E] truncate">
                Entrar como <span className="text-white">{switchingProfile}</span>
              </p>
              <input
                type="password"
                value={switchPassword}
                onChange={(e) => setSwitchPassword(e.target.value)}
                placeholder="Senha"
                required
                autoComplete="current-password"
                className="w-full rounded-xl bg-[#0B0B0E] border border-white/10 px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C5A059]/40"
              />
              {authError && (
                <p className="text-[10px] text-red-400">{authError}</p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setSwitchingProfile(null); setSwitchPassword(''); clearError(); }}
                  className="flex-1 rounded-xl bg-white/5 px-3 py-1.5 text-[10px] text-[#8A8A8E] hover:bg-white/10 transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-[#C5A059] px-3 py-1.5 text-[10px] font-bold text-[#0B0B0E] hover:bg-[#D4B87A] transition-colors disabled:opacity-50"
                >
                  {loading ? '...' : 'Entrar'}
                </button>
              </div>
            </form>
          )}

          <div className="border-t border-white/5 pt-1">
            <button
              onClick={async () => {
                await signOut();
                setOpen(false);
                setSwitchingProfile(null);
              }}
              className="w-full text-left px-2 py-2 rounded-xl text-xs text-[#8A8A8E] hover:text-red-400 hover:bg-red-400/5 transition-colors"
            >
              Sair da conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
