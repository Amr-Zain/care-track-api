// seed-blood-requests.js

import { randomUUID } from'crypto';
import { cities } from './seeder-data/index';
import { faker } from '@faker-js/faker'
module.exports = {
  async  up(queryInterface) {
  const bloodRequests = [];
  for (let i = 101; i <= 150; i++) {
    const patientId = `user-${i}`;
    const isRequest = Math.random() < 0.5;
    const bloodType = faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
    const city = faker.helpers.arrayElement(cities).name; 
    const date = faker.date.future({ refDate: new Date() });

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