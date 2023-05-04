// const { Model } = require("sequelize");
// const users = require("./models").user;

const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const { Sequelize , Op } = require("sequelize")

const { Model } = require("sequelize");
const user = require("./models").User;
const admin = require("./models").Admin;
const customer = require("./models").Customer;


app.get("/admin", async (req, res) => {
    var admindata = await admin.findAll({})
    res.json(admindata);
})

app.get("/user", async (req, res) => {
    var userdata = await user.findOne({
        where: {
            id: 2
        }
    })
    res.json(userdata);
})

app.get("/add", async (req, res) => {
    var insert = await admin.create({ firstName: "Jane", lastName: "Doe", email: "jane@gmail.com" })
    res.json(insert);
})

app.post("/addpost", async (req, res) => {
    var insert = await admin.create({ firstName: "Anders", lastName: "Earl", email: "anders@gmail.com" })
    res.json(insert);
})


app.post("/multiData", async (req, res) => {
    var add = await admin.bulkCreate([{ firstName: "Vini", lastName: "Geom", email: "Vini@gmail.com" },
    { firstName: "Anney", lastName: "Tainor", email: "anney@gmail.com" },
    { firstName: "Sumi", lastName: "Keniar", email: "sumi@gmail.com" }])
    res.json(add);
})


app.delete("/delete", async (req, res) => {
    var deleteAdmin = await admin.destroy({ where: { id:30 } })
    res.json(deleteAdmin);
})


app.patch("/update", async (req, res) => {
    var updateAdmin = await admin.update({ firstName: "David" },
        {
            where: {
                id: 20
            }
        })
    res.json(updateAdmin);
})

app.get("/adminAttribute", async (req, res) => {
    var data = await admin.findAll({ attributes: ['id', 'email'] })
    res.json(data);
})

app.get("/count", async (req, res) => {
    var countData = await admin.findAll({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
        ]
    })
    res.json(countData);
})


app.get("/operator", async (req, res) => {
    var admindata = await admin.findAll({
        where: {
            [Op.or]: [
                { id: 20 },
                { id: 23 }
            ]
          }
    })
    res.json(admindata);
})




// app.delete("/del/:id", async (req, res) => {
//     var deleteAdmin = await admin.destroy({ where: {id: req.query.id }})
//     res.json(deleteAdmin);
// })

// app.post("/postUsers",async(req,res)=>{
//     var postData = req.body;
//     var data = await user.create(postData)
//     res.json(data);
// })

// app.post("/adduser",async(req,res)=>{
//     var insert = await User.create({ firstName: "Nik", lastName: "Doe", bio:"hello", email:"nik@gmail.com", address:"gandhinagar"});
//     res.json(insert);
// })

app.listen(3000, () => {
    console.log("App port:http://localhost:3000")
})