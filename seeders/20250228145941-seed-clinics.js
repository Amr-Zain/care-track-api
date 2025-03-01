/* eslint-disable @typescript-eslint/no-var-requires */

const { faker } = require('@faker-js/faker');

module.exports = { 
  async  up(queryInterface) {
  const clinics = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < 2; j++) {
      const userId = `user-${i}`;
      const id = `clinic-${clinics.length+1}`
      const clinicName = `${faker.company.name()} Clinic ${j + 1}`;
      const location = faker.location.streetAddress();
      const city = Math.floor(Math.random() * 20) + 1; 
      const phone = `01${Math.floor(Math.random() * 100000)}110`;

      clinics.push({
        id, 
        doctorId: userId,
        city,
        location,
        clinicName,
        phone,
      });
    }
  }

  await queryInterface.bulkInsert('clinic', clinics, {});
},

async down(queryInterface) {
  const doctorIds = [];
  for (let i = 1; i <= 10; i++) {
    doctorIds.push(`user-${i}`);
  }
  await queryInterface.bulkDelete('clinic', null, {});
},
}