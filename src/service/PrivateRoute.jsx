import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from './AuthService';

const PrivateRoute = ({ children }) => {
  return AuthService.isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;