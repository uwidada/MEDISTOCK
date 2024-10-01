import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem('user'); // Adjust according to how you manage session state

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
