import React, { useCallback, useState, useEffect, useContext } from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import GetAllUsers from "./pages/GetAllUsers";
import GetAllDocuments from "./pages/GetAllDocs";
import AddBook from "./pages/AddBook";
import AddUser from "./pages/AddUser";
import ActiveTwoFactorAuth from "./pages/ActiveTwoFactorAuth";
import Book from "./pages/Book";
import { ThemeContext, ThemeProvider } from "./context/theme-context";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import Message from "./components/Message/Message";
import NotFound from "./pages/NotFound";

let logoutTimer;
const containerAnimations = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: { duration: 1.5 },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { ease: "easeIn" },
  },
};
function App() {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  const login = useCallback((uid, token, expireationDate) => {
    setToken(token);
    setUserId(uid);
    setTokenExpirationDate(new Date(new Date().getTime() + 20000));
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    if (
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData")).expiresIn > Date.now()
    ) {
      localStorage.removeItem("userData");
    }
  }, []);
  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remTime = tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(logout, remTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, logout, tokenExpirationDate]);
  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("userData"));
  //   if (
  //     storedData &&
  //     storedData.token &&
  //     new Date(storedData.expiresIn) > new Date()
  //   ) {
  //     login(storedData.userId, storedData.token);
  //   }
  // }, [login]);

  return (
    <div className={theme}>
      <React.Fragment>
        <Header />
        <div className="container">
          <Sidebar />
          <AnimatePresence mode="wait">
            <motion.div
              className="content"
              variants={containerAnimations}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={location.key}
            >
              <Routes location={location}>
                <Route path="/login" exact element={<Login />} />

                <Route path="/" exact element={<Home />} />
                <Route path="/me" exact element={<Dashboard />} />
                <Route path="/getAllUsers" exact element={<GetAllUsers />} />
                <Route
                  path="/registerTwoFactorAuth"
                  exact
                  element={<ActiveTwoFactorAuth />}
                />
                <Route
                  path="/getAllDocuments"
                  exact
                  element={<GetAllDocuments />}
                />
                <Route path="/addBook" exact element={<AddBook />} />
                <Route path="/addUser" exact element={<AddUser />} />
                <Route path="/book/:id" exact element={<Book />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>{" "}
        </div>{" "}
      </React.Fragment>
    </div>
  );
}

export default App;
