const express = require("express");
const db = require("./app/models/index.js");
const app = express();
const path = require("path");

db.sequelize
  .authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const router = require("./app/routes/index.js");
app.use("/api", router);

module.exports = app;
