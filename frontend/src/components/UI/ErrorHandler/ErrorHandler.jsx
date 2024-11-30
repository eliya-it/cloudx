import React from "react";
import Notifications from "../../Notifications/Notifications";
import Notification from "../../Notifications/Notification";
const ErrorHandler = ({ err = null }) => {
  return (
    <>
      {err ? (
        <Notifications>
          <Notification text={String(err)} isError />
        </Notifications>
      ) : null}
    </>
  );
};

export default ErrorHandler;
