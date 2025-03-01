// seed-diagnoses.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

module.exports = {
  async  up(queryInterface) {
  const diagnoses = [];
    for (let i = 1; i <= 10; i++) {
      for(let j=1;j<=5;j++){
        const patientId = `user-${(i+20)}`;
        const doctorId = `user-${i}`;
        const clinicId = `clinic-${i*2 - 1}`;
        const date = faker.date.past(1);
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