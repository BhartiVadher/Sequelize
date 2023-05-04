'use strict';

const Actor = require('../models/actor');
const Movie = require('../models/movie');

// const Actor = require("../models").Actor;
// const Movie = require("../models").Movie;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ActorMovies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      movieId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Movies', 
          key: 'id'
        }
      },

      actorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Actors',
          key: 'id'
        }
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ActorMovies');
  }
};