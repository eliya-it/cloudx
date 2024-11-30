import {
  RiLock2Fill,
  RiFileAddFill,
  RiUserSettingsFill,
  RiUserAddFill,
  RiGroupFill,
  RiFileSettingsFill,
  RiBarChart2Fill,
  RiHome2Fill,
} from "react-icons/ri";
import React, { useState } from "react";
import SidebarLink from "./SidebarLink";
import List from "../UI/List";
import MobileNav from "../UI/MobileNav/MobileNav";
const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };
  return (
    <React.Fragment>
      <MobileNav handler={toggleMenu} status={activeMenu} />
      <div className={`sidebar ${activeMenu ? "sidebar--active" : ""}`}>
        <List className="sidebar__list u-list u-list--col">
          <SidebarLink path="/">
            <RiHome2Fill className="sidebar__link__icon" />
            <span>الصفحة الرئيسية</span>
          </SidebarLink>{" "}
          <SidebarLink path="/me">
            <RiUserSettingsFill className="sidebar__link__icon" />
            <span> الأعدادات</span>
          </SidebarLink>{" "}
          <SidebarLink path="/two-auth">
            <RiLock2Fill className="sidebar__link__icon" />
            <span> الأمان</span>
          </SidebarLink>{" "}
          <SidebarLink path="/add-file">
            <RiFileAddFill className="sidebar__link__icon" />
            <span> أضف ملف</span>
          </SidebarLink>{" "}
          <SidebarLink path="/stats">
            <RiBarChart2Fill className="sidebar__link__icon" />
            <span> الإحصائيات</span>
          </SidebarLink>
          {JSON.parse(localStorage.getItem("user")).role === "admin" ? (
            <>
              <SidebarLink path="/add-user">
                <RiUserAddFill className="sidebar__link__icon" />
                <span> أضافة مستخدم</span>
              </SidebarLink>{" "}
              <SidebarLink path="/users">
                <RiGroupFill className="sidebar__link__icon" />
                <span> جميع المستخدمين</span>
              </SidebarLink>{" "}
              <SidebarLink path="/files">
                <RiFileSettingsFill className="sidebar__link__icon" />
                <span> جميع الملفات</span>
              </SidebarLink>
            </>
          ) : null}
        </List>
        <div className="sidebar__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    </React.Fragment>
  );
};
export default Sidebar;
