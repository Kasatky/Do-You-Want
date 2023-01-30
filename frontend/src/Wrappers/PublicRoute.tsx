import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isAuth: boolean;
  children: React.ReactNode | React.ReactNode[];
  role: string | undefined;
};

function PublicRoute({ isAuth, children, role }: Props): JSX.Element {
  if (isAuth && role === "admin") {
    return <Navigate to="/admin" />;
  }
  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
}

export default PublicRoute;
