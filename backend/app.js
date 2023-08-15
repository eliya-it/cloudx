const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRouter");
const bookRoutes = require("./routes/bookRouter");
const viewsRoutes = require("./routes/viewsRouter");
const errorController = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const fileUplaod = require("express-fileupload");
const AppError = require("./utils/appError");

// app.use(fileUplaod());
// Set view Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
// Set Config Enviroment
dotenv.config("./config");
const cors = require("cors");
app.use(cors());
// Parse Json
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
// Set Body Parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: "10kb" }));
// app.use("/", viewsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", (req, res, next) => {
  return next(new AppError("Page doest not exists", 404));
});
app.use(errorController);
module.exports = app;
