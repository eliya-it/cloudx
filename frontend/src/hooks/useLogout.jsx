import React from "react";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
    });
  };
  return {
    logout,
  };
};

export default useLogout;
