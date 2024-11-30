import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ThemeToggle from "../../components/UI/ThemeToggle/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext, ThemeProvider } from "../../context/theme-context";
import { Outlet } from "react-router-dom";
const containerAnimations = {
  hidden: { y: "-100%" },
  visible: { y: "0%" },
  transition: { duration: 0.5 },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.5, ease: "easeIn" },

    // transition: { ease: "easeInOut" },
  },
};
const Layout = ({ children }) => {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <div className={theme}>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">
          {" "}
          <Outlet />
        </div>
        {/* <AnimatePresence mode="wait">
          <motion.div
            className="content"
            variants={containerAnimations}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={location.key}
          >
            <Outlet />{" "}
          </motion.div>
        </AnimatePresence> */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
