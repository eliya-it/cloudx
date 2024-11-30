import axios from "../axios";
import React, { useCallback, useReducer, useState } from "react";
const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
  status: null,
};
const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...state,
        loading: false,
        data: action.resBody,
        extra: action.extra,
        status: action.status,
      };
    case "ERROR":
      return {
        error: action.error,
        loading: false,
      };
    case "CLEAR":
      return initialState;
    default:
      console.log("[-] Should not get here...");
  }
};
const useHttp = () => {
  // const [data, setData] = useState({});
  const [mainState, dispatchHttp] = useReducer(httpReducer, initialState);
  const [err, setErr] = useState(null);
  const [status, setStatus] = useState(null);

  const sendData = useCallback((url, method, isProtected, data, isFile) => {
    let headers;
    if (isFile) headers = { "Content-Type": "multipart/form-data" };
    if (isProtected)
      headers = {
        ...headers,
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
      };
    dispatchHttp({ type: "SEND" });
    axios({
      method,
      url,
      data,
      headers,
    })
      .then((resBody) => {
        if (resBody.data !== undefined || null) {
          dispatchHttp({
            type: "RESPONSE",
            resBody: resBody.data,
            status: resBody.data.status,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        dispatchHttp({ type: "ERROR", error });
      });

    // setStatus(res.status === 204 ? 204 : res.data.status);
  }, []);

  return {
    data: mainState.data,
    sendRequest: sendData,
    error: mainState.error,
    status: mainState.status,
    isLoading: mainState.loading,
  };
};

export default useHttp;
