import React, { useState } from "react";
import axios from "../axios";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [twoAuthData, setTwoAuthData] = useState({});
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setIsLoading(true);
    axios
      .post("/users/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status === "pending") {
          console.log(res.data);
          setTwoAuthData(res.data);
          return console.log("pending...");
        }
        if (res.data.status === "success") {
          setIsLoading(false);
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({
            type: "LOGIN",
            user: res.data,
          });
        }
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  return { login, error, isLoading, twoAuthData };
};

export default useLogin;
