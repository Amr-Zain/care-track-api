// seed-ratings.js
import { faker } from '@faker-js/faker'
module.exports = {
  async up(queryInterface) {
  const ratings = [];
  for (let i = 101; i <= 150; i++) {
    for (let j = 1; j <= 100; j++) {
      const patientId = `user-${i}`;
      const ratedId = `user-${j}`;
      const rating = faker.number.float({ min: 1, max: 5, fractionDigits: 5 }); 
      const comment = faker.lorem.sentence();

      ratings.push({
        patientId,
        ratedId,
        rating,
        comment,
      });
    }
  }
  await queryInterface.bulkInsert('rating', ratings, {});
},

async down(queryInterface) {
  await queryInterface.bulkDelete('rating', null, {});
}
}