// seed-ratings.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');


module.exports = {
  async up(queryInterface) {
  const ratings = [];
  for (let i = 21; i <= 40; i++) {
    for (let j = 1; j <= 20; j++) {
      const patientId = `user-${i}`;
      const ratedId = `user-${j}`;
      const rating = faker.number.float({ min: 1, max: 5, precision: 0.5 }); 
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