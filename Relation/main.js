const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2");
const { Sequelize } = require("sequelize")

const { Model } = require("sequelize");
const employee = require("./models").Employee;
const contact = require("./models").Contact;

app.post("/addemp", async (req, res) => {
    var data = await employee.create({ firstName: "Aoron", lastName: "Ketin", email: "karia@gmail.com" })
    if(data && data.id){
        await contact.create({ address: "block-B,403",  phone:"9340348798", 'empId':data.id })
    }
    res.json(data);
})


app.get("/empData", async (req,res)=>{
    var record = await employee.findAll({})
    res.json(record);
})


app.get("/data", async (req,res)=>{
    var emp = await contact.findAll({})
    res.json(emp);
})


app.get("/records", async (req,res)=>{
    var data = await employee.findAll({
        attributes:['id','firstName','lastName'],
        include:[{
            model:contact,
            as:'contactDetails',
            attributes:['address','phone']
        }]
    })
    res.json(data);
})


app.patch("/update", async (req, res) => {
    var update = await contact.update({ address: "street-5,residency" },
        {
            where: {
                empId:3
            }
        })
    res.json(update);
})


app.listen(3007, () => {
    console.log("App port:http://localhost:3007")
})