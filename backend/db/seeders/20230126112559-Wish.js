/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const wish = [
      {
        wish: 'арбуз?',
        userId: 1,
      },
      {
        wish: 'поцеловать кошку?',
        userId: 1,
      },
      {
        wish: 'погулять в Таврическом саду?',
        userId: 1,

      },
      {
        wish: 'попить чай?',
        userId: 1,
      },
      {
        wish: 'сделать перерерыв?',
        userId: 1,
      },
    ];

    await queryInterface.bulkInsert('Wishes', wish.map((el) => ({
      wish: el.wish,
      userId: el.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Wishes', null, {});
  },
};
