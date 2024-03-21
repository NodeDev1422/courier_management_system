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
     await queryInterface.bulkInsert('designations', [ 'Senior Manager', 'Junior Officer','CEO', 'General Manager', 'Passing Officer', 
       'Clerk', 'Branch Manager', 'Assistant General Manager', 'Executive Director', 'Sub-Officer', 'Officer', 'Manager', 'T. Clerk',
       'Assistant Manager', 'AGM-INVST', 'AGM-LOAN','Deputy Manager', 'Deputy General Manager'].map(designation => {
        return { designation_name: designation, created_at: new Date(), updated_at: new Date()}
       }) 
     );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete('users', {designation_id: {[Op.in]: [1,2]} }, {})
     return await queryInterface.bulkDelete('designations', { id: {[Op.in]: [1,2]} }, {})
  }
};
