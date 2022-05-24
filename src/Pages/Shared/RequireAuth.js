import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "./Loading";

const RequireAuth = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) return <Loading></Loading>;

  if (error) console.log(error.message);

  if (!user)
    return <Navigate to="/signup" state={{ from: location }} replace />;
  return children;
};

export default RequireAuth;
