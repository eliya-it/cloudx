import React, { useState } from "react";

const MobileNav = ({ handler, status }) => {
  return (
    <div className="toggle-nav">
      <button className="sidebar__btn" onClick={handler}>
        <span
          className={`sidebar__icon ${status ? "sidebar__icon--active" : ""}`}
        >
          &nbsp;
        </span>
      </button>
    </div>
  );
};

export default MobileNav;
