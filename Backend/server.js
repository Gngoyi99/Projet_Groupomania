const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("../Backend/routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
//const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
const path = require("path");
const app = express();

const corsOptions = {
  origin: "*",
  allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// routes

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((error, req, res, next) => {
  const message = `this is the unexpected field -> "${error.field}"`;
  console.log(message);

  return res.status(500).send(message);
});

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
