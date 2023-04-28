'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, { foreignKey: "custId" })
    }
  }
  Customer.init({
    custName: DataTypes.STRING,
    cust_no: DataTypes.STRING
  },
    {
      hooks: {
        afterCreate: (item, options) => {
          console.log("New Customer created");
        },
      },
      sequelize,
      modelName: 'Customer',
    });
  return Customer;
};