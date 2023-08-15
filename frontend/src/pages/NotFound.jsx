import React from "react";
import NotFoundIcon from "../components/UI/Icons/NotFoundIcon";

const NotFound = () => {
  return (
    <div className="not-found">
      <NotFoundIcon class="not-found__icon" />
      <h3 className="not-found__heading">Page doesnt exists!</h3>
    </div>
  );
};

export default NotFound;
