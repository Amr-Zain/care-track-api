// seed-diagnoses.js

import { faker } from '@faker-js/faker'
module.exports = {
  async  up(queryInterface) {
  const diagnoses = [];
  for(let j=1;j<=5;j++){
    for (let i = 1; i <= 50; i++) {
        const patientId = `user-${(i+100)}`;
        const doctorId = `user-${i}`;
        const clinicId = `clinic-${i*2 - 1}`;
        const date = faker.date.past({ refDate: new Date()});
        const description = faker.lorem.sentence();
    
        diagnoses.push({
          id: `diagnosis-${(diagnoses.length)+1}`,
          patientId,
          doctorId,
          clinicId,
          date,
          description,
        });
      }

      }
  await queryInterface.bulkInsert('diagnosis', diagnoses, {});
},

async down(queryInterface) {
  await queryInterface.bulkDelete('diagnosis',  null, {});
}
}