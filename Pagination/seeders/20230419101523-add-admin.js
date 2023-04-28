'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Admins', 
    [{firstName: 'Cassy',lastName: 'hont',email: 'cassy@gmail.com',createdAt: new Date(),updatedAt: new Date()},
     { firstName: "Luis", lastName: "dain", email: "luis@gmail.com", createdAt: new Date(), updatedAt: new Date() },
     { firstName: "Keti", lastName: "Doe", email: "keti@gmail.com", createdAt: new Date(), updatedAt: new Date() },
     { firstName: "Grin", lastName: "dain", email: "grin@gmail.com", createdAt: new Date(), updatedAt: new Date() },
     { firstName: "Pearl", lastName: "Doe", email: "pearl@gmail.com", createdAt: new Date(), updatedAt: new Date() },
     { firstName: "Raina", lastName: "hont", email: "raina@gmail.com", createdAt: new Date(), updatedAt: new Date() },
     { firstName: "Goshi", lastName: "lanier", email: "goshi@gmail.com", createdAt: new Date(), updatedAt: new Date() }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admin', null, {});
  }
};
