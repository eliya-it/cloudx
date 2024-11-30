import React, { useState } from "react";
import Modal from "../components/UI/Modal/Modal";
import Layout from "../containers/Layout/Layout";
import useHttp from "../hooks/http";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import Message from "../components/Message/Message";
import axios from "../axios";
import Notifications from "../components/Notifications/Notifications";
import Notification from "../components/Notifications/Notification";
import Error from "../components/Error/Error";
const AddBook = (props) => {
  const [docSection, setDocSection] = useState("أداري");
  const [docAccess, setDocAccess] = useState(false);
  const [msg, setMsg] = useState(false);
  const { isLoading, sendRequest, data, error, clear, status } = useHttp();
  const getDocType = (e) => {
    setDocSection(e.target.value);
  };
  const getDocAccess = (e) => {
    setDocAccess(e.target.value);
  };
  const sendBookData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const name = document.getElementById("bookName").value;
    // const photo = document.getElementById("bookPhoto").files[0];
    const files = document.getElementById("files").files;

    const forUser = document.getElementById("forEmp").value;
    const number = document.getElementById("docNum").value;
    const date = document.getElementById("docDate").value;
    // const visibilty = docSection;
    const visibilty = docAccess;
    formData.append("name", name);
    formData.append("forUser", forUser);
    formData.append("number", number);
    formData.append("date", date);
    formData.append("visibilty", visibilty);
    // formData.append("isPrivate", isPrivate);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      formData.append("files", files[i]);
    }
    axios
      .post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      })
      .then((res) => setMsg(true))
      .catch((err) => console.error(err));
  };

  return (
    <React.Fragment>
      {msg ? (
        <Notifications>
          <Notification text="تم ادخال البيانات بنجاح!" isSuccess />
        </Notifications>
      ) : null}

      {/* <Error
        heading="There was an error!"
        text="Don't worry we will fix it as fast as possibe."
      /> */}
      <div className="add-book">
        <h3 className="heading--tertiary u-margin-bottom-medium">أضافة كتاب</h3>
        <span className="form__note">
          {" "}
          الحقل الذي يحتوي على <strong>*</strong> هو حقل إجباري{" "}
        </span>
        <form
          action="#"
          className="add-book__form form"
          onSubmit={sendBookData}
        >
          <Input label="أسم الملف" id="bookName" isRequired />
          <Input
            label="رقم الكتاب"
            id="docNum"
            type="number"
            isRequired
            placeholder="رقم الملف الخاص"
          />

          <div className="form__control">
            <label htmlFor="" className="form__label">
              الملف *
            </label>
            <label htmlFor="files" className="form__input-label">
              إختيار...{" "}
            </label>
            <input
              type="file"
              id="files"
              name="files"
              className="form__input--hidden"
              accept="image/*"
              multiple={true}
            />
          </div>
          <Input
            label="تاريخ صدور الكتاب"
            id="docDate"
            type="date"
            isRequired
          />
          <Input label="صدر للموظف:" id="forEmp" placeholder="علي ..." />
          <Input
            label="نوع الملف"
            id="bookSelect"
            type="select"
            onChange={getDocAccess}
            options={[
              { label: "خاص", value: "public" },
              { label: "عام", value: "private" },
            ]}
          />
          <Input
            containerClassName="add-book__form__textarea"
            label="ملاحظات"
            type="textarea"
          />
          <Button
            className="add-book__form__btn"
            text="إدخال"
            isLoading={isLoading}
          />
        </form>
      </div>
    </React.Fragment>
  );
};
export default AddBook;
