const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2");

const { Sequelize } = require("sequelize")
const { Model } = require("sequelize");
const db = require('./models')
const movie = db.Movie;
const actor = db.Actor;
const ActorMovie = db.ActorMovie;


app.post("/film", async (req, res) => {

    var insertdata = await actor.create({
        actorName: "Deepika",
        Movies: [{
            movieName: "Pathan",
        }]
        }, {
        include: [db.Movie]
        });

    res.json(insertdata);
})

app.get("/movies", async (req, res) => {
    var data = await movie.findAll({
        attributes: ['movieName', 'id'],
        include: [{
            model: actor,
            attributes: ['actorName']
        }]
    })
    res.json(data);
})


app.listen(3011, () => {
    console.log("App port:http://localhost:3011")
})