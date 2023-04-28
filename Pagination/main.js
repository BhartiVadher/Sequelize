// const { Model } = require("sequelize");
// const users = require("./models").user;

const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2");

const { Model } = require("sequelize");
const admin = require("./models").Admin;
const { Op } = require('sequelize')


app.get("/admindata", async (req, res) => {
  var adminData = await admin.findAll({})
  res.json(adminData);
})

app.get("/page", async (req, res) => {
  var page = req.query.page || 2;
  var limit = 3;
  var offset = (page - 1) * limit || 0;

  var adminInfo = await admin.findAll({offset,limit});

  res.json(adminInfo);
});


app.get("/search", async (req, res) => {
  var search = req.query.search || 0;
  var firstName = "";
  var lastName = "";
  var email = "";

  for (i = 0; i < search.length; i++) {
    if (search.charAt(i) == "^") {
      for (j = i + 1; j <= search.length; j++) {
        if (search.charAt(j) == "%" || search.charAt(j) == "!") {
          break;
        } else {
          firstName += search.charAt(j);
        }
      }
    } else if (search.charAt(i) == "%") {
      for (j = i + 1; j <= search.length; j++) {
        if (search.charAt(j) == "^" || search.charAt(j) == "!") {
          break;
        } else {
          lastName += search.charAt(j);
        }
      }
    } else if (search.charAt(i) == "!") {
      for (j = i + 1; j <= search.length; j++) {
        if (search.charAt(j) == "^" || search.charAt(j) == "%") {
          break;
        } else {
          email += search.charAt(j);
        }
      }
    }
  }

  var searching = await admin.findAll({
    where: {
      [Op.and]: [
        {
          firstName: {
            [Op.like]: `${firstName}%`,
          },
        },
        {
          lastName: {
            [Op.like]: `${lastName}%`,
          },
        },
        {
          email: {
            [Op.like]: `${email}%`,
          },
        },
      ],
    },
  });
  res.json(searching)
});



app.listen(3001, () => {
  console.log("App port:http://localhost:3001")
})