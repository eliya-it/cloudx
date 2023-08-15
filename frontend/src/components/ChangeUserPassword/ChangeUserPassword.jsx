import React, { useEffect } from "react";
import useHttp from "../../hooks/http";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Message from "../Message/Message";

const ChangeUserPassword = () => {
  const { sendRequest, data, status, isLoading, error } = useHttp();
  const updatePasswordHandler = (e) => {
    e.preventDefault();
    const curPassword = document.getElementById("curPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    console.log(curPassword);
    const newPasswordConfirm =
      document.getElementById("newPasswordConfirm").value;
    sendRequest("http://127.0.0.1/api/users/updatePassword", "PATCH", true, {
      curPassword,
      newPassword,
      newPasswordConfirm,
    });
    console.log(data);
    // sendPasswords("http://127.0.0.1/api/users/updatePassword", "PATCH", true, {
    //   curPassword: 12343534,
    //   // newPassword,
    //   // newPasswordConfirm,
    // });
  };
  useEffect(() => {
    console.log(
      Date.now() > JSON.parse(localStorage.getItem("userData")).expiresIn
    );
    if (status) {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: data.name,
          token: data.token,
          photo: data.photo,
          role: data.role,
        })
      );
    }
  }, [data]);
  return (
    <div className="change">
      {error ? (
        <Message text={String(error?.response.data.message)} err={true} />
      ) : null}
      {status ? <Message text="تم تحديث كلمة السر بنجاح!" /> : null}
      <form className="form" action="#" onSubmit={updatePasswordHandler}>
        <Input
          type="password"
          id="curPassword"
          placeholder="********"
          min={8}
          validationMsg={"Your password must be at least 8 charcters or more!"}
        />
        <Input
          type="password"
          id="newPassword"
          placeholder="********"
          min={8}
          validationMsg={"Your password must be at least 8 charcters or more!"}
        />
        <Input
          type="password"
          id="newPasswordConfirm"
          placeholder="********"
          validationMsg={"Your password must be at least 8 charcters or more!"}
        />
        <Button loading={isLoading} text="Update password" />
        {/* <button type="submit" className="btn btn--primary">
          تحديث
        </button> */}
      </form>
    </div>
  );
};

export default ChangeUserPassword;
