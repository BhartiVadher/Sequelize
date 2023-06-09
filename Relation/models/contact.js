'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsTo(models.Employee, { foreignKey: "empId" })
      // define association here
    }
  }
  Contact.init({
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    empId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};