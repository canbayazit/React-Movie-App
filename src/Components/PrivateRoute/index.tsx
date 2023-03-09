import React from "react";
import { shallowEqual } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../Hooks/Hook";

const PrivateRoute = ({ children }: any) => {
  const user = useAppSelector((store) => store.auth.user, shallowEqual);
  return user?.uid ? <Navigate to={"/"} /> : children;
};

export default PrivateRoute;
