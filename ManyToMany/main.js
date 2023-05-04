const express = require("express");
const app = express();
const { Model } = require("sequelize");

const insertData = require("./routes/actorRoutes");
const selectData = require("./routes/actorRoutes");

app.set("view-engine", "ejs");

app.use("/", insertData);
app.use("/", selectData);

const port = 3011;

app.listen(port, (req, res) => {
    console.log("Successfully Connected");
});