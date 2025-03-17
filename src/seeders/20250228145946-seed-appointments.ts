// seed-appointments.js

import { faker } from '@faker-js/faker';
import { randomUUID } from'crypto';

module.exports = {
   async up(queryInterface) {
  const appointments = [];
  for (let i = 101; i <= 150; i++) {
    for(let j = 0;j<4;j++){
      const rand = Math.random();
      const patientId = `user-${i}`;
      const clinicId =  rand > 0.5 ?`clinic-${Math.floor(Math.random() * 100) + 1}`:null;
      const nurseId = rand < 0.5 ? `user-${Math.floor(Math.random() * 50) + 51}` : null;
      const date = faker.date.future({ refDate: new Date( )});
      const bookedAt = faker.date.past({ refDate:date});
  
      appointments.push({
        id: randomUUID(),
        patientId,
        clinicId,
        nurseId,
        date,
        bookedAt,
      });

    }
  }

  await queryInterface.bulkInsert('appointment', appointments, {});
},

async down(queryInterface) {
 
  await queryInterface.bulkDelete('appointment', null, {});
}
}