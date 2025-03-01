// seed-doctor-nurse.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

module.exports = { 
  async  up(queryInterface) {
  const doctorNurses = [];
  for (let i = 1; i <= 10; i++) {
    const userId = `user-${i}`; 
    const specializationId = Math.floor(Math.random() * 30) + 1; 
    const fees = faker.finance.amount(100, 600, 2); 
    const description = faker.lorem.sentence(); 
    const appointmentTime = Math.floor(Math.random() * 60) + 15; 
    const location = faker.location.streetAddress(); 

    doctorNurses.push({
      userId,
      specializationId,
      fees,
      description,
      appointmentTime,
      location,
    });
  }
  for (let i = 11; i <= 20; i++) {
    const userId = `user-${i}`;
    const fees = faker.finance.amount(50, 200, 2);
    const description = faker.lorem.sentence(); 
    const appointmentTime = Math.floor(Math.random() * 60) + 15; 
    const location = faker.address.streetAddress();

    doctorNurses.push({
      userId,
      fees,
      description,
      appointmentTime,
      location,
    });
  }
  await queryInterface.bulkInsert('doctor_nurse', doctorNurses, {});
},

 async down(queryInterface) {
  await queryInterface.bulkDelete('doctor_nurse', null, {});
}
}