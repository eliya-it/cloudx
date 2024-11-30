import React, { useState } from "react";
import { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
let timer, data;
const Notification = ({ isSuccess = true, isError, text }) => {
  const [remove, setRemove] = useState(false);
  const hideNoti = (e) => {
    setRemove(!remove);
  };
  useEffect(() => {
    clearInterval(timer);
    timer = setTimeout(() => setRemove(true), 1000);
  }, [remove]);
  data = (
    <div
      className={`notifications__notification notifications__notification--${
        isError ? "error" : "success"
      }`}
      onClick={hideNoti}
    >
      <button className="notifications__notification__btn">
        <RiCloseFill className="icon" />
      </button>{" "}
      <span> {text}</span>
    </div>
  );

  return <>{!remove ? data : null}</>;
};

export default Notification;
