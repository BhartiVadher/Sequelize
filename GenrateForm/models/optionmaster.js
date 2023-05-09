'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class optionMaster extends Model {

    static associate(models) {
      optionMaster.belongsTo(models.selectMaster,{
        foreignKey:'selectId'
      })
    }
  }
  optionMaster.init({
    optionValue: DataTypes.STRING,
    selectId: DataTypes.INTEGER,
    deletedAt:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'optionMaster',
    paranoid:true,
  });
  return optionMaster;
};