import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';
import { getToken, removeToken } from '../utils/jwtStorage';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  token: null,
  setUser: () => { },
  signOut: async () => { },
  checkAuth: async () => false,
});

// This is our custom hook to use the auth context. Just an easier use
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/v1/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser({
            id: userData.id,
            name: userData.name,
            surname: userData.name,
            username: userData.username,
            password: userData.password,
            email: userData.email,
            profilePhotoRoute: userData.profilePhotoRoute,
          });
          setIsAuthenticated(true);
        } else {
          await signOut();
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading || token) {
      validateToken();
    }
  }, [token, apiUrl]);

  const checkAuth = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const storedToken = await getToken();
      setToken(storedToken); 
      return storedToken != null; 
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signOut = async () => {
    try {
      await removeToken();
      setToken(null); 
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/signin');
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    token,
    setUser,
    signOut,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
