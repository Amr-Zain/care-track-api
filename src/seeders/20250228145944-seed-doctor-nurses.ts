// seed-doctor-nurse.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { specializations } from './seeder-data/index';
import { faker } from '@faker-js/faker'
module.exports = { 
  async  up(queryInterface) {
  const doctorNurses = [];
  for (let i = 1; i <= 50; i++) {
    const userId = `user-${i}`; 
    const fees = faker.finance.amount({min:100, max:600, dec:2}); 
    const description = faker.lorem.sentence(); 
    const appointmentTime = 30; 
    const location = faker.location.streetAddress(); 
    const specialization = faker.helpers.arrayElement(specializations).name;

    doctorNurses.push({
      userId,
      specialization,
      fees,
      description,
      appointmentTime,
      location,
    });
  }
  for (let i = 51; i <= 100; i++) {
    const userId = `user-${i}`;
    const fees = faker.finance.amount({min:50, max:200, dec:2});
    const description = faker.lorem.sentence(); 
    const appointmentTime = 30; 
    const location = faker.location.streetAddress();

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