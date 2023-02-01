import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isAuth: boolean;
};

function ProtectedRoute({ isAuth }: Props): JSX.Element {
  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
