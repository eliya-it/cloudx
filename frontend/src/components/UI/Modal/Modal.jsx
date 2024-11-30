import React, { useState } from "react";

const Modal = (props) => {
  const { type } = props;
  const hideModalAnimation = {
    style: {},
  };
  const [toggleModal, setToggleModal] = useState(true);
  const toggleHandler = () => {
    setToggleModal(false);
  };
  return (
    <React.Fragment>
      {toggleModal ? (
        <div
          className="modal"
          // onClick={toggleHandler}
          style={hideModalAnimation.style}
        >
          <button className="modal__close" onClick={toggleHandler}>
            <span className="modal__close__icon">&nbsp;</span>
          </button>
          <div className="modal__content">
            {props.heading ? (
              <h3 className="modal__heading"> {props.heading}</h3>
            ) : null}
            <p
              className={`modal__text ${
                type === "error" ? "modal__text--error" : ""
              }`}
            >
              {props.text}
            </p>{" "}
            <div className="modal__actions">
              <button
                className={`modal__btn modal__btn--${
                  type === "succes" ? "success" : "fail"
                }`}
                onClick={toggleHandler}
              >
                No
              </button>{" "}
              <button
                className={`modal__btn modal__btn--success
                }`}
                onClick={() => {
                  toggleHandler(), props.cb();
                }}
              >
                Yes
              </button>
              {/* <button className="modal__btn modal__btn--no">Agree</button> */}
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Modal;
