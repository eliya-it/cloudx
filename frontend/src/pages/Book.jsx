import React, { useCallback, useEffect } from "react";
import Layout from "../containers/Layout/Layout";
import photo from "../assets/img/test-3.jpg";
import Slider from "../components/Slider/Slider";
import PdfViewer from "../components/Viewer/PdfViewer";
import useHttp from "../hooks/http";
import { useParams } from "react-router";
const containerStyles = {
  width: "100%",
  height: "100vh",
  margin: "0 auto",
};

const Book = ({}) => {
  const { sendRequest, data, error, status, isLoading } = useHttp();
  const { id } = useParams();
  useEffect(() => {
    const res = sendRequest(`http://127.0.0.1/api/books/${id}`, "GET", true);
  }, [id]);
  // console.log(data?.doc.createdAt);
  const date = new Date(data?.data.doc.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  console.log(`Current Date is ${year}-${month}-${day}`);
  const dateFormat =
    date.getFullYear() +
    "-" +
    ((date.getMonth() + 1).length != 2
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate().length != 2 ? "0" + date.getDate() : date.getDate());

  console.log(data?.data.doc.user);
  return (
    <React.Fragment>
      <div class="book">
        <ul class="book__info u-list u-list--row u-list--center">
          <li class="u-list__item">
            <ion-icon
              class="book__icon u-icon u-icon--filled"
              name="calendar-outline"
            ></ion-icon>
            <span class="book__info__text">
              التاريخ: <strong>{dateFormat}</strong>
            </span>
          </li>
          <li class="u-list__item">
            <ion-icon
              class="book__icon u-icon u-icon--filled"
              name="time-outline"
            ></ion-icon>
            <span class="book__info__text">
              الوقت:{" "}
              <strong>{`${Math.ceil(
                (date.getMinutes() * 60 * 60) / 1000
              )}-${date.getHours()}`}</strong>
            </span>
          </li>
          <li class="u-list__item">
            <ion-icon
              class="book__icon u-icon u-icon--filled"
              name="library-outline"
            ></ion-icon>
            <span class="book__info__text">
              نوعه: <strong>{data?.data.doc.type}</strong>
            </span>
          </li>
          <li class="u-list__item">
            <ion-icon
              class="book__icon u-icon u-icon--filled"
              name="archive-outline"
            ></ion-icon>
            <span class="book__info__text">
              صدر الى: <strong> {data?.data.doc.section} </strong>
            </span>
          </li>
        </ul>
        <PdfViewer pdf={`/pp/${data?.data.doc.photo}`} />
        {/* <PdfViewer /> */}
        {/* <img src={photo} alt="" className="book__img" /> */}

        <div class="book__container">
          <div class="book__user">
            <img
              src={`http://127.0.0.1/img/users/${data?.data.doc.user.photo}`}
              alt=""
              class="book__user__img"
            />
            <div class="book__user__text">
              <p class="book__user__name">
                <strong>{data?.data.doc.user.name}</strong>
              </p>
              <p class="book__user__name">
                <strong>{data?.data.doc.user.department}</strong>
              </p>
            </div>
          </div>
          {/* <button class="btn btn--warn">Delete</button> */}
        </div>
        <div class="book__text">
          <div className="">
            <h3 class="heading--tertiary u-margin-bottom-smallest">
              {data?.data.doc.title}
            </h3>
          </div>
          <div className="">
            {" "}
            <h3 class="heading--tertiary u-margin-bottom-smallest">
              الملاحظات:
            </h3>
            {data?.data.doc.notes ? (
              <p class="paragraph">{data?.data.doc.notes}</p>
            ) : (
              <p class="paragraph">لا توجد</p>
            )}
          </div>

          <div className="">
            <h3 class="heading--tertiary u-margin-bottom-smallest">الوصف:</h3>
            {data?.data.doc.notes ? (
              <p class="paragraph">{data?.data.doc.description}</p>
            ) : (
              <p class="paragraph">لا يوجد</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Book;
