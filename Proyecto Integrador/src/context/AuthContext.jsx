import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/authApi.js';
import usuarioRepository from '../repositories/usuarioRepository.js';
import seedData from '../database/seed.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Seed data on first load
    seedData();

    // Check for existing session
    const checkAuth = async () => {
      try {
        const response = await authApi.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        // Check localStorage as fallback
        const localUser = localStorage.getItem('conciliaYa_user');
        if (localUser) {
          setUser(JSON.parse(localUser));
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Check dark mode
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      // Fallback to localStorage login
      const usuarios = await usuarioRepository.getAll();
      const user = usuarios.find(u => u.correo === credentials.email && u.password === credentials.password);
      if (user) {
        setUser(user);
        localStorage.setItem('conciliaYa_user', JSON.stringify(user));
        return { user };
      }
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Try backend first
      const response = await authApi.register(userData);
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const usuarios = await usuarioRepository.getAll();
      const maxId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) : 0;
      
      const newUser = {
        id: maxId + 1,
        nombre: userData.nombre,
        apellido: userData.apellido,
        correo: userData.email,
        telefono: userData.telefono,
        password: userData.password,
        perfilId: 3, // Usuario básico por defecto
        activo: true,
        fechaAlta: new Date().toISOString(),
        usuarioAltaId: 1,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${maxId + 1}`,
        banner: null,
        biografia: 'Nuevo usuario registrado.',
        redesSociales: {},
        estadoOnline: true,
        actividad: new Date().toISOString()
      };

      await usuarioRepository.create(newUser);
      setUser(newUser);
      localStorage.setItem('conciliaYa_user', JSON.stringify(newUser));
      return { user: newUser };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
    } catch (error) {
      // Force logout anyway
      setUser(null);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    darkMode,
    toggleDarkMode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
