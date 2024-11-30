import React, { useCallback, useEffect, useState } from "react";
import PdfViewer from "../components/Viewer/PdfViewer";
import useHttp from "../hooks/http";
import { useParams } from "react-router";
import Slider from "../components/UI/Slider/Slider";
import { FULL_PATH } from "../config";

const Book = ({}) => {
  const { sendRequest, data, error, status } = useHttp();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const res = sendRequest(`/files/${id}`, "GET", true);
  }, [id]);
  console.log(data?.data.doc);
  return (
    <React.Fragment>
      <div className="book">
        {/* <ul className="book__info u-list u-list--row u-list--center">
          <li className="u-list__item">
            <ion-icon
              className="book__icon u-icon u-icon--filled"
              name="calendar-outline"
            ></ion-icon>
            <span className="book__info__text">
              التاريخ: <strong>{dateFormat}</strong>
            </span>
          </li>
          <li className="u-list__item">
            <ion-icon
              className="book__icon u-icon u-icon--filled"
              name="time-outline"
            ></ion-icon>
            <span className="book__info__text">
              الوقت:{" "}
              <strong>{`${Math.ceil(
                (date.getMinutes() * 60 * 60) / 1000
              )}-${date.getHours()}`}</strong>
            </span>
          </li>
          <li className="u-list__item">
            <ion-icon
              className="book__icon u-icon u-icon--filled"
              name="library-outline"
            ></ion-icon>
            <span className="book__info__text">
              نوعه: <strong>{data?.data.doc.type}</strong>
            </span>
          </li>
          <li className="u-list__item">
            <ion-icon
              className="book__icon u-icon u-icon--filled"
              name="archive-outline"
            ></ion-icon>
            <span className="book__info__text">
              صدر الى: <strong> {data?.data.doc.section} </strong>
            </span>
          </li>
        </ul> */}

        <div className="book__viewer">
          {data?.data.doc.type === "image" ? (
            <Slider files={data?.data.doc.files[0]} isLoading={isLoading} />
          ) : null}{" "}
          {data?.data.doc.type === "pdf" ? (
            <PdfViewer file={data?.data.doc.files[0]} isLoading={isLoading} />
          ) : null}
        </div>
        <div className="book__container">
          <div className="book__user">
            <img
              src={`${FULL_PATH}img/users/${data?.data.doc.user.photo}`}
              alt=""
              className="book__user__img"
            />
            <div className="book__user__text">
              <p className="book__user__name">
                <strong>{data?.data.doc.user.name}</strong>
              </p>
              <p className="book__user__name">
                <strong>{data?.data.doc.user.department}</strong>
              </p>
            </div>
          </div>
          {/* <button className="btn btn--warn">Delete</button> */}
        </div>
        <div className="book__text">
          <div className="">
            <h3 className="heading--tertiary u-margin-bottom-smallest">
              {data?.data.doc.title}
            </h3>
          </div>
          <div className="">
            {" "}
            <h3 className="heading--tertiary u-margin-bottom-smallest">
              الملاحظات:
            </h3>
            {data?.data.doc.notes ? (
              <p className="paragraph">{data?.data.doc.notes}</p>
            ) : (
              <p className="paragraph">لا توجد</p>
            )}
          </div>

          <div className="">
            <h3 className="heading--tertiary u-margin-bottom-smallest">
              الوصف:
            </h3>
            {data?.data.doc.notes ? (
              <p className="paragraph">{data?.data.doc.description}</p>
            ) : (
              <p className="paragraph">لا يوجد</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Book;
