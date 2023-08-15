import React, { useState } from "react";

const Slider = (props) => {
  const [curIndex, setCurIndex] = useState(0);

  const sliderStyles = {
    width: "100%",
    height: "100%",
    // position: "realtive",
  };
  const slideStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    // background: `url(${props.slides[curIndex].url})`,
  };
  return (
    <div className="slider" style={sliderStyles}>
      <img src={`${props.slides[curIndex].url}`} alt="" style={slideStyles} />
      {/* <div className="slider__box" ></div> */}
    </div>
  );
};

export default Slider;
