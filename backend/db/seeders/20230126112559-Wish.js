/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const wish = [
      {
        wish: 'арбуз?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'поцеловать кошку?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'погулять в Таврическом саду?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'попить чай?',
        userId: 1,
        isPublic: true,
        isModerated: true,
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
        isModerated: true,
      },
      {
        wish: 'погулять?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'послушать музыку?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'сходить в кино?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'покататься на лошади?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'купить воздушный шар?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'почитать книгу?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'сходить в зоопарк?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'понаблюдать за звёздами?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'поиграть в шахматы?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'поиграть в компьютерные игры?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'позвонить родственникам?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'пробежать километр?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'выпить ванильный коктейль?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'потренироваться?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'пиццу?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'выучить JavaScript?',
        userId: 1,
        isPublic: false,
        isModerated: true,
      },
      {
        wish: 'сходить на каток?',
        userId: 1,
        isPublic: false,
        isModerated: true,
      },
      {
        wish: 'сходить в музей?',
        userId: 1,
        isPublic: false,
        isModerated: true,
      },
      {
        wish: 'покататься на роликах?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'покататься на велосипеде?',
        userId: 1,
        isPublic: true,
        isModerated: true,
      },
      {
        wish: 'погулять с собакой?',
        userId: 2,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'кофе?',
        userId: 2,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'посмотреть сериал?',
        userId: 2,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'покататься на самокате?',
        userId: 2,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'шашлык?',
        userId: 2,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'порисовать?',
        userId: 3,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'посмотреть аниме?',
        userId: 3,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'посмотреть в окно?',
        userId: 3,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'засеять таблицу?',
        userId: 3,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'пофиксить баги?',
        userId: 3,
        isPublic: true,
        isModerated: false,
      },
      {
        wish: 'вкусно поесть в кафе?',
        userId: 3,
        isPublic: true,
        isModerated: false,
      },
    ];

    await queryInterface.bulkInsert(
      'Wishes',
      wish.map((el) => ({
        wish: el.wish,
        userId: el.userId,
        isPublic: el.isPublic,
        isModerated: el.isModerated,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Wishes', null, {});
  },
};
