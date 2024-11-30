import React, { useCallback, useState, useEffect, useContext } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import GetAllUsers from "./pages/GetAllUsers";
import GetAllDocuments from "./pages/GetAllDocs";
import AddBook from "./pages/AddBook";
import AddUser from "./pages/AddUser";
import ActiveTwoFactorAuth from "./pages/ActiveTwoFactorAuth";
import Book from "./pages/Book";
import NotFound from "./pages/NotFound";

import Layout from "./containers/Layout/Layout";
import ProtectedRoute from "./containers/ProtectedRoute";
import useAuthContext from "./hooks/useAuthContext";
import Loader from "./components/UI/Loader/Loader";
import PdfViewer from "./components/Viewer/PdfViewer";
import useHttp from "./hooks/http";
import Admin from "./pages/Admin";
let logoutTimer;

function App({ status, token }) {
  // const [isLoading, setIsLoading] = useState(true);
  const { sendRequest, error, isLoading, data } = useHttp();
  const { user } = useAuthContext();
  // useEffect(() => {
  //   window.addEventListener("load", () => {
  //     setIsLoading(false);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (user?.token) {
  //     console.log("Token Exists!");
  //     sendRequest("/users/validateToken", "POST", false, {
  //       token: user.token,
  //     });
  //   }
  //   // if (token && tokenExpDate) {
  //   //   const remainingTime =
  //   //     new Date(tokenExpDate).getTime() - new Date().getTime();
  //   //   logoutTimer = setTimeout(logout, remainingTime);
  //   // } else {
  //   //   clearTimeout(logoutTimer);
  //   // }
  // }, [user]);
  useEffect(() => {
    if (
      error?.response.data.status === "error" ||
      error?.response.data.status === "fail"
    ) {
      // alert("Token is invalid you will be logged out in 10!");
    } // Handle error
  }, [data, error]);
  return (
    <BrowserRouter>
      {/* {isLoading && <Loader isFull />} */}

      <Routes>
        <Route
          element={
            <ProtectedRoute isAuth={user ? true : false}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            exact
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/me"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/getAllUsers" exact element={<GetAllUsers />} />
          <Route path="/two-auth" exact element={<ActiveTwoFactorAuth />} />
          <Route path="/files" exact element={<GetAllDocuments />} />
          <Route path="/add-file" exact element={<AddBook />} />
          <Route path="/add-user" exact element={<AddUser />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/book/:id" exact element={<Book />} />
        </Route>
        <Route path="/login" exact element={<Login />} />
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
