// seed-clinic-schedule.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('@faker-js/faker');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { randomUUID } =require('crypto');

module.exports = {
  async up(queryInterface) {
  const clinicSchedules = [];
  for (let i = 1; i <= 20; i++) { 
    const clinicId = `clinic-${i}`;
    for (let day = 1; day <= 5; day++) { 
      const from = 9
      const to = 14
      clinicSchedules.push({
        clinicId,
        day,
        from,
        to,
      });
    }
  }

  await queryInterface.bulkInsert('clinic_schedule', clinicSchedules, {});
},

async down(queryInterface) {
  await queryInterface.bulkDelete('clinic_schedule', null, {});
}
}