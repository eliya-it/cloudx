import React from "react";
import Slide from "./Slide";
import { useEffect } from "react";
import { useState } from "react";
import { RiArrowLeftFill, RiArrowRightFill } from "react-icons/ri";
import { FULL_PATH } from "../../../config";

const Slider = ({ files, isLoading, type }) => {
  const [curSlide, setCurSlide] = useState(0);
  const [url, setUrl] = useState("");
  console.log(files);
  const gotToSl = (curSl) => {
    const slides = document.querySelectorAll(".slider__slide");

    slides.forEach((slide, i) => {
      console.log(slide);
      slide.style.transform = `translateX(${100 * (i - curSl)}%)`;
      slide.style.opacity = 1;
    });
  };

  useEffect(() => {
    gotToSl(curSlide);

    if (curSlide + 1 > files?.length) setCurSlide(0);
  }, [curSlide, isLoading]);
  useEffect(() => {}, []);
  gotToSl(0);
  return (
    <>
      {" "}
      <div className="arrows">
        <button
          className="arrows__arrow"
          onClick={() => setCurSlide(curSlide + 1)}
        >
          <RiArrowRightFill className="arrows__arrow__icon" />
        </button>{" "}
        {/* {curSlide - 1 < 0 ? null : (
          <button
            className="arrows__arrow"
            onClick={() => setCurSlide(curSlide - 1)}
          >
            <RiArrowLeftFill className="arrows__arrow__icon" />
          </button>
        )} */}
      </div>
      <div className="slider">
        {files?.map((fl) => (
          <Slide file={`${FULL_PATH}/documents/${fl}`} key={fl} />
        ))}
      </div>
    </>
  );
};

export default Slider;
