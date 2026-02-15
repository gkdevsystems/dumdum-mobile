import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { clearAuthToken, getAuthToken, setAuthToken } from '@/lib/auth/session';

type AuthContextValue = {
  token: string | null;
  isLoading: boolean;
  signIn: (nextToken: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const hydrateToken = async () => {
      console.log('[ROUTE][Auth] hydrate token: start');
      const storedToken = await getAuthToken();
      console.log('[ROUTE][Auth] hydrate token: complete', { hasToken: Boolean(storedToken) });
      if (mounted) {
        setToken(storedToken);
        setIsLoading(false);
      }
    };

    void hydrateToken();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isLoading,
      signIn: async (nextToken: string) => {
        console.log('[ROUTE][Auth] signIn called', { hasToken: Boolean(nextToken) });
        await setAuthToken(nextToken);
        setToken(nextToken);
      },
      signOut: async () => {
        console.log('[ROUTE][Auth] signOut called');
        await clearAuthToken();
        setToken(null);
      },
    }),
    [isLoading, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
