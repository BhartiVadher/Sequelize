'use strict';
const {
  Model
} = require('sequelize');

const TagTaggable = require("./tagtaggable");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.hasMany(models.Comment, {
        foreignKey: 'commentableId',
        constraints: false,
        scope: {
          commentableType: 'image'
        }
      });

      Image.belongsToMany(models.Tag, {
        through: {
          model: models.TagTaggable,
          unique: false,
          scope: {
            taggableType: 'image'
          }
        },
        foreignKey: 'taggableId',
        constraints: false
      });
    }
  }
  Image.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};