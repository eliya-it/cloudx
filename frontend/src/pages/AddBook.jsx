import React, { useState } from "react";
import Modal from "../components/UI/Modal/Modal";
import Layout from "../containers/Layout/Layout";
import useHttp from "../hooks/http";
import Input from "../components/UI/Input/Input";
import Message from "../components/Message/Message";
const AddBook = (props) => {
  const [docSection, setDocSection] = useState("أداري");
  const [docAccess, setDocAccess] = useState(false);
  const { isLoading, sendRequest, data, error, clear, status } = useHttp();
  const getDocType = (e) => {
    setDocSection(e.target.value);
  };
  const getDocAccess = (e) => {
    setDocAccess(e.target.value);
  };
  const sendBookData = (e) => {
    e.preventDefault();
    const title = document.getElementById("bookName").value;
    const photo = document.getElementById("bookPhoto").files[0];
    const forEmp = document.getElementById("forEmp").value;
    const docNum = document.getElementById("docNum").value;
    const docDate = document.getElementById("docDate").value;
    const type = docSection;
    const isPrivate = docAccess;
    console.log();

    const res = sendRequest(
      "http://127.0.0.1/api/books",
      "POST",
      true,
      {
        title,
        photo,
        type,
        isPrivate,
        forEmp,
        docNum,
        docDate,
      },
      true
    );
    console.log(res);
  };

  console.log(error);
  return (
    <React.Fragment>
      {status ? <Message text="تم ادخال البيانات بنجاح!" /> : null}
      {error ? (
        <Message text={String(error?.response.data.message)} err={true} />
      ) : null}
      <div className="add-book">
        <h3 className="heading--tertiary u-margin-bottom-medium">أضافة كتاب</h3>
        <form action="#" className="form" onSubmit={sendBookData}>
          <div className="form__control">
            <label htmlFor="bookName" className="form__label">
              عنوان الكتاب
            </label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              className="form__input"
            />
          </div>
          <div className="form__control">
            <label htmlFor="bookSelect" className="form__label">
              نوع الكتاب
            </label>
            <select
              type="text"
              id="bookSelect"
              name="bookSelect"
              className="form__select"
              onChange={getDocType}
            >
              <option value="أداري" defaultValue={"mang"}>
                أداري
              </option>
              <option value="صادر">صادر</option>
              <option value="أخر">أخر</option>
            </select>
          </div>
          <div className="form__control">
            <label htmlFor="bookSelect" className="form__label">
              صلاحية الوصول
            </label>
            <select
              type="text"
              id="bookSelect"
              name="bookSelect"
              className="form__select"
              onChange={getDocAccess}
            >
              <option value="true">خاص</option>
              <option value="false">عام</option>
            </select>
          </div>
          <div className="form__control">
            <label htmlFor="" className="form__label">
              صورة الكتاب
            </label>
            <label htmlFor="bookPhoto" className="form__input-label">
              اختَر الصورة...{" "}
            </label>
            <input
              type="file"
              id="bookPhoto"
              name="bookPhoto"
              className="form__input--hidden"
            />
          </div>
          <Input label="صدر للموظف:" id="forEmp" />
          <Input label="تاريخ الصدور" id="docDate" />
          <Input label="رقم الكتاب" id="docNum" type="number" />
          <div className="form__control">
            <label htmlFor="bookSelect" className="form__label">
              ملاحظات الكتاب
            </label>
            <textarea
              className="form__textarea"
              placeholder="الملاحظات..."
            ></textarea>
          </div>
          <button className="btn btn--primary">أضافة</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default AddBook;
