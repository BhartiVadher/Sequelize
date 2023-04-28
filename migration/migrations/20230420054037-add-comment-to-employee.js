'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn( 'Employees', 'comment', Sequelize.STRING );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn( 'Employees', 'comment' );
  }

};