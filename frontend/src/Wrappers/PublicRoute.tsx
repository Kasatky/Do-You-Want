import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  isAuth: boolean;
  children: React.ReactNode | React.ReactNode[];
};

function PublicRoute({ isAuth, children }: Props): JSX.Element {
  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

export default PublicRoute;
