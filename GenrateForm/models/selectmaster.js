'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class selectMaster extends Model {
    static associate(models) {
      selectMaster.hasMany(models.optionMaster,{foreignKey:'selectId'});
    }
  }
  selectMaster.init({
    selectValue: DataTypes.STRING,
    deletedAt:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'selectMaster',
    paranoid:true,
  });
  return selectMaster;
};