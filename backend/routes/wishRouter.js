const wishRouter = require('express').Router();
const { Op } = require('sequelize');
const { Wish, UsersWish } = require('../db/models');

const getAverageDoneTime = (createdDates, updatedDates) => {
  // вычитаем из каждого updatedAt createdAt
  const dates = updatedDates.map((date, i) => date - createdDates[i]);
  // складываем все полученные разности
  const commonDate = dates.reduce((acc, cur) => acc + cur, 0);
  // время будет в милисекундах, переводим его в дни
  return Number((commonDate / dates.length / (60 * 60 * 24 * 1000)).toFixed(2));
};

wishRouter.get('/random', async (req, res) => {
  if (!req.session.userId) {
    res.status(403).json({ error: 'Вы не авторизованы!' });
    return;
  }

  const { userId } = req.session;

  let wishCount;

  try {
    wishCount = await Wish.count({
      where: { [Op.or]: [{ isPublic: true }, { userId }] },
    });
  } catch (error) {
    console.log(`Ошибка при поиске количества wish: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
    return;
  }

  try {
    const wish = await Wish.findOne({
      where: {
        [Op.or]: [{ isPublic: true }, { userId }],
      },
      limit: 1,
      offset: Math.floor(Math.random() * wishCount),
    });

    res.json({ wish });
  } catch (error) {
    console.log(`Ошибка при поиске wish: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

wishRouter.post('/new', async (req, res) => {
  let userId;
  if (req.session) {
    userId = req.session.userId;
  }
  const { wish, isPublic } = req.body;
  const isModerated = !isPublic;

  try {
    const newWish = await Wish.create({
      wish,
      userId,
      isPublic,
      isModerated,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    newWish.save();
    res.json({ loading: false });
  } catch (error) {
    console.log(`Ошибка при добавлении вопроса: ${error.message}`);
    res.status(500).json({ error: 'Не удалось добавить новый вопрос' });
  }
});

wishRouter.get('/stat', async (req, res) => {
  const { userId } = req.session;

  let allDoneWishes;

  try {
    allDoneWishes = await UsersWish.findAll({
      where: { userId, isDone: true },
      order: [['doneCount', 'DESC']],
    });
  } catch (error) {
    console.log(
      `Ошибка при обращении к БД (таблица UsersWishes): ${error.message}`,
    );
    res.status(500).json({ error: 'Не удалось получить данные из БД' });
  }

  let mostDoneWish;

  try {
    mostDoneWish = await Wish.findByPk(allDoneWishes[0].wishId);
  } catch (error) {
    console.log(`Ошибка при обращении к БД (таблица Wishes): ${error.message}`);
    res.status(500).json({ error: 'Не удалось получить данные из БД' });
  }

  const createdDates = allDoneWishes.map((date) => date.createdAt);
  const updatedDates = allDoneWishes.map((date) => date.updatedAt);

  const averageTime = getAverageDoneTime(createdDates, updatedDates);

  res.json({
    doneWishesCount: allDoneWishes.length,
    mostDoneWish: mostDoneWish.wish.slice(0, -1),
    averageTime,
  });
});

module.exports = wishRouter;
