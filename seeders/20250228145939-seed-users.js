'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { genSalt, hash } = require('bcryptjs');
/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    const salt = await genSalt(10);
    const hashedPassword = await hash('defaultPass', salt);

    const users = [];
    for (let i = 1; i <= 50; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
      const phone = `01${Math.floor(Math.random() * 100000)}110`;
      const city = Math.floor(Math.random() * 20) + 1;
      const gender = Math.random() < 0.5 ? 0 : 1;
      const birthday = faker.date.birthdate();
      const userType = i>40 ? 4:i>20 ? 1: i > 10 ? 3 : 2;
      users.push({
        id: `user-${i}`,
        userType,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        city,
        gender,
        birthday,
        createdAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('user', users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user', null, {});
  },
};