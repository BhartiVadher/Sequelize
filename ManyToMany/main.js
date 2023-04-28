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
    // movie.belongsToMany(actor, { through: 'ActorMovies' });
    // actor.belongsToMany(movie, { through: 'ActorMovies' });
    // var data = await movie.create({ order_amount: "3030", 'custId':1 })
    // res.json(data);

    // var data = await actor.create({
    //     actorName: 'Kartik Aaryan',
    //     movie: [{
    //         movieName: 'Bhool Bhulaiyaa 2',
    //     }]
    // }, {
    //     include: movie
    // })

    var actordata = await actor.create({
        actorName: 'Kriti'
    })

    let moviedata;
    if (actordata.id) {
        moviedata = await movie.create({
            movieName: 'Bareilly ki barfi'
        })
    }

    if (actordata.id && moviedata.id) {
        var actorMovie = await ActorMovie.create({
            movieId: moviedata.id,
            actorId: actordata.id
        })  
    }
    // res.json({actordata,moviedata,actorMovie});
    res.json(actordata);
})

app.get("/movies", async (req,res)=>{
    var data = await movie.findAll({
        attributes:['movieName','id'],
        include:[{
            model:actor,
            attributes:['actorName']
        }]
    })
    res.json(data);
})


app.listen(3010, () => {
    console.log("App port:http://localhost:3010")
})