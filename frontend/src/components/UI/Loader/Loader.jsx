import React from "react";

const Loader = (props) => {
  return (
    <span
      className={`loader ${props.isInline ? "loader--inline" : null} `}
    ></span>
  );
};
export default Loader;
