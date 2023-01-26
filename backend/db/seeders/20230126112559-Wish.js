/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const wish = [
      {
        wish: 'арбуз?',
        userId: 1,
        isPublic: true,
        isModeraited: false,
      },
      {
        wish: 'поцеловать кошку?',
        userId: 1,
        isPublic: true,
        isModeraited: false,
      },
      {
        wish: 'погулять в Таврическом саду?',
        userId: 1,
        isPublic: false,
        isModeraited: false,

      },
      {
        wish: 'попить чай?',
        userId: 1,
        isPublic: false,
        isModeraited: false,
      },
      {
        wish: 'сделать перерерыв?',
        userId: 1,
        isPublic: true,
        isModeraited: true,
      },
    ];

    await queryInterface.bulkInsert('Wishes', wish.map((el) => ({
      wish: el.wish,
      userId: el.userId,
      isPublic: el.isPublic,
      isModeraited: el.isModeraited,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Wishes', null, {});
  },
};
