'use strict';

import { genSalt, hash }from 'bcryptjs';
import { cities } from './seeder-data/index';
import { faker } from '@faker-js/faker'
module.exports = {
  async up(queryInterface) {
    const salt = await genSalt(10);
    const hashedPassword = await hash('defaultPass', salt);

    const users = [];
    for (let i = 1; i <= 200; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
      const phone = `01${Math.floor(Math.random() * 100000)}110`;
      const city = faker.helpers.arrayElement(cities).name;
      const gender = Math.random() < 0.5 ? 0 : 1;
      const birthday = faker.date.birthdate();
      const userType = i>150 ? 4:i>100 ? 1: i > 50 ? 3 : 2;
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