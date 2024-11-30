const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRouter");
const filesRoutes = require("./routes/filesRouter");
const errorController = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const cors = require("cors");
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
// app.use(fileUplaod());
// Set view Engine
// Set Config Enviroment
dotenv.config("./config");

// Parse Json
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
// Set Body Parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: "10kb" }));
// app.use("/", viewsRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/files", filesRoutes);
app.use("/api", (req, res, next) => {
  return next(new AppError("Page doest not exists", 404));
});
app.use(errorController);
module.exports = app;
