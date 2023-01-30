/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const roles = [{
      role: 'admin',
    },
    {
      role: 'user',
    }];
    await queryInterface.bulkInsert('Roles', roles.map((el) => ({
      role: el.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
