// seed-medicines.js

import { randomUUID } from'crypto';
import { faker } from '@faker-js/faker'
module.exports = {
  async up(queryInterface) {
  const medicines = [];
  for (let i = 1; i <= 250; i++) {
    const diagnosisId = `diagnosis-${i}`;
    const medicineCount = Math.floor(Math.random() * 4) + 1;

    for (let j = 0; j < medicineCount; j++) {
      const name = faker.commerce.productName();
      const dosage = Math.floor(Math.random() * 3) + 1; 
      const duration = Math.floor(Math.random() * 30) + 7; 
      const description = faker.lorem.sentence();

      medicines.push({
        id: randomUUID(),
        diagnosisId,
        name,
        dosage,
        duration,
        description,
      });
    }
  }

  await queryInterface.bulkInsert('medicine', medicines, {});
},

async down(queryInterface) {
  await queryInterface.bulkDelete('medicine', null, {});
}
}