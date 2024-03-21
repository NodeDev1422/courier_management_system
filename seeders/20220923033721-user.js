'use strict';
const { decrypt, encrypt} = require('../lib/cryptography');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('users', [{
      username: 'SuperAdmin',
      password: encrypt('p@ssw0rd'),
      role_id: 1,
      first_name: 'Santosh',
      last_name: 'K',
      branch_id: 1,
      mobile_no: '8500589739',
      email: 'skadmin@mailinator.com',
      status: 1
     }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
