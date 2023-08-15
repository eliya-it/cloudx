import React, { useCallback, useState } from "react";
import Layout from "../containers/Layout/Layout";
import useHttp from "../hooks/http";
import Modal from "../components/UI/Modal/Modal";
import Loader from "../components/UI/Loader/Loader";
import axios from "axios";
import Message from "../components/Message/Message";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
const sections = [
  {
    value: "mang",
    label: "أختيار القسم...",
  },
  {
    value: "mang3",
    label: "تقنيات الادارة الصحية",
  },
  {
    value: "mang2",
    label: "المحاسبة",
  },
];
const AddUser = (props) => {
  // const { sendRequest: sebdUserData, data, error, isLoading } = useHttp();
  const { data, sendRequest, status, isLoading, error } = useHttp();
  const [section, setSection] = useState("");
  const getSectionValue = (e) => {
    setSection(e.target.value);
  };

  const addUserHandler = useCallback((e) => {
    e.preventDefault();
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;
    const passwordConfirm = document.getElementById(
      "userPasswordConfirm"
    ).value;
    sendRequest("http://127.0.0.1/api/users/signup", "POST", true, {
      name,
      email,
      password,
      passwordConfirm,
      department: "Da",
    });
  });
  return (
    <React.Fragment>
      {isLoading && <Loader />}
      {status ? <Message text="تم ادخال البيانات بنجاح!" /> : null}
      {error ? <Message text={error.response?.data.message} err /> : null}
      <div class="add-book">
        <h3 class="heading--tertiary u-margin-bottom-medium">أضافة مستخدم</h3>
        <form action="#" class="form" onSubmit={addUserHandler}>
          <Input
            type="text"
            id="userName"
            name="userName"
            class="form__input"
            placeholder="أسم المستخدم"
            validationMsg={"أسم الموظف يجب أن يكون على الأقل 6 أحرف!"}
          />
          <Input
            type="email"
            id="userEmail"
            name="userEmail"
            class="form__input"
            placeholder="عنوان البريد الألكتروني"
          />
          <Input type={"select"} options={sections} />

          <Input
            type="password"
            id="userPassword"
            name="userEmail"
            class="form__input"
            placeholder="********"
            label="كلمة السر"
          />
          <Input
            type="password"
            id="userPasswordConfirm"
            name="userEmail"
            class="form__input"
            placeholder="********"
            label={"تأكيد كلمة السر"}
          />
          <Button text="اضافة" loading={isLoading} />
          {/* <button class="btn btn--primary"></button> */}
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddUser;
