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
     await queryInterface.bulkInsert('branches', [{
      branch_name: 'Ishnapur',
      branch_code: 'MMTC',
      branch_manager: 'Ishnapur',
      contact_number: '8500589739',
      status: 1,
      created_by:1,
      updated_by:1,
      created_at: new Date(),
      updated_at: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('branches', null, {});
  }
};
