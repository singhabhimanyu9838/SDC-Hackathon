// src/contexts/AuthContext.tsx - UPDATED FOR MONGODB/API
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiRequest } from '../lib/api'; // <--- NEW API IMPORT
import { Admin } from '../types';

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async (token: string) => {
    if (!token) {
        setAdmin(null);
        return;
    }
    try {
      // Endpoint: GET /api/auth/profile
      const data = await apiRequest<Admin>('/auth/profile', 'GET');
      setAdmin(data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      localStorage.removeItem('authToken'); // Clear invalid token
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetchAdminData(token as string);
    return () => {};
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Endpoint: POST /api/auth/login
      const { token, admin: adminData } = await apiRequest<{ token: string, admin: Admin }>('/auth/login', 'POST', { email, password });
      
      localStorage.setItem('authToken', token);
      setAdmin(adminData);

    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('authToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}