import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, isTwoFa, accessToken, curIndex, status) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    curIndex,
    isTwoFa,
    accessToken,
    status,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};
export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1/api/users/login", {
        email,
        password,
      })

      .then((resBody) => {
        console.log(resBody.data);
        if (resBody.data.status === "success") {
          console.log("[+] Login Successed");
          dispatch(
            authSuccess(
              resBody.data.token,
              resBody.data.isTwoFa,
              resBody.data.sendTwoFactorRequestToken,
              1,
              resBody.data.status
            )
          );
          localStorage.setItem(
            "userData",
            JSON.stringify({
              name: resBody.data.name,
              token: resBody.data.token,
              photo: resBody.data.photo,
              role: resBody.data.role,
              // expiresIn: Date.now() + 3 * 1000 * 60 * 60 * 24,
              expiresIn: Date.now() + 20 * 1000,
            })
          );
        }
        dispatch(
          authSuccess(
            resBody.data.token,
            resBody.data.isTwoFa,
            resBody.data.sendTwoFactorRequestToken,
            1,
            resBody.data.status
          )
        );
      })
      .catch((err) => {
        console.error(err);
        dispatch(authFail(err.response.data.message));
      });
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
