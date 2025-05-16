import React from 'react';
import {Navigate} from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProps> = ({children}) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to="/auth/login" />;
  }
  return <>{children}</>;
};
