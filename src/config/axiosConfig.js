import { AuthService } from '@/service/AuthService';
import axios from 'axios';

const axiosInstance = axios.create();

// Interceptor para añadir el token a las peticiones si el usuario está autenticado
axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token && AuthService.isAuthenticated()) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;