'use client';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const isHydrationWarning = args.some((arg) => {
      try {
        const str = String(arg);
        return (
          str.includes('hydration') ||
          str.includes('Hydration') ||
          str.includes('did not match') ||
          str.includes('bis_skin_checked') ||
          str.includes('fdprocessedid')
        );
      } catch (e) {
        return false;
      }
    });

    if (isHydrationWarning) {
      return;
    }
    originalError.apply(console, args);
  };
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    const storedUsername = localStorage.getItem('admin_username');
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const isCrmPath = pathname.startsWith('/crm');
      const isLoginPath = pathname.startsWith('/login');

      if (isCrmPath && !token) {
        router.push('/login');
      } else if (isLoginPath && token) {
        router.push('/crm');
      }
    }
  }, [token, pathname, isLoading, router]);

  const login = (newToken: string, newUsername: string) => {
    localStorage.setItem('admin_token', newToken);
    localStorage.setItem('admin_username', newUsername);
    setToken(newToken);
    setUsername(newUsername);
    router.push('/crm');
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    setToken(null);
    setUsername(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated: !!token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
