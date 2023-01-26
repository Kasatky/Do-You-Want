/** @type {import('sequelize-cli').Migration} */
require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [{
      mail: process.env.DEMO_EMAIL,
      username: process.env.DEMO_USER,
      password: await bcrypt.hash(process.env.DEMO_PASSWORD, Number(process.env.SALT_ROUNDS)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
