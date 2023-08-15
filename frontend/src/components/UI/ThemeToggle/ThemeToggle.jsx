import React, { useContext } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { ThemeContext } from "../../../context/theme-context";

const ThemeToggle = (props) => {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
  return (
    <div className="toggle-mode">
      {" "}
      <RiMoonClearFill className="toggle-mode__icon" />
      <button className="toggle-mode__btn  toggle-mode__btn--dark">
        <span
          // className="toggle-mode__btn__circle"
          onClick={toggleTheme}
          // onClick={() => {
          //   setIsDark(!isDark);
          //   localStorage.setItem("isDark", !isDark);
          // }}
          className={`toggle-mode__btn__circle toggle-mode__btn__circle--${
            isDark ? "dark" : "light"
          }`}
        >
          &nbsp;
        </span>
      </button>{" "}
      <RiSunFill className="toggle-mode__icon" />
    </div>
  );
};

export default ThemeToggle;
