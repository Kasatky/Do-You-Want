/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const wish = [
      {
        wish: 'арбуз?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'поцеловать кошку?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'погулять в Таврическом саду?',
        userId: 1,
        isPublic: false,
        isModerated: false,

      },
      {
        wish: 'попить чай?',
        userId: 1,
        isPublic: false,
        isModerated: false,
      },
      {
        wish: 'сделать перерерыв?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'скушать булку?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'погулять?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
    ];

    await queryInterface.bulkInsert('Wishes', wish.map((el) => ({
      wish: el.wish,
      userId: el.userId,
      isPublic: el.isPublic,
      isModerated: el.isModerated,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Wishes', null, {});
  },
};
