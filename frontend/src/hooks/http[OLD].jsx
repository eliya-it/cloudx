import { useCallback, useReducer } from "react";
import axios from "axios";
// The idea behind custom hooks is to share logic NOT data
const initialState = {
  loading: true,
  error: null,
  data: null,
  extra: null,
  identifier: null,
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
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);
  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);
  const sendRequest = useCallback((url, method, isProtected, body, isFile) => {
    console.log(body);
    let extraHeaders = null;
    console.log(JSON.parse(localStorage.getItem("userData")));
    if (isProtected)
      extraHeaders = {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
      };

    dispatchHttp({ type: "SEND" });
    axios({
      method,
      url,
      data: body,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token,

        "Content-Type": "multipart/form-data",
      },
    })
      .then((resBody) => {
        let status;
        if (resBody.data.status === "success") status = "success";
        dispatchHttp({
          type: "RESPONSE",
          resBody: resBody.data,
          status,
        });
      })
      .catch((err) => {
        dispatchHttp({ type: "ERROR", error: err });

        console.log(err);
      });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    status: httpState.status,
    error: httpState.error,
    requestExtra: httpState.requestExtra,
    requestId: httpState.requestId,
    sendRequest,
    clear,
  };
};
export default useHttp;
