import React, { useCallback, useEffect, useState } from "react";
import Layout from "../containers/Layout/Layout";
import useHttp from "../hooks/http";

import Message from "../components/Message/Message";
import Modal from "../components/UI/Modal/Modal";

const GetAllDocuments = (props) => {
  const {
    sendRequest: getAllDocs,
    data,
    error: getAllDocsError,
    isLoading,
    clear,
  } = useHttp();
  const {
    sendRequest: sendDeleteRequest,
    data: activeStatusData,
    error: activeStatusErr,
    status: deleteDocStatus,
  } = useHttp();
  const [confirm, setConfirm] = useState(false);

  const [curDocId, setCurDocId] = useState("");

  useEffect(() => {
    getAllDocs("http://127.0.0.1/api/books", "GET", true);
  }, [confirm]);

  const deleteDocHandler = useCallback((documentId) => {
    sendDeleteRequest(
      `http://127.0.0.1/api/books/${documentId}`,
      "DELETE",
      true
    );
    setConfirm(false);
  }, []);
  console.log(data);
  return (
    <React.Fragment>
      {" "}
      {confirm ? (
        <Modal
          cb={() => deleteDocHandler(curDocId)}
          text="Do you want to perform your action?"
        />
      ) : null}
      {getAllDocsError ? (
        <Message
          text={String(getAllDocsError?.response.data.message)}
          err={true}
        />
      ) : null}{" "}
      {deleteDocStatus === 204 ? <Message text="Deleted Successfully" /> : null}
      {/* <Confirm /> */}
      <table className="table">
        <thead className="table__head">
          <tr className="table__row">
            <th className="">عنوان الملف</th>
            <th className="">يخص</th>
            <th className="">صلاحية الوصول</th>
            <th className=""> تمت أضافته من قبل</th>
            {/* <th className="">حالة النشاط</th> */}
            <th className="">Action</th>
          </tr>
        </thead>

        <tbody className="table__body">
          {data?.docs?.map((doc) => {
            return (
              <tr className="table__row" key={doc._id}>
                <th className="table__doc">{doc.title}</th>
                <td className="table__doc">{doc.department}</td>
                <td className="table__doc">{doc.isPrivate ? "خاص" : "عام"}</td>
                <td className="table__doc">{doc.user.name}</td>
                <td className="table__doc">
                  <button
                    className="btn btn--warn"
                    key={doc._id}
                    onClick={() => {
                      setCurDocId(doc._id);
                      setConfirm(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default GetAllDocuments;
