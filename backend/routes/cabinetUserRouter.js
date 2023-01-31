const cabinetUserRouter = require('express').Router();
const { Wish, UsersWish } = require('../db/models');

cabinetUserRouter.get('/', async (req, res) => {
  const { userId } = req.session;
  try {
    const wishUserYes = await UsersWish.findAll({
      where: { userId },
      include: {
        model: Wish,
        attributes: ['wish'],
      },
    });
    res.json({ wish: wishUserYes });
    // console.log(wishUserYes.__proto__); !!!!!!!! ТАК ДОСТАВАТЬ МЕТОДЫ МОДЕЛЕЙ
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cabinetUserRouter.put('/addWishToUser', async (req, res) => {
  const { userId } = req.session;
  const { id } = req.body;
  try {
    const newUserWish = await UsersWish.create({
      wishId: id,
      userId,
      doneCount: 0,
      isDone: false,
    });
    res.json(newUserWish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = cabinetUserRouter;
