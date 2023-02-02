/** @type {import('sequelize-cli').Migration} */
require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const users = [{
      email: process.env.DEMO_EMAIL,
      userName: process.env.DEMO_USER,
      password: await bcrypt.hash(process.env.DEMO_PASSWORD, Number(process.env.SALT_ROUNDS)),
    },
    {
      email: 'farit@mail.ru',
      userName: 'Farit',
      password: await bcrypt.hash('123456', Number(process.env.SALT_ROUNDS)),
    }];

    await queryInterface.bulkInsert('Users', users.map((el) => ({
      email: el.email,
      userName: el.userName,
      password: el.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
