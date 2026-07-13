import { createContext, type ReactNode, useContext } from 'react';
import { useSession } from '../auth/client';

type SessionContextType = ReturnType<typeof useSession>;

const AuthContext = createContext<SessionContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSession();

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
