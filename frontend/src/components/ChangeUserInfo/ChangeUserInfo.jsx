import React, { useCallback, useEffect } from "react";
import useHttp from "../../hooks/http";
import Input from "../UI/Input/Input";
import Message from "../Message/Message";
import Button from "../UI/Button/Button";
import InputBox from "../UI/Form/Input/InputBox/InputBox";
import { RiMailSettingsFill, RiUserFill } from "react-icons/ri";

const ChangeUserInfo = (props) => {
  // const { sendRequest, data, error, status } = useHttp();
  const {
    sendRequest: updateUserData,
    data: updatedData,
    error: updateDataError,
    isLoading: updateUserDataLoader,
    status,
  } = useHttp();
  const {
    sendRequest: getUserData,
    data: userData,
    error: userDataErr,
    // isLoading: getDataLoader,
  } = useHttp();
  const handleInformationUpdate = (e) => {
    // try {
    e.preventDefault();
    const name = document.getElementById("updateName").value;
    const email = document.getElementById("updateEmail").value;
    const photo = document.getElementById("updatePhoto").files[0];

    updateUserData(
      "http://127.0.0.1/api/users/updateMe",
      "PATCH",
      true,
      {
        name,
        email,
        photo,
      },
      true
    );
  };
  const getUserInfo = useEffect(() => {
    getUserData("http://127.0.0.1/api/users/me", "GET", true);
  }, [updatedData]);
  console.log(userData);
  return (
    <React.Fragment>
      {" "}
      {status === "success" ? (
        <Message text="Data updated successfully!" />
      ) : null}
      {updateDataError ? (
        <Message text={updateDataError.response.data.message} err={true} />
      ) : null}
      <div className="change">
        <h3 className="heading--tertiary u-margin-bottom-medium">
          تغيير المعلومات
        </h3>
        <form className="form" onSubmit={handleInformationUpdate}>
          <Input
            type="text"
            placeholder="Search for book number"
            id="updateName"
            min="5"
            validationMsg="Your name must be 5 characters or more!"
            value={userData?.data.doc.name}
          />
          <Input
            label="عنوان البريد الألكتروني"
            id="updateEmail" //   value={data?.data.doc.email}
            value={userData?.data?.doc.email}
            type="email"
            min={12}
            max={32}
            validationMsg={"Your email must be at least 16 characters or more"}
          />
          <div className="user-photo">
            <img
              src={`http://127.0.0.1/img/users/${userData?.data.doc.photo}`}
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
