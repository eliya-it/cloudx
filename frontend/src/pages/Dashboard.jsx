import React, { useCallback, useEffect, useState } from "react";

import ChangeUserInfo from "../components/ChangeUserInfo/ChangeUserInfo";
import ChangeUserPassword from "../components/ChangeUserPassword/ChangeUserPassword";
const Dashboard = (props) => {
  return (
    <div className="dashboard">
      {/* Change Information */}
      <ChangeUserInfo />
      {/* Change Password */}
      <ChangeUserPassword />
      {/* Delete user account */}
    </div>
  );
};

export default Dashboard;
