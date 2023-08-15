import React from "react";

const Error = (props) => {
  return (
    <div
      className={`message ${
        props.err ? "message--fail" : "message--success"
      } u-center-text`}
    >
      <p>{props.text || props.error?.response.data.message}</p>
    </div>
  );
};

export default Error;
