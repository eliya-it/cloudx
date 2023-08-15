import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout/Layout";
import useHttp from "../hooks/http";
import TwoFactorAuth from "../components/TwoFactorAuth/TwoFactorAuth";
import { RiCheckFill } from "react-icons/ri";

const ActiveTwoFactorAuth = () => {
  const { sendRequest, data, error, isLoading } = useHttp();
  const [curIndex, setCurIndex] = useState(0);

  const status = error?.response.data.status;
  const goToSlide = function (slide) {
    const slides = document.querySelectorAll(".slide");
    console.log(slides);
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}vw)`)
    );
  };

  useEffect(() => {
    sendRequest(
      "http://127.0.0.1/api/users/registerTwoFactorAuth",
      // "",
      "GET",
      true
    );
  }, []);
  useEffect(() => {
    goToSlide(curIndex);
  }, [curIndex]);
  return (
    <div className="change slider">
      {status === "fail" ? (
        <div className="u-center-text">
          <RiCheckFill className="change__icon" />
          <p className="change__heading">User is already activated 2fa</p>
        </div>
      ) : (
        <React.Fragment>
          <div className="two-factor slide">
            {" "}
            <h3 className="heading--tertiary u-margin-bottom-medium">
              تفعيل المصادقة الثنائية
            </h3>
            <img
              src={data?.qrCodeUrl}
              alt="QR code"
              className="two-factor__img"
            />
            <p className="two-factor__text">
              أمسح الصورة أعلاه بأستعمال تطبيق المصادقة الثنائية الخاص بك, أو
              ادخل هذا الكود يدويا:
            </p>
            <p className="two-factor__code">{data?.hash}</p>
            <button className="btn btn--primary" onClick={() => setCurIndex(1)}>
              Next
            </button>
          </div>
          <div className="slide">
            <TwoFactorAuth />
          </div>
        </React.Fragment>
      )}
      );
    </div>
  );
};

export default ActiveTwoFactorAuth;