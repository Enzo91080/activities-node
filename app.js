const express = require("express");
const db = require("./app/models/index.js");
const app = express();
const path = require("path");
const fs = require("fs")

const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml')


db.sequelize
  .authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const router = require("./app/routes/index.js");
app.use("/api", router);


const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;
