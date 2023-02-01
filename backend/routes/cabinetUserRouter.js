const cabinetUserRouter = require('express').Router();
const { UsersWish } = require('../db/models');

// GET /api/cabinetUser
cabinetUserRouter.get('/', async (req, res) => {
  const { userId } = req.session;
  try {
    const addedWishes = await UsersWish.findAll({
      where: { userId, isDone: false },
      include: [
        {
          association: UsersWish.Wish,
          attributes: ['wish'],
        },
      ],
    });
    res.json(addedWishes);
    // console.log(wishUserYes.__proto__); !!!!!!!! ТАК ДОСТАВАТЬ МЕТОДЫ МОДЕЛЕЙ
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cabinetUserRouter.post('/addWishToUser', async (req, res) => {
  const { userId } = req.session;
  const { id } = req.body;

  let doesUserWant;
  try {
    doesUserWant = await UsersWish.findOne({
      where: {
        userId,
        wishId: id,
      },
    });
  } catch (error) {
    console.log(
      `Ошибка при обращении к БД (таблица UsersWishes): ${error.message}`,
    );
    res.status(500).json({ error: 'Не удалось получить данные из БД' });
    return;
  }

  let newUserWish;
  if (doesUserWant === null) {
    try {
      newUserWish = await UsersWish.create({
        wishId: id,
        userId,
        doneCount: 0,
        isDone: false,
      });
    } catch (error) {
      console.log(
        `Ошибка при обращении к БД (таблица UsersWishes): ${error.message}`,
      );
      res.status(500).json({ error: 'Не удалось получить данные из БД' });
      return;
    }

    try {
      const userWishWithName = await UsersWish.findByPk(newUserWish.id, {
        include: [
          {
            association: UsersWish.Wish,
            attributes: ['wish'],
          },
        ],
      });

      res.json(userWishWithName);
    } catch (error) {
      console.log(
        `Ошибка при обращении к БД (таблица UsersWishes): ${error.message}`,
      );
      res.status(500).json({ error: 'Не удалось получить данные из БД' });
    }
  } else if (doesUserWant.isDone) {
    doesUserWant.isDone = false;
    doesUserWant.save();

    try {
      const userWishWithName = await UsersWish.findByPk(doesUserWant.id, {
        include: [
          {
            association: UsersWish.Wish,
            attributes: ['wish'],
          },
        ],
      });

      res.json(userWishWithName);
    } catch (error) {
      console.log(
        `Ошибка при обращении к БД (таблица UsersWishes): ${error.message}`,
      );
      res.status(500).json({ error: 'Не удалось получить данные из БД' });
    }
  } else {
    res.status(500).json({ error: 'В вашем списке уже есть такое желание' });
  }
});

module.exports = cabinetUserRouter;
