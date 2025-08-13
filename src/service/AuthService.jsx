import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_AUTH = import.meta.env.VITE_API_AUTH

// LOG IN
const loginManager = (manager) => {
  return axios.post(`${API_AUTH}/login`, manager);
}
// FORGOT 
const forgotPassword = (manager) => {
  return axios.post(`${API_AUTH}/forgotPassword`, manager);
}
// LOG OUT
const logoutManager = (token) => {
  return axios.get(`${API_AUTH}/logoutManager`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}

const getToken = () => {
  return sessionStorage.getItem('authToken'); // O sessionStorage.getItem('authToken');
};

const setToken = (token) => {
  sessionStorage.setItem('authToken', token); // O sessionStorage.setItem('authToken', token);
};

const removeToken = () => {
  sessionStorage.removeItem('authToken'); // O sessionStorage.removeItem('authToken');
};

const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convertir a segundos
    if (decodedToken.exp > currentTime) {
      return true; // El token no ha expirado
    } else {
      console.warn('Token ha expirado');
      removeToken(); // Limpiar token expirado
      return false; // El token ha expirado
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    removeToken();
    return false; // Error al decodificar (token inválido)
  }
};

export const AuthService = {
  loginManager, forgotPassword, logoutManager,
  getToken, setToken, removeToken, isAuthenticated
};