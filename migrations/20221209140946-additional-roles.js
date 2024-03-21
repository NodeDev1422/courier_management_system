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
    //  await queryInterface.bulkInsert('roles', [{
    //   role_name: 'SuperAdmin'
    //  },{
    //   role_name: 'Client'
    //  }], {});

     await queryInterface.bulkDelete('roles', {'role_name': 'Client'}, {});
     await queryInterface.removeColumn('branches', 'client_id');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('roles', {'role_name': 'Client'}, {});
  }
};
