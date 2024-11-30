import React from "react";
import Loader from "../Loader/Loader";

const Button = ({ type = "submit", text, loading, className }) => {
  return (
    <button
      type={text}
      className={`btn btn--primary u-center-text u-center-flex ${
        className ? className : ""
      }`}
    >
      {loading ? <Loader isInline /> : text}
    </button>
  );
};

export default Button;
