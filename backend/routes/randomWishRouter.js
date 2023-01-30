const randomWishRouter = require('express').Router();
const { Op } = require('sequelize');

const { Wish } = require('../db/models');

randomWishRouter.get('/wish', async (req, res) => {
  let wishCount;

  try {
    wishCount = await Wish.count({
      where: { [Op.or]: [{ isPublic: true }, { userId: req.session.userId }] },
      // where: { isPublic: true },
    });
  } catch (error) {
    console.log(`Ошибка сервера1: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера1' });
    return;
  }

  try {
    const wish = await Wish.findAll({
      where: {
        //   isPublic: true,
        [Op.or]: [{ isPublic: true }, { userId: req.session.userId }],
      },
      limit: 1,
      offset: Math.floor(Math.random() * wishCount),
      // limit: 1,
      // offset: 8,
    });

    res.json({ wishes: wish });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
    return;
  }
});

module.exports = randomWishRouter;
