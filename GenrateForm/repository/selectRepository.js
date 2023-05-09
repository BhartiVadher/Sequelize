const express = require("express");
const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
const { Model } = require("sequelize");
const db = require("../models");
const app = express();
app.set("view engine", "ejs");

const optionMaster = db.optionMaster;
const selectMaster = db.selectMaster;

const data1 = async ({ field }) => {
  return selectMaster.findOne({
    attributes: ["id", "selectValue"],
    where: { selectValue: field },
  });
};

const data2 = async ({ id }) => {
  return optionMaster.findAll({
    attributes: ["optionValue"],
    where: { selectId: id },
  });
};

const addData = async ({selectValue,option}) =>{
  return selectMaster.create({
    selectValue : selectValue,
    optionMasters : option
  },{
    include : [optionMaster]
  })  
}

const deleteData = async ({selectId,id}) =>{
  console.log("jdhjdhfjdhh",selectId);
  return await optionMaster.destroy({
    where:{
      // selectId: selectId,
      id:id
    }
  })
}



// const insert = await selectMaster.create(
//   {
//     selectValue: selectValue,
//     optionMasters: option,
//   },
//   {
//     include: [optionMaster],
//   }
// );

module.exports = { data1, data2, addData, deleteData};
