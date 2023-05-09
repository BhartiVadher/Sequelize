const express = require("express");
const app = express();
const { Model } = require("sequelize");

const records = require("./routes/selectRoutes");
const comboGenerate = require("./routes/selectRoutes");
const dataDelete= require("./routes/selectRoutes")
const { swaggerServe, swaggerSetup } = require("./config");
// const { comboGenerate } = require("./controller/selectController");

app.use(express.json());
app.set("view-engine", "ejs");

app.use("/", records);
app.use("/", comboGenerate);
app.use("/",dataDelete)
app.use("/apiDocs", swaggerServe, swaggerSetup);

const port = 8070;

app.listen(port, (req, res) => {
  console.log(`App is listening at http://localhost:${port}`);
});
