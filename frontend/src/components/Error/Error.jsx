import React from "react";
const Error = ({ text, heading, redirectTo }) => {
  return (
    <div className="error">
      <h2 className="error__heading">{heading}</h2>
      <p className="error__text">{text}</p>
      {/* Redirect Logic */}
      {redirectTo ? redirectTo : ""}
    </div>
  );
};

export default Error;
