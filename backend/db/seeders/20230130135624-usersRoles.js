/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const roles = [{
      userId: 1,
      roleId: 1,
    },
    {
      userId: 2,
      roleId: 2,
    }];

    await queryInterface.bulkInsert('UsersRoles', roles.map((el) => ({
      userId: el.userId,
      roleId: el.roleId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UsersRoles', null, {});
  },
};
