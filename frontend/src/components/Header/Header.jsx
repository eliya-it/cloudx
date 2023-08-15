import React, { useCallback, useEffect, useState } from "react";
import userImg from "../../assets/img/user.jpg";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import AuthContext from "../../context/auth-context";
import ThemeToggle from "../UI/ThemeToggle/ThemeToggle";
const Header = (props) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <nav className="navbar">
      <ThemeToggle />
      <div className="navbar__user">
        <img src={userImg} alt="user" className="navbar__user__img" />
        <p className="navbar__user__name">Admin</p>
      </div>
    </nav>
  );
};
export default Header;
