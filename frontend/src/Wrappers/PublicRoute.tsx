import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  isAuth: boolean;
  children: React.ReactNode | React.ReactNode[];
  isAdmin: boolean;
};

function PublicRoute({ isAuth, children, isAdmin }: Props): JSX.Element {
  if (isAuth && isAdmin) {
    return <Navigate to="/admin" />;
  }
  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
}

export default PublicRoute;
