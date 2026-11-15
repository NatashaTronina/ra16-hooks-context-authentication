import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { API_URL, HttpError } from '../api';
import type { Profile, Session } from '../models/auth';

const STORAGE_KEY = 'auth-session';

function readSession(): Session | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? (JSON.parse(saved) as Session) : null;
}

async function readError(response: Response): Promise<string> {
  try {
    const { message } = (await response.json()) as { message?: string };
    return message ?? `Ошибка сервера: ${response.status}`;
  } catch {
    return `Ошибка сервера: ${response.status}`;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState(readSession);
  const token = session?.token ?? null;

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const authFetch = useCallback(
    async <T,>(path: string): Promise<T> => {
      const response = await fetch(`${API_URL}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        logout();
      }
      if (!response.ok) {
        throw new HttpError(response.status, await readError(response));
      }
      return (await response.json()) as T;
    },
    [token, logout],
  );

  const login = useCallback(async (loginValue: string, password: string) => {
    const authResponse = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify({ login: loginValue, password }),
    });
    if (!authResponse.ok) {
      throw new HttpError(authResponse.status, await readError(authResponse));
    }
    const { token: newToken } = (await authResponse.json()) as { token: string };

    const profileResponse = await fetch(`${API_URL}/private/me`, {
      headers: { Authorization: `Bearer ${newToken}` },
    });
    if (!profileResponse.ok) {
      throw new HttpError(profileResponse.status, await readError(profileResponse));
    }
    const profile = (await profileResponse.json()) as Profile;

    const nextSession = { token: newToken, profile };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  }, []);

  const value = useMemo(
    () => ({ token, profile: session?.profile ?? null, login, logout, authFetch }),
    [token, session, login, logout, authFetch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
