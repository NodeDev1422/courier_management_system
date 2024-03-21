'use strict';

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
     await queryInterface.bulkUpdate('branches', { client_id: 34});
     await queryInterface.bulkUpdate('users', { client_id: 34});
     await queryInterface.bulkUpdate('upload_master', { client_id: 34});
     await queryInterface.bulkUpdate('customers', { client_id: 34});
     await queryInterface.bulkUpdate('designations', { client_id: 34});
     await queryInterface.bulkUpdate('district_master', { client_id: 34});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('roles', null, {});
  }
};
