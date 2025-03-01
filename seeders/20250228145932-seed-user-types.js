'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('user_type', [
      { id: 1, type: 'patient' },
      { id: 2, type: 'doctor' },
      { id: 3, type: 'nurse' },
      { id: 4, type: 'receptionist' },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user_type', null, {});
  },
};