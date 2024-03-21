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
     await queryInterface.bulkInsert('statuses', [{ status_text: 'Pending Mapping', status_description: 'New Customer received from bank'},
    { status_text: 'In Progress', status_description: 'Save & Next from application form by Maker'},
    { status_text: 'Pending Verification', status_description: 'Records sent for checkers approval by maker, present in docket listing for verification by Checker'},
    { status_text: 'CKYC Found', status_description: 'Save CKYC under the customer details matching data found from cersai fetch'},
    { status_text: 'On Hold', status_description: 'Checker has reviewed and put OnHold with reason'},
    { status_text: 'Audited', status_description: 'Checker has verified and approved the customer record then this record moves to CKYC Upload section for zip file generation'},
    { status_text: 'CKYC File Generated', status_description: 'ZIP file generated'},
    { status_text: 'CKYC Approved', status_description: 'CKYC no generated and details updated in our system'},
    { status_text: 'CKYC Rejected', status_description: 'CERSAI was rejected the KCY this customers should be moved to In-Progress again to reprocess'},
    { status_text: 'In-Progress Verification', status_description: 'verification is in progress by checker '}
  ].map(statuso => { return { ...statuso, ...{created_at: new Date(), updated_at: new Date()}}}))
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
