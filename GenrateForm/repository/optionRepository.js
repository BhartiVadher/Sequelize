const express = require("express");
const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
const { Model } = require("sequelize");
const { Op } = require("sequelize");
const db = require("../models");
const app = express();
app.set("view engine", "ejs");

const optionMaster = db.optionMaster;
const selectMaster = db.selectMaster;

module.exports = { };