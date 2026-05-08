import axios from 'axios';
import db from '../database/localDatabase.js';

// Simular API con axios interceptors
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // No existe, pero simulamos
  timeout: 5000,
});

// Interceptors para simular respuestas
api.interceptors.request.use(
  (config) => {
    // Simular token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Simular logout
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userSession');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class AuthApi {
  async login(credentials) {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const usuarios = db.getCollection('usuarios');
    const user = usuarios.find(u => u.correo === credentials.email);

    if (!user) {
      throw { response: { status: 401, data: { message: 'Usuario no encontrado' } } };
    }

    // Simular contraseña (en producción sería hash)
    if (credentials.password !== 'password123') {
      throw { response: { status: 401, data: { message: 'Contraseña incorrecta' } } };
    }

    const token = 'fake-jwt-token-' + Date.now();
    const refreshToken = 'fake-refresh-token-' + Date.now();
    const userSession = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      perfilId: user.perfilId,
      avatar: user.avatar
    };

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userSession', JSON.stringify(userSession));

    return {
      data: {
        token,
        refreshToken,
        user: userSession
      }
    };
  }

  async register(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const usuarios = db.getCollection('usuarios');
    const existingUser = usuarios.find(u => u.correo === userData.correo);

    if (existingUser) {
      throw { response: { status: 400, data: { message: 'Usuario ya existe' } } };
    }

    const newUser = {
      ...userData,
      perfilId: 3, // Usuario básico
      activo: true,
      fechaAlta: new Date().toISOString(),
      usuarioAltaId: 1
    };

    const createdUser = db.addToCollection('usuarios', newUser);

    return {
      data: {
        message: 'Usuario registrado exitosamente',
        user: createdUser
      }
    };
  }

  async logout() {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userSession');
    return { data: { message: 'Logout exitoso' } };
  }

  async refreshToken() {
    await new Promise(resolve => setTimeout(resolve, 500));
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw { response: { status: 401, data: { message: 'No refresh token' } } };
    }

    const newToken = 'fake-jwt-token-' + Date.now();
    localStorage.setItem('token', newToken);

    return {
      data: {
        token: newToken
      }
    };
  }

  async getCurrentUser() {
    await new Promise(resolve => setTimeout(resolve, 300));
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
      throw { response: { status: 401, data: { message: 'No autenticado' } } };
    }

    return {
      data: JSON.parse(userSession)
    };
  }
}

export default new AuthApi();