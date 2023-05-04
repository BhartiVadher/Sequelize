const express = require("express");
const mysql = require("mysql2");
const { Sequelize } = require("sequelize")
const { Model } = require("sequelize");
const { Op } = require("sequelize");
const db = require('../models')
const app = express();
app.set('view engine', 'ejs');

const student = db.Student;
const sport = db.Sport;

const studentData = async (req, res) => {
  res.render("playersData.ejs");
};

const pagination = async (req, res) => {
  try {
    var draw = req.query.draw;
    var start = parseInt(req.query.start);
    var length = parseInt(req.query.length);
    let search_val = req.query.search['value'];
    let columns = req.query.columns;
    let order = req.query.order;
    let orderCol = order[0].column;
    let orderDir = order[0].dir;
    let orderBy = columns[orderCol].data;
    let orderBy1 = orderBy.split(".");
    let orderBy10 = orderBy1[0];
    let orderBy11 = orderBy1[1];
    let table;
    let ordertable;
    console.log("order", order);
    console.log("orderCol", orderCol);
    console.log("orderBy", orderBy);
    console.log("orderBy10", orderBy10);
    console.log("orderBy11", orderBy11);

    if (orderBy10 == "Sport") {
      table = "Sport";
      ordertable = [table, orderBy11, orderDir];
    } else {
      ordertable = [orderBy, orderDir];
    }
    const studentData = await student.count();

    if (length == -1) {
      length = studentData
    }

    const serach = await student.findAll({
      attributes: ['firstName', 'lastName', 'email', 'address'],
      offset: start,
      limit: length,
      order: [ordertable],
      include: {
        model: sport,
        attributes: ['game'],


        where: {
          [Op.or]: [
            {
              "$Student.firstName$": {
                [Op.like]: `%${search_val}%`,
              },
            },
            {
              "$Student.lastName$": {
                [Op.like]: `%${search_val}%`,
              },
            },
            {
              "$Student.email$": {
                [Op.like]: `%${search_val}%`,
              },
            },
            {
              "$Student.address$": {
                [Op.like]: `%${search_val}%`,
              },
            },
            {
              "$Sport.game$": {
                [Op.like]: `%${search_val}%`,
              },
            },
          ],
        },
      },
    });

    return res.json({ draw: draw, recordsTotal: studentData, recordsFiltered: studentData, data: serach });

  } catch (error) {
    console.log(error);
  }
}

module.exports = { pagination, studentData };
