import React from "react";

const Item = ({ children, className }) => {
  return (
    <li className={`u-list__item ${className ? className : ""}`}>{children}</li>
  );
};

export default Item;
