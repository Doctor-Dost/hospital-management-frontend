import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../redux/store';


interface PrivateRouteProps {
  role?: 'Admin' | 'Doctor';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ role }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    const redirectPath = user.role === 'Admin' ? '/admin' : '/doctor';
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;