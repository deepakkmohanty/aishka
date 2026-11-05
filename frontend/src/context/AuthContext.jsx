import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const handleForceLogout = () => clearAuth();
    window.addEventListener('auth:force-logout', handleForceLogout);
    return () => window.removeEventListener('auth:force-logout', handleForceLogout);
  }, [clearAuth]);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('accessToken');
      if (token || document.cookie.includes('refreshToken')) {
        try {
          const response = await authService.getMe();
          if (response?.success && response?.data?.user) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            clearAuth();
          }
        } catch (err) {
          clearAuth();
        }
      }
      setIsLoading(false);
    };

    restoreSession();
  }, [clearAuth]);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    if (response?.success && response?.data) {
      const { user: loggedInUser, accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      return response;
    }
    throw new Error(response?.message || 'Login failed');
  };

  const register = async (data) => {
    const response = await authService.register(data);
    if (response?.success && response?.data) {
      const { user: newUser, accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setUser(newUser);
      setIsAuthenticated(true);
      return response;
    }
    throw new Error(response?.message || 'Registration failed');
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAuth();
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
