'use strict';
const {
  Model
} = require('sequelize');

const TagTaggable = require("./tagtaggable");

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.Image, {
        through: {
          model: models.TagTaggable,
          unique: false
        },
        foreignKey: 'tagId',
        constraints: false
      });

      Tag.belongsToMany(models.Video, {
        through: {
          model: models.TagTaggable,
          unique: false
        },
        foreignKey: 'tagId',
        constraints: false
      });
    }
  }
  Tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};