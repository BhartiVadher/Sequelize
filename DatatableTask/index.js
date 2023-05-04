const express = require("express");
const app = express();
const { Model } = require("sequelize");

const studentData = require("./routes/indexRoutes");
const pagination = require("./routes/indexRoutes");

app.set("view-engine", "ejs");

app.use("/", studentData);
app.use("/", pagination);

const port = 8008;  

app.listen(port, (req, res) => {
  console.log("Successfully Connected");
});