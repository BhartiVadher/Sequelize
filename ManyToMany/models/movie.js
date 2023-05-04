'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
   
    static associate(models) {
  
      Movie.belongsToMany(models.Actor, { through: 'ActorMovies' });
    }
  }
  Movie.init({
    movieName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};