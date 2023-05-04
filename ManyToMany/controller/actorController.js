const express = require("express");
const bodyParser = require('body-parser')
const mysql = require("mysql2");
const { Sequelize } = require("sequelize")
const { Model } = require("sequelize");
const db = require('../models')
const app = express();

const movie = db.Movie;
const actor = db.Actor;

const insertData = async (req, res) => {
  var data = await actor.create({
    actorName: "Deepika",
    Movies: [{
      movieName: "Pathan",
    }]
  }, {
    include: [db.Movie]
  });

  res.json({ data });
}


const selectData = async (req, res) => {
  var actordata = await movie.findAll({
    attributes: ['movieName', 'id'],
    include: [{
      model: actor,
      attributes: ['actorName']
    }]
  })
  res.json(actordata);
}

module.exports = { insertData, selectData };