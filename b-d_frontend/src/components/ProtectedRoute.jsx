import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function getAccessToken() {
  try {
    return localStorage.getItem('access_token');
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const ProtectedRoute = () => {
  const location = useLocation();
  const accessToken = getAccessToken();

  if (!accessToken) {
    const redirectPath = `${location.pathname}${location.search || ''}`;
    try {
      sessionStorage.setItem('post_login_redirect', redirectPath);
    } catch (error) {
      console.error(error);
    }
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
