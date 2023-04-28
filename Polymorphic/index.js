const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2");
const { Sequelize } = require("sequelize")
const { Model } = require("sequelize");

const db = require('./models')
const image = db.Image;
const video = db.Video;
const comment = db.Comment;
const tag = db.Tag;
const tagtaggable = db.TagTaggable;


app.post("/poly", async (req,res)=>{
    var imageData = await image.create({title:'image5',url:'2039348myimage'})
    // var imageData = {}
    var videoData = await video.create({title:'video6',text:'have fun'})
    if(imageData.id){
        await comment.create({title:'Barbie', commentableId:imageData.id,commentableType:'image'});
    }
    if(videoData.id){
        await comment.create({title:'Cartoon', commentableId:videoData.id,commentableType:'video'});
    }
    res.json({imageData,videoData});
})


app.post("/manytomanyploy", async (req,res)=>{
    var imageData = await image.create({title:'image7',url:'934824myimage'})
    var videoData = await video.create({title:'video8',text:'myvideo'})
    var tagData = await tag.create({name:'second'})
    if(imageData.id && tagData.id){
        await tagtaggable.create({tagId:tagData.id, taggableId:imageData.id, taggableType:'image'});
    }
    if(videoData.id && tagData.id){
        await tagtaggable.create({tagId:tagData.id, taggableId:videoData.id, taggableType:'video'});
    }
    res.json({imageData,videoData});
})


app.get("/getdata", async (req, res) => {
    var data = await image.findAll({
        include: {
            model: comment,
        }
    });
    res.json(data);
})

app.get("/comment", async (req, res) => {
    var data = await comment.findAll({
        include: {
            model: video,
        }
    });
    res.json(data);
})


app.get("/imagetag", async (req, res) => {
    var data = await image.findAll({
        include: {
            model: tag,
        }
    });
    res.json(data);
})

app.get("/tags", async (req, res) => {
    var data = await tag.findAll({
        include: {
            model: video,
        }
    });
    res.json(data);
})




app.listen(3004, () => {
    console.log("App port:http://localhost:3004")
})