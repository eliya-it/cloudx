import React from "react";

const Loader = ({ isInline, isFull }) => {
  return (
    <>
      <span className={`loader ${isInline ? "loader--inline" : null} `}></span>
      {isFull ? (
        <div className="loader--full">
          <span className={"loader"}></span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Loader;
