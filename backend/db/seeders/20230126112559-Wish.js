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
      {
        wish: 'послушать музыка?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'сходить в кино?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'покататься на лошади?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'купить воздушный шар?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'почитать книгу?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'сходить в зоопарк?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      }, {
        wish: 'понаблюдать за звездами?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'поиграть в шахматы?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'поиграть в компьютерные игры?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'позвонить родственникам?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'пробежать километр?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'выпить ванильный коктейль?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'потренероваться?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'пиццу?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'выучить JavaScript?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'сходить на каток?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'сходить в музей?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'покататься на роликах?',
        userId: 1,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'покататься на велосипеде?',
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
