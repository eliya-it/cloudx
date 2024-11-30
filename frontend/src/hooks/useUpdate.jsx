import React, { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "../axios";
const useUpdate = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const update = (name, email, photo) => {
    setIsLoading(true);
    axios
      .patch(
        "/users/updateMe",
        {
          name,
          email,
          photo,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          const updatedUser = res.data.data.user;
          console.log(updatedUser);

          dispatch({
            type: "UPDATE",
            user: {
              name: updatedUser.name,
              token: user.token,
              photo: updatedUser.photo,
              role: updatedUser.role,
            },
          });

          localStorage.setItem(
            "user",
            JSON.stringify({
              name: updatedUser.name,
              token: user.token,
              role: user.role,
              photo: updatedUser.photo,
            })
          );
          setData(res.data.data.user);
        }
      })
      .catch((err) => console.error(err));
  };
  return { update, isLoading, error, data };
};

export default useUpdate;
