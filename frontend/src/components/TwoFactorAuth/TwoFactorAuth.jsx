import React, { useEffect } from "react";
import Input from "../UI/Input/Input";

import useHttp from "../../hooks/http";
import { Navigate } from "react-router";
import Message from "../Message/Message";

const TwoFactorAuth = (props) => {
  const { sendRequest: sendOtp, error, data, status } = useHttp();
  console.log(props.accessToken);
  const submitHandler = (e) => {
    e.preventDefault();
    const otp = document.getElementById("otp").value;
    console.log(otp);
    sendOtp("http://127.0.0.1/api/users/verifyTwoFactorAuth", "POST", false, {
      otp,
      accessToken: props.accessToken,
    });
  };
  let authRedirect;

  useEffect(() => {
    if (status === "success") {
      console.log("[+] Setting Items");
      console.log(data);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: data?.userId,
          token: data?.token,
          role: data?.role,
          name: data?.name,
        })
      );
    }
  }, [data]);
  console.log(data?.token, data?.role, data?.userId);
  if (status === "success") return <Navigate to={"/"} />;
  return (
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
      </form>
    </div>
  );
};

export default TwoFactorAuth;
