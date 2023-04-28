const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql2");
const { Sequelize } = require("sequelize")

const { Model } = require("sequelize");
const customer = require("./models").Customer;
const order = require("./models").Order;




app.post("/order", async (req, res) => {
    var data = await customer.create({ custName: "Kenil", cust_no: "7493444801" })
    if (data && data.id) {
        await order.create({ order_amount: "3005", 'custId': data.id })
    }
    res.json(data);
})


app.post("/multiorder", async (req, res) => {
    var data = await order.create({ order_amount: "3030", 'custId': 1 })
    res.json(data);
})


app.get("/customer", async (req, res) => {
    var data = await customer.findAll({
        attributes: ['custName', 'cust_no'],
        include: [{
            model: order,
            attributes: ['custId', 'order_amount']
        }]
    })
    res.json(data);
})

app.get("/orderData", async (req, res) => {
    var data = await order.findAll({
        attributes: ['custId', 'order_amount'],
        include: [{
            model: customer,
            attributes: ['custName', 'cust_no']
        }]
    })
    res.json(data);
})


app.patch("/update", async (req, res) => {
    var update = await customer.update({ cust_no: "9238470923" },
        {
            where: {
                id: 1
            }
        })
    res.json(update);
})

app.get("/lazyloading", async (req, res) => {
    var data = await customer.findOne(
        {
            where: {
                id:2
            }
        })
    var orderdata = await data.getOrders();
    res.json({data,orderdata});
})

app.get("/eagerloading", async (req, res) => {
    var orderData = await customer.findAll(
        {
            include: order
        });
    res.json(orderData);
})

app.get("/eager", async (req, res) => {
    var orderData = await customer.findAll({
        include: {
            model: order,
            // required : true
            // right: true
        }
    });
    res.json(orderData);
})


app.get("/scope", async (req, res) => {
    customer.addScope('checkNumber', {
        where: {
            cust_no: '8348944801'
        }
    })

    customer.addScope('checkName', {
        where: {
            custName: 'Aaron'
        }
    })

    var scopedata = await customer.scope(['checkNumber', 'checkName']).findAll({})
    res.json(scopedata);
})


app.get("/scopeAsso", async (req, res) => {
    customer.addScope('addOrder', {
        include: {
            model: order,
            // attributes: ['order_amount','id'],
            where:{
                custId : 2
            }
            
        }
    })

    customer.addScope('customerAttribute', {
        attributes: ['custName', 'cust_no'],
    })


    // customer.addScope('limit', {
    //     include: {
    //         model: order,
    //         limit: 1
    //     }
    // })

    
    var data = await customer.scope(['addOrder', 'customerAttribute']).findAll({})
    res.json(data);
})

app.listen(3008, () => {
    console.log("App port:http://localhost:3008")
})