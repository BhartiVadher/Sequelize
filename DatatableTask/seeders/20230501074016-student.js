'use strict';
const {faker} = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    var newData = [];
    for (let i = 0; i < 30; i++) {
      const student = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.exampleEmail(),
            address: faker.address.streetAddress(true),
            createdAt: new Date(),
            updatedAt: new Date()
      };
      newData.push(student);
    }
    return queryInterface.bulkInsert('Students', newData);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
