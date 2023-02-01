const cabinetUserRouter = require('express').Router();
const { UsersWish } = require('../db/models');

// GET /api/cabinetUser
cabinetUserRouter.get('/', async (req, res) => {
  const { userId } = req.session;
  try {
    const addedWishes = await UsersWish.findAll({
      where: { userId, isDone: false },
      include: [{
        association: UsersWish.Wish,
        attributes: ['wish'],
      }],
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
  try {
    const doesUserWant = await UsersWish.findOne({
      where: {
        userId, wishId: id,
      },
    });
    if (doesUserWant === null) {
      try {
        const newUserWish = await UsersWish.create({
          wishId: id,
          userId,
          doneCount: 0,
          isDone: false,
        });
        const userWishWithName = await UsersWish.findByPk(newUserWish.id, {
          include: [{
            association: UsersWish.Wish,
            attributes: ['wish'],
          }],
        });
        res.json(userWishWithName);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(500).json({ error: 'вопрос уже есть' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = cabinetUserRouter;
