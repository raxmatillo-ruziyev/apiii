// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ AuthContext';

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? Element  : <Navigate to="/login" />;
};

export default PrivateRoute;
