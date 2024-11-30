import React, { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/http";
import Input from "../UI/Input/Input";
import Message from "../Message/Message";
import Button from "../UI/Button/Button";
import InputBox from "../UI/Form/Input/InputBox/InputBox";
import { RiMailSettingsFill, RiUserFill } from "react-icons/ri";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios";
import useUpdate from "../../hooks/useUpdate";
import ErrorHandler from "../UI/ErrorHandler/ErrorHandler";
import { FULL_PATH } from "../../config";
const ChangeUserInfo = () => {
  const [curUser, setCurUser] = useState({});
  const [error, setError] = useState(null);
  const { update, data } = useUpdate();
  const [userData, setUserData] = useState(null);
  // const { sendRequest, data, error, status } = useHttp();
  const {
    sendRequest: updateUserData,
    data: updatedData,
    error: updateDataError,
    isLoading: updateUserDataLoader,
    status: updateStatus,
  } = useHttp();

  const handleInformationUpdate = (e) => {
    // try {
    e.preventDefault();
    const name = document.getElementById("updateName").value;
    const email = document.getElementById("updateEmail").value;
    const photo = document.getElementById("updatePhoto").files[0];
    update(name, email, photo);
  };
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user"))?.token);
    axios
      .get("/users/me", {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      })
      .then((res) => {
        if (res.data.data.doc !== null) setUserData(res.data.data.doc);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  }, [data]);
  useEffect(() => {
    // if (
    //   localStorage.getItem("user") &&
    //   JSON.parse(localStorage.getItem("user")).photo !==
    //     userData?.data.doc.photo
    // ) {
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       name: userData?.data.doc.name,
    //       photo: userData?.data.doc.photo,
    //     })
    //   );
    //   // update(userData?.data.doc.name, userData?.data.doc.photo);
    // }
  }, [userData]);
  if (updateStatus === "success") {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: updatedData?.data.user.name,
        photo: updatedData?.data.user.photo,
      })
    );
  }
  return (
    <React.Fragment>
      <ErrorHandler err={error} />
      {status === "success" ? (
        <Message text="Data updated successfully!" />
      ) : null}
      {/* {updateDataError ? (
        <Message text={updateDataError.response.data.message} err={true} />
      ) : null} */}
      <div className="change">
        <h3 className="heading--tertiary u-margin-bottom-medium">
          تغيير المعلومات
        </h3>
        <form className="form" onSubmit={handleInformationUpdate}>
          <Input
            type="text"
            placeholder="أسم الحساب"
            id="updateName"
            validationMsg="Your name must be 5 characters or more!"
            value={userData?.name}
            max={200}
          />
          <Input
            label="عنوان البريد الألكتروني"
            placeholder="user@cloudex.com"
            id="updateEmail" //   value={data.email}
            value={userData?.email}
            type="email"
            min={12}
            max={32}
            validationMsg={"Your email must be at least 16 characters or more"}
          />
          <div className="user-photo">
            <img
              src={`${FULL_PATH}/img/users/${userData?.photo}`}
              alt="User Photo"
              className="user-photo__photo"
            />
            <label htmlFor="updatePhoto" className="user-photo__label">
              تغيير الصورة
            </label>

            <input
              type="file"
              name="change-photo"
              id="updatePhoto"
              className="user-photo__input"
            />
          </div>{" "}
          {/* <Button loading={updateUserDataLoader} text="تسجيل الدخول" /> */}
          <Button type="submit" text="تحديث" loading={updateUserDataLoader} />
          {/* <button type="submit" className="btn btn--primary">
          تحديث
        </button> */}
        </form>
      </div>
    </React.Fragment>
  );
};

export default ChangeUserInfo;
