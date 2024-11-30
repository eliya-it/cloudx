import React from "react";

const List = ({ children, isCol, className }) => {
  return (
    <ul
      className={`u-list ${isCol ? "u-list--col" : ""} ${
        className ? className : ""
      }`}
    >
      {children}
    </ul>
  );
};

export default List;
