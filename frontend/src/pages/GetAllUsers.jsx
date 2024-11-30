import React, { useCallback, useEffect, useState } from "react";
import Layout from "../containers/Layout/Layout";
import useHttp from "../hooks/http";
import axios from "axios";
import Message from "../components/Message/Message";
import Modal from "../components/UI/Modal/Modal";
const GetAllUsers = (props) => {
  const {
    sendRequest: getAllUsers,
    data,
    error: getAllUsersError,
    isLoading,
    clear,
  } = useHttp();

  const {
    sendRequest: sendDeactiveStatus,
    data: activeStatusData,
    error: activeStatusErr,
    status: userStatusMessage,
  } = useHttp();
  const [confirm, setConfirm] = useState(false);
  const [curUser, setCurUser] = useState({});
  useEffect(() => {
    getAllUsers("/users", "GET", true);
  }, [confirm]);
  const deactivateUserHandler = useCallback(async (user, userStatus) => {
    sendDeactiveStatus(`/users/deactivateUser/${user._id}`, "PATCH", true, {
      isActive: !user.isActive,
    });
    setConfirm(false);
  }, []);
  console.log(data);
  return (
    <React.Fragment>
      {confirm ? (
        <Modal
          cb={() => deactivateUserHandler(curUser)}
          text="Do you want to perform your action?"
        />
      ) : null}
      {getAllUsersError ? (
        <Message
          text={String(getAllUsersError?.response.data.message)}
          err={true}
        />
      ) : null}{" "}
      {userStatusMessage ? (
        <Message text="تم تغيير حالة نشاط المستخدم بنجاح!" />
      ) : null}
      <table className="table">
        <thead className="table__head">
          <tr className="table__row">
            <th className="">أسم الموظف</th>
            <th className="">عنوان بريده الألكتروني</th>
            <th className="">قسمه</th>
            <th className="">حالة النشاط</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {data?.data.users.map((user) => {
            return (
              <tr className="table__row" key={user._id}>
                <th className="table__doc">{user.name}</th>
                <td className="table__doc">{user.email}</td>
                <td className="table__doc">{user.department}</td>
                <td className="table__doc">
                  {user.isActive ? "نشط" : "غير نشط"}
                </td>
                <td className="table__doc">
                  {user.isActive ? (
                    <button
                      className="btn btn--warn"
                      key={user._id}
                      onClick={() => {
                        setConfirm(true);
                        setCurUser(user);
                      }}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn--green"
                      key={user._id}
                      onClick={() => {
                        setConfirm(true);
                        setCurUser(user);
                      }}
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default GetAllUsers;
