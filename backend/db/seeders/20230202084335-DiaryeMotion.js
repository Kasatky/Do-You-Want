/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const diary = [
      {
        userId: 3,
        situation: 'Стою в пробке, опаздываю на работу',
        emotion: 'Злость, раздражение, чувство вины',
        mind: 'Сейчас начнётся... Шеф при всех обязательно сделает замечание или шуточку в своём стиле...',
        action: 'Перестраиваюсь на автомобиле, сигналю всем',
      },
      {
        userId: 3,
        situation: 'Упал - разбил телефон',
        emotion: 'Обида, злость, сожаление',
        mind: 'Покупать новый телефон или починить этот',
        action: 'Начал выбирать новый телефон',
      },
      {
        userId: 3,
        situation: 'Сходил в театр',
        emotion: 'Удивлен, восхищение',
        mind: 'Почему не ходил раньше',
        action: 'Посмотрел афишу на ближайший месяц',
      },
      {
        userId: 3,
        situation: 'Закончил университет',
        emotion: 'Радость, неопределённость',
        mind: 'Рад, что закончил',
        action: 'Начал искать работу по специальности',
      },
      {
        userId: 3,
        situation: 'Поточил ножи',
        emotion: 'Доволен собой',
        mind: 'Сказать жене',
        action: 'Сначала порезалась она, потом я',
      },
      {
        userId: 3,
        situation: 'Купил новый автомобиль',
        emotion: 'Радость, удовлетворение',
        mind: 'Нужна зимняя резина, затонировать, спилить три витка пружин',
        action: 'Поехал к родственникам в другой город ',
      },
      {
        userId: 3,
        situation: 'Посадил дерево',
        emotion: 'Радость, удовлетворение',
        mind: 'Надо ухаживать',
        action: 'Полил дерево',
      },
      {
        userId: 3,
        situation: 'Съел офигенно вкусную шаву',
        emotion: 'Удовлетворение, счастье, спокойствие',
        mind: 'Было вкусно, надо будет как-нибудь купить ещё',
        action: 'Пошёл довольный спать',
      },
    ];

    await queryInterface.bulkInsert(
      'DiaryEmotions',
      diary.map((el) => ({
        userId: el.userId,
        situation: el.situation,
        emotion: el.emotion,
        mind: el.mind,
        action: el.action,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('DiaryEmotions', null, {});
  },
};
