const wishRouter = require('express').Router();
const { Op } = require('sequelize');
const { Wish, UsersWish } = require('../db/models');

const getAverageDoneTime = (createdDates, updatedDates) => {
  const updateTimes = updatedDates.map(
    (date) => date / (60 * 60 * 24 * 1000 * 30),
  );
  const createTimes = createdDates.map(
    (date) => date / (60 * 60 * 24 * 1000 * 30),
  );
  const days = updateTimes.map((date, i) => date - createTimes[i]);
  const commonDate = days.reduce((acc, cur) => acc + cur, 0) / days.length;
  return commonDate.toFixed(2);
};

wishRouter.get('/random', async (req, res) => {
  if (!req.session.userId) {
    res.status(403).json({ error: 'Вы не авторизованы!' });
    return;
  }

  const { userId } = req.session;

  let userWishes;
  try {
    userWishes = await UsersWish.findAll({ where: { userId, isDone: true } });
  } catch (error) {
    console.log(`Ошибка UsersWishes: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
    return;
  }

  const ids = userWishes.map((wish) => wish.wishId);

  let wishCount;

  try {
    wishCount = await Wish.count({
      where: {
        [Op.or]: [
          { isPublic: true }, { userId },
          // {
          //   [Op.and]: [{ isPublic: true }, { id: { [Op.in]: ids } }],
          // },
          // {
          //   [Op.and]: [{ userId }, { id: { [Op.in]: ids } }],
          // },
        ],
      },
    });
  } catch (error) {
    console.log(`Ошибка при поиске количества wish: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
    return;
  }

  try {
    const wish = await Wish.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ isPublic: true }, { isModerated: true }],
          },
          // { [Op.and]: [{ isPublic: true }, { id: { [Op.in]: ids } }] },
          {
            [Op.and]: [{ userId }, { id: { [Op.in]: ids } }],
          },
        ],
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
  const { userId } = req.session;
  const { wish, isPublic } = req.body;
  const isModerated = !isPublic;
  let newWish;
  try {
    newWish = await Wish.create({
      wish: wish[0].toLowerCase() + wish.slice(1),
      userId,
      isPublic,
      isModerated,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    newWish.save();
    let newUserWish;
    try {
      newUserWish = await UsersWish.create({
        wishId: newWish.id,
        userId,
        doneCount: 0,
        isDone: false,
      });

      newUserWish.save();
      try {
        const userWishWithName = await UsersWish.findByPk(newUserWish.id, {
          include: [
            {
              association: UsersWish.Wish,
              attributes: ['wish'],
            },
          ],
        });
        res.json({ loading: false, newUserWish: userWishWithName });
      } catch (error) {
        console.log(
          `Ошибка при обращении к БД (таблица UsersWishes): ${error.message}`,
        );
        res.status(500).json({ error: 'Не удалось получить данные из БД' });
      }
    } catch (error) {
      console.log(
        `Ошибка при обращении к БД (таблица UsersWishes): ${error.message}`,
      );
      res.status(500).json({ error: 'Не удалось получить данные из БД' });
      return;
    }
  } catch (error) {
    console.log(`Ошибка при добавлении вопроса: ${error.message}`);
    res.status(500).json({ error: 'Не удалось добавить новый вопрос' });
  }
});

wishRouter.get('/stat', async (req, res) => {
  const { userId } = req.session;

  let createdWishes;

  try {
    createdWishes = await Wish.findAll({ where: { userId } });
  } catch (error) {
    console.log(`Ошибка при обращении к БД (таблица Wishes): ${error.message}`);
    res.status(500).json({ error: 'Не удалось получить данные из БД' });
    return;
  }

  let allDoneWishes;

  try {
    allDoneWishes = await UsersWish.findAll({
      where: { userId, doneCount: { [Op.gt]: 0 } },
      order: [['doneCount', 'DESC']],
    });
  } catch (error) {
    console.log(
      `Ошибка при обращении к БД (таблица UsersWishes): ${error.message}`,
    );
    res.status(500).json({ error: 'Не удалось получить данные из БД' });
    return;
  }

  if (!allDoneWishes.length) {
    res.status(404);
    return;
  }

  let mostDoneWish;

  try {
    mostDoneWish = await Wish.findByPk(allDoneWishes[0].wishId);
  } catch (error) {
    console.log(`Ошибка при обращении к БД (таблица Wishes): ${error.message}`);
    res.status(500).json({ error: 'Не удалось получить данные из БД' });
    return;
  }

  const createdDates = allDoneWishes.map((date) => date.createdAt);
  const updatedDates = allDoneWishes.map((date) => date.updatedAt);

  const averageTime = getAverageDoneTime(createdDates, updatedDates);

  res.json({
    createdWishes: createdWishes.length,
    doneWishesCount: allDoneWishes.length,
    mostDoneWish: mostDoneWish.wish.slice(0, -1),
    averageTime,
  });
});

wishRouter.put('/complete', async (req, res) => {
  const { wishId } = req.body;
  const { user } = res.locals;
  try {
    const wishToComplete = await UsersWish.findByPk(wishId);
    if (wishToComplete.userId === user.id) {
      wishToComplete.doneCount += 1;
      wishToComplete.isDone = true;
      wishToComplete.updatedAt = new Date();
      wishToComplete.save();
    } else {
      res.status(500).json({ error: 'Доступ запрещён' });
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(
      `Ошибка при обращении к БД (таблица UsersWish): ${error.message}`,
    );
    res.status(500).json({ error: 'Не удалось получить данные из БД' });
  }
});

wishRouter.delete('/delete', async (req, res) => {
  const { wishId } = req.body;
  const { user } = res.locals;
  try {
    const wishToDelete = await UsersWish.findByPk(wishId);
    if (wishToDelete.userId === user.id) {
      wishToDelete.isDone = true;
      wishToDelete.save();
      res.sendStatus(200);
    } else {
      res.status(500).json({ error: 'Доступ запрещён' });
    }
  } catch (error) {
    console.log(
      `Ошибка при обращении к БД (таблица UsersWish): ${error.message}`,
    );
    res.status(500).json({ error: 'Не удалось получить данные из БД' });
  }
});

module.exports = wishRouter;
