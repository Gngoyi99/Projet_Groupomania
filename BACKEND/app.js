const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("./db.mysql.js");
const cors = require("cors");
const userRoutes = require("../BACKEND/routes/user");
const postRoutes = require("../BACKEND/routes/post");

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
