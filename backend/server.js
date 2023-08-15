const express = require("express");
const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DB_LOCAL;

mongoose
  .connect(DB)
  .then((con) => {
    console.log("[😎] Database Connected Successfully...");
  })
  .catch((err) => {
    console.error(err);
  });
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`[👌] Server Is Listining On ${port}...`);
});
