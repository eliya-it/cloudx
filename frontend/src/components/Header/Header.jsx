import React, { useCallback, useContext, useEffect, useState } from "react";
import userImg from "../../assets/img/user.jpg";
import {
  RiBarChart2Fill,
  RiChatPrivateFill,
  RiDatabase2Fill,
  RiLogoutBoxFill,
  RiMoonClearFill,
  RiSunFill,
  RiUser2Fill,
} from "react-icons/ri";
import * as actions from "../../store/actions/index";
import ThemeToggle from "../UI/ThemeToggle/ThemeToggle";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import useLogout from "../../hooks/useLogout";
import useAuthContext from "../../hooks/useAuthContext";
import List from "../UI/List";
import Item from "../UI/Item";
const Header = (props) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="navbar">
      {user ? (
        <div className="quick-nav">
          {/* <img
            src={`http://192.168.0.113/img/users/${user.photo}`}
            alt="user"
            className="navbar__user__img"
          /> */}
          <button className="quick-nav__btn" onClick={() => setToggle(!toggle)}>
            {user.name}
          </button>
          <List
            isCol
            className={`quick-nav__list ${
              toggle ? "quick-nav__list--active" : ""
            }`}
          >
            <Item className="quick-nav__item">
              <Link to="/me" className="quick-nav__link flex flex--center">
                <RiUser2Fill className="icon" />
                <span>Settings</span>
              </Link>
            </Item>
            <Item className="quick-nav__item">
              {" "}
              <Link to="/me" className="quick-nav__link flex flex--center">
                <RiBarChart2Fill className="icon" />
                <span>Stats</span>
              </Link>{" "}
            </Item>
            <Item className="quick-nav__item">
              <button
                className="quick-nav__link flex flex--center"
                onClick={() => logout()}
              >
                <RiLogoutBoxFill className="icon" />
                <span>Logout</span>
              </button>
            </Item>
          </List>
        </div>
      ) : null}
      <ThemeToggle />
    </nav>
  );
};

export default Header;
