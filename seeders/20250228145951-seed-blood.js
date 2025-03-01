// seed-blood-requests.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { randomUUID } =require('crypto');


module.exports = {
  async  up(queryInterface) {
  const bloodRequests = [];
  for (let i = 21; i <= 40; i++) {
    const patientId = `user-${i}`;
    const isRequest = Math.random() < 0.5;
    const bloodType = faker.helpers.arrayElements(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])[0];
    const city = Math.floor(Math.random() * 20) + 1;
    const date = faker.date.future(1);

    bloodRequests.push({
      id: randomUUID(),
      patientId,
      isRequest,
      bloodType,
      city,
      date,
    });
  }

  await queryInterface.bulkInsert('blood', bloodRequests, {});
},

async down(queryInterface) {
  
  await queryInterface.bulkDelete('blood', null, {});
}
}