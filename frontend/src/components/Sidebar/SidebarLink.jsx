import React from "react";
import { NavLink } from "react-router-dom";
import Item from "../UI/Item";
const SidebarLink = ({ path, children }) => {
  const toggleActiveLinks = (activeStatus) => {
    if (activeStatus) {
      return "sidebar__link u-list__link u-list__link--icon sidebar__item--active";
    } else return "sidebar__link u-list__link u-list__link--icon ";
  };
  return (
    <Item className="sidebar__item  u-list__item u-list__item--active">
      <NavLink
        to={path}
        className={({ isActive }) => toggleActiveLinks(isActive)}
      >
        {children}
      </NavLink>
    </Item>
  );
};

export default SidebarLink;
