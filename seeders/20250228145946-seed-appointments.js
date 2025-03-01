// seed-appointments.js


// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { randomUUID } =require('crypto');

module.exports = {
   async up(queryInterface) {
  const appointments = [];
  for (let i = 21; i <= 40; i++) {
    for(let j = 0;j<4;j++){
      const rand = Math.random();
      const patientId = `user-${i}`;
      const clinicId =  rand > 0.5 ?`clinic-${Math.floor(Math.random() * 20) + 1}`:null;
      const nurseId = rand < 0.5 ? `user-${Math.floor(Math.random() * 10) + 11}` : null;
      const date = faker.date.future(1);
      const bookedAt = faker.date.past(0.2, date);
  
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