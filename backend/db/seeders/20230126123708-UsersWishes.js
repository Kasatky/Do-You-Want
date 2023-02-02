/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const userswish = [
      {
        wishId: 1,
        userId: 1,
        doneCount: 1,
        isDone: true,
      },
      {
        wishId: 2,
        userId: 1,
        doneCount: 3,
        isDone: false,
      },
      {
        wishId: 3,
        userId: 1,
        doneCount: 5,
        isDone: true,
      },
      {
        wishId: 2,
        userId: 3,
        doneCount: 50,
        isDone: true,
      },
      {
        wishId: 4,
        userId: 3,
        doneCount: 8,
        isDone: false,
      },
      {
        wishId: 6,
        userId: 3,
        doneCount: 10,
        isDone: false,
      },
      {
        wishId: 7,
        userId: 3,
        doneCount: 10,
        isDone: true,
      },
      {
        wishId: 8,
        userId: 3,
        doneCount: 1,
        isDone: true,
      },
      {
        wishId: 14,
        userId: 3,
        doneCount: 0,
        isDone: false,
      },
    ];

    await queryInterface.bulkInsert(
      'UsersWishes',
      userswish.map((el) => ({
        wishId: el.wishId,
        userId: el.userId,
        doneCount: el.doneCount,
        isDone: el.isDone,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UsersWishes', null, {});
  },
};
