import React from "react";

const Slide = ({ file }) => {
  console.log(file);
  return (
    <div className="slider__slide">
      <img src={file} alt="" className="slider__slide__img" />
    </div>
  );
};

export default Slide;
