import React from "react";

const authContext = React.createContext({
  authnticated: false,
  token: null,
  userId: null,
  userPhoto: null,
  login: () => {},
  logout: () => {},
});

export default authContext;
