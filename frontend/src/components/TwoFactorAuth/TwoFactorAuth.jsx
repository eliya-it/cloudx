import React, { useEffect } from "react";
import Input from "../UI/Input/Input";

import useHttp from "../../hooks/http";
import { Navigate } from "react-router";
import Message from "../Message/Message";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const TwoFactorAuth = ({ accessToken, isNew, cb }) => {
  const { sendRequest: sendOtp, error, data, status } = useHttp();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const otp = document.getElementById("otp").value;
    if (isNew) {
      sendOtp("/users/registerTwoFactorAuth", "POST", isNew, {
        otp,
      });
    } else {
      sendOtp("/users/verifyTwoFactorAuth", "POST", false, {
        otp,
        accessToken,
      });
    }
  };

  useEffect(() => {
    if (status === "success") {
      console.log(data);
      const { token, role, name, photo } = data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          token,
          role,
          name,
          photo,
        })
      );
      navigate("/");
    }
    // localStorage.setItem(
    //   "userData",
    //   JSON.stringify({
    //     userId: data?.userId,
    //     token: data?.token,
    //     role: data?.role,
    //     name: data?.name,
    //   })
    // );
  }, [data]);

  return (
    <>
      <div className="two-factor two-factor--form">
        {error ? (
          <Message type="error" text={error.response?.data.message} />
        ) : null}
        <h3 className="heading--tertiary">
          Please Enter your 6-digest to complete your login!
        </h3>
        <form className="two-factor__form" onSubmit={submitHandler}>
          <Input id="otp" max={6} />
          <button type="submit" className="btn btn--primary">
            Submit
          </button>
        </form>{" "}
      </div>
      <button className="btn btn--primary u-margin-top-small" onClick={cb}>
        <RiArrowLeftCircleFill className="icon" />
      </button>
    </>
  );
};

export default TwoFactorAuth;
