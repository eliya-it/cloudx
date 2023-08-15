import React, { useState, useCallback, useEffect } from "react";
import * as actions from "../store/actions/index";
import Input from "../components/UI/Input/input";
import { connect } from "react-redux";
import Loader from "../components/UI/Loader/Loader";
import TwoFactorAuth from "../components/TwoFactorAuth/TwoFactorAuth";
import Message from "../components/Message/Message";
import useHttp from "../hooks/http";
import Button from "../components/UI/Button/Button";
import InputBox from "../components/UI/Form/Input/InputBox/InputBox";
import { RiUserFill } from "react-icons/ri";
import { Navigate } from "react-router";

const Login = (props) => {
  const [curIndex, setCurIndex] = useState(props.curIndex || 0);
  const { sendRequest: sendLoginCreds, error, isLoading } = useHttp();

  const goToSlide = function (slide) {
    const slides = document.querySelectorAll(".slide");
    console.log(slides);
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const login = useCallback(async (e) => {
    e.preventDefault();
    console.log(e.target.children);
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    props.onAuth(email, password);
  }, []);
  useEffect(() => {
    if (props.isTwoFa) setCurIndex(1);
  }, [props.loading]);
  useEffect(() => {
    goToSlide(curIndex);
  }, [curIndex]);

  if (props.status === "success") return <Navigate to="/" />;
  return (
    <section className="slider ">
      {props.error ? <Message text={props.error} err /> : null}
      <div className="slide">
        <div className="login">
          {/* {props.error ? <Error text={props.error} err /> : null} */}
          <form className="form login__form" onSubmit={login}>
            <Input
              type="email"
              placeholder="user@example.com"
              label="عنوان البريد الألكتروني"
              id="loginEmail"
              min={12}
              max={32}
              validationMsg={
                "Your email must be at least 12 characters or more"
              }
              className="input-box__input"

              // changed={(event) => checkCredsHanlder(event, "email")}
            />
            <Input
              label="Enter your password"
              placeholder="*******"
              type="password"
              id="loginPassword"
              changed={(event) => checkCredsHanlder(event, "password")}
              min={8}
              max={32}
              validationMsg={"Your password must be 8 charcters or more!"}
            />
            <Button loading={props.loading} text="تسجيل الدخول" />
          </form>
        </div>
      </div>
      <div className="slide">
        {" "}
        <div className="2fa">
          <TwoFactorAuth accessToken={props.accessToken} />
          <button onClick={() => setCurIndex(0)}>Back</button>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    isTwoFa: state.auth.isTwoFa,
    curIndex: state.auth.curIndex,
    accessToken: state.auth.accessToken,
    status: state.auth.status,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
