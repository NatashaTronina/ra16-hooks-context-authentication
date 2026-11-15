import { createContext, useContext } from 'react';
import type { Profile } from '../models/auth';

export interface AuthContextValue {
  token: string | null;
  profile: Profile | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  authFetch: <T>(path: string) => Promise<T>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (value === null) {
    throw new Error('useAuth можно использовать только внутри AuthProvider');
  }
  return value;
}
