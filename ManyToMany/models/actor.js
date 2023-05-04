'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    
    static associate(models) {
      
      Actor.belongsToMany(models.Movie, { through: 'ActorMovies' });
    }
  }
  Actor.init({
    actorName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Actor',
  });
  return Actor;
};