const cabinetUserRouter = require('express').Router();
const { Wish, UsersWish } = require('../db/models');

cabinetUserRouter.get('/cabinetUser', async (req, res) => {
  const { userId } = req.session;
  try {
    const wishUserYes = await UsersWish.findAll({
      where: { userId },
      include: {
        model: Wish,
        attributes: ['wish'],
      },
    });
    res.json({ wish: wishUserYes[0].Wish.wish });
    // console.log(wishUserYes.__proto__); !!!!!!!! ТАК ДОСТАВАТЬ МЕТОДЫ МОДЕЛЕЙ
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = cabinetUserRouter;
