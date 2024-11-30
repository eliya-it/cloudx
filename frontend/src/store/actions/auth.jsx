import { Navigate } from "react-router-dom";
import axios from "../../axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (
  status,
  token,
  isTwoFa,
  accessToken,

  userId,
  name,
  photo,
  curIndex,
  role,
  isAuth
) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    curIndex,
    isTwoFa,
    accessToken,
    status,
    userId,
    name,
    photo,
    role,
    isAuth,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};
export const logoutState = (state) => {
  return {
    type: actionTypes.LOGOUT,
    ...state,
  };
};
export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`/users/login`, { email, password })
      .then((resBody) => {
        const expiresIn = new Date(new Date().getTime() + 2000);

        const {
          userId,
          status,
          token,
          isTwoFa,
          sendTwoFactorRequestToken,
          name,
          photo,
          role,
        } = resBody.data;

        dispatch(
          authSuccess(
            status,
            token,
            isTwoFa,
            null,
            userId,
            name,
            photo,
            1,
            role
          )
        );
      })
      .catch((err) => {
        console.error(err?.response.data);
        dispatch(authFail(err?.response.data.message));
      });
  };
};
export const signup = (name, email, password, confirmPassword) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`/users/signup`, {
        name,
        email,
        password,
        confirmPassword,
      })
      .then((resBody) => {
        const expiresIn = new Date(new Date().getTime() + 2000);
        const {
          userId,
          status,
          token,
          isTwoFa,
          sendTwoFactorRequestToken,
          name,
          photo,
        } = resBody.data;
        dispatch(
          authSuccess(
            status,
            token,
            isTwoFa,
            sendTwoFactorRequestToken,
            userId,
            name,
            photo
          )
        );
      })
      .catch((err) => {
        console.error(err?.response.data);
        dispatch(authFail(err?.response.data.message));
      });
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch(logoutState());
  };
};
export const checkAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authSuccess(token));
    }
  };
};
