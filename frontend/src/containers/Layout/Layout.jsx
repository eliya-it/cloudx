import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import AuthContext from "../../context/auth-context";
import ThemeToggle from "../../components/UI/ThemeToggle/ThemeToggle";
import { ThemeContext } from "../../context/theme-context";
import { motion, AnimatePresence } from "framer-motion";
const Layout = (props) => {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
  const [authnticated, setAuthnticated] = useState(false);
  let content;
  content = (
    <AuthContext.Provider value={{ authnticated: authnticated }}>
      <div id="app" className={theme}>
        <Header />

        <div className="container">
          <Sidebar />
          <AnimatePresence>
            <motion.div className="content">{props.children}</motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AuthContext.Provider>
  );
  // else content = <p className="heading--tertiary">You dont have access</p>;
  return content;
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
