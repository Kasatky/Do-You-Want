/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const diary = [
      {
        userId: 2,
        situation: 'Стою в пробке,опаздываю на работе',
        emotion: 'Злость,раздражение,чувство вины',
        mind: 'Сейчас начнется...шеф при всех обязательно сделает замечаниеб или шуточку в своем стиле...',
        action: 'Перестраиваюсь на автомобиле,сигналю всем',
      },
      {
        userId: 2,
        situation: 'Упал - разбил телефон',
        emotion: 'Обида,злость, сожаление',
        mind: 'Покупать новый телефон или починить этот',
        action: 'Начал выбирать новый телефон',
      },
      {
        userId: 2,
        situation: 'Сходил в театр',
        emotion: 'Удивлен, восхищение',
        mind: 'Почему не ходил раньше',
        action: 'Посмотре афину на ближайший месяц',
      },
      {
        userId: 2,
        situation: 'Закончил университет',
        emotion: 'Радость, неопределенность',
        mind: 'Рад,что закончил.',
        action: 'Начал искать рабоду по образованию',
      },
      {
        userId: 2,
        situation: 'Поточил ножи',
        emotion: 'Доволен собой',
        mind: 'Сказать жене',
        action: 'Сначала порезалась она, потом  я',
      },
      {
        userId: 2,
        situation: 'Купил новый автомобиль',
        emotion: 'Радость,удовлетвореение',
        mind: 'Нужна зимняя резина,затонировать, спилить три ветка пружин',
        action: 'Поехад к родственикам в другой город ',
      },

    ];

    await queryInterface.bulkInsert('DiaryEmotions', diary.map((el) => ({
      userId: el.userId,
      situation: el.situation,
      emotion: el.emotion,
      mind: el.mind,
      action: el.action,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('DiaryEmotions', null, {});
  },
};
