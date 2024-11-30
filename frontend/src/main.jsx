import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/style.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Dashboard from "./pages/dashboard";
import ActiveTwoFactorAuth from "./pages/ActiveTwoFactorAuth";
import Login from "./pages/Login";
import GetAllUsers from "./pages/GetAllUsers";
import AddBook from "./pages/AddBook";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import authReducer from "./store/reducers/auth";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./store/reducers/index";
import App from "./App";
import { ThemeProvider } from "./context/theme-context";
import { AuthContextProvider } from "./context/auth-context";
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pp/:file",
    element: <h1>Access Denied!</h1>,
  },
  ,
  {
    path: "/me",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registerTwoFactorAuth",
    element: <ActiveTwoFactorAuth />,
  },
  {
    path: "/getAllUsers",
    element: <GetAllUsers />,
  },
  {
    path: "/addBook",
    element: <AddBook />,
  },
  {
    path: "/book/:id",
    element: <Book />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
