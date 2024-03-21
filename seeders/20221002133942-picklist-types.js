'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('pick_list_master', [
      { pick_list_master_name: "Name Prefix", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "Country", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "Occupation", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "State", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "Address Proof", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "ID Proof", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "Constitution Type", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "Related Person Type", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "Designation", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "Residential Status", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "Documents Received", created_at: new Date(), updated_at: new Date() },
      { pick_list_master_name: "Account Type", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op
    // await queryInterface.bulkDelete('upload_master', {master_id: {[Op.in]: [2]} }, {})
    // return await queryInterface.bulkDelete('pick_list_master', { pick_list_master_id: {[Op.in]: [2]} }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
