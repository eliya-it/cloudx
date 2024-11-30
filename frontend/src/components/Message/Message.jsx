import React from "react";
import { Navigate } from "react-router-dom";

const Error = ({ err, text, redirectTo }) => {
  let timer;
  return (
    <div
      className={`message ${
        err ? "message--fail" : "message--success"
      } u-center-text`}
    >
      <p>{text || error?.response.data.message}</p>
      {redirectTo && clearTimeout(timer)
        ? (timer = setTimeout(() => {
            <Navigate to={String(redirectTo)} />;
          }, 1500))
        : ""}
    </div>
  );
};

export default Error;
