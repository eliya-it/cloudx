import React, { useState, useCallback, useEffect, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
const Login = (props) => {
  const { login, error, isLoading, twoAuthData } = useLogin();
  const [curIndex, setCurIndex] = useState(props.curIndex || 0);
  const navigate = useNavigate();
  const goToSlide = function (slide) {
    const slides = document.querySelectorAll(".slide");
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    login(email, password);
  }, []);

  useEffect(() => {
    if (twoAuthData.status === "pending") setCurIndex(1);
  }, [props.loading, twoAuthData.status]);
  useEffect(() => {
    goToSlide(curIndex);
  }, [curIndex]);

  // if (props.status === "success") return <Navigate to="/" />;
  return (
    <section className="slider ">
      {props.error ? <Message text={props.error} err /> : null}
      <div className="slide">
        <div className="login">
          {/* {props.error ? <Error text={props.error} err /> : null} */}
          <form className="form login__form" onSubmit={handleLogin}>
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
            <Button loading={isLoading} text="تسجيل الدخول" />
          </form>
        </div>
      </div>
      <div className="slide">
        {" "}
        <div className="2fa">
          <TwoFactorAuth accessToken={twoAuthData.sendTwoFactorRequestToken} />
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
