import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaFileArchive } from "react-icons/fa";
import {
  RiGroup2Fill,
  RiHome2Fill,
  RiSettings2Fill,
  RiFileLockFill,
} from "react-icons/ri";
import { RiLock2Fill } from "react-icons/ri";
import { RiFileAddFill } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import { RiUserSettingsFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { RiGroupFill } from "react-icons/ri";
import { RiFileListFill } from "react-icons/ri";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const toggleActiveLinks = (activeStatus) => {
    if (activeStatus) {
      return "sidebar__link u-list__link u-list__link--icon sidebar__item--active";
    } else return "sidebar__link u-list__link u-list__link--icon ";
  };
  const navLink = (text, icon, path) => {
    return (
      <li className="sidebar__item  u-list__item u-list__item--active">
        <NavLink
          to={path}
          className={({ isActive }) => toggleActiveLinks(isActive)}
        >
          {icon}
          <span> {text}</span>
        </NavLink>
      </li>
    );
  };
  return (
    <React.Fragment>
      <div className="toggle-nav">
        <button
          className="sidebar__btn"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <span
            className={`sidebar__icon ${
              activeMenu ? "sidebar__icon--active" : ""
            }`}
          >
            &nbsp;
          </span>
        </button>
      </div>
      <div className={`sidebar ${activeMenu ? "sidebar--active" : ""}`}>
        <ul className="sidebar__list u-list u-list--col">
          {[
            navLink(
              "الصفحة الرئيسية",

              <RiHome2Fill className="sidebar__link__icon" />,
              "/"
            ),
            navLink(
              "الأعدادات",

              <RiUserSettingsFill className="sidebar__link__icon" />,
              "/me"
            ),
            navLink(
              "الأمان",

              <RiLock2Fill className="sidebar__link__icon" />,
              "/registerTwoFactorAuth"
            ),
            navLink(
              "أضف كتاب",

              <RiFileAddFill className="sidebar__link__icon" />,
              "/addBook"
            ),
          ]}

          {/* {JSON.parse(localStorage.getItem("userData")).role === "admin"
            ? [
                navLink(
                  "أضافة مستخدم",
                  <RiUserAddFill className="sidebar__link__icon u-icon" />,
                  "/addUser"
                ),

                navLink(
                  "جميع المستخدمين",
                  <RiGroupFill className="sidebar__link__icon u-icon" />,
                  "/getAllUsers"
                ),
                navLink(
                  "جميع الملفات",
                  <RiGroupFill className="sidebar__link__icon u-icon" />,
                  "/getAllUsers"
                ),
              ]
            : null} */}
        </ul>
        <div className="sidebar__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    </React.Fragment>
  );
};
export default Sidebar;
