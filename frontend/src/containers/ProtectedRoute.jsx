import React, { useCallback, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../axios";
import { connect } from "react-redux";
import useAuthContext from "../hooks/useAuthContext";
let timer;
const ProtectedRoute = ({ children, userAuth, loading, isAuth, isActive }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    clearInterval(timer);
    timer = setTimeout(() => {
      if (!user && !loading) navigate("/login");
    }, 200);
    // if (!user && !loading) navigate("/login");
  }, [user]);
  // if (!user && !loading) return <Navigate to={"/login"} />;
  if (user && !loading) return children;
};

export default ProtectedRoute;
