'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('city', [
      { name: 'Cairo' },
      { name: 'Alexandria' },
      { name: 'Giza' },
      { name: '6th of October City' },
      { name: 'Port Said' },
      { name: 'Suez' },
      { name: 'Luxor' },
      { name: 'Asyut' },
      { name: 'Mansoura' },
      { name: 'Tanta' },
      { name: 'Zagazig' },
      { name: 'Faiyum' },
      { name: 'Ismailia' },
      { name: 'Aswan' },
      { name: 'Minya' },
      { name: 'Hurghada' },
      { name: 'Shubra El-Kheima' },
      { name: 'Qena' },
      { name: 'Sohag' },
      { name: 'Banha' },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('city', null, {});
  },
};