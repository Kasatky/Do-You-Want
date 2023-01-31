const wishRouter = require('express').Router();
const { Op } = require('sequelize');

const { Wish } = require('../db/models');

wishRouter.get('/random', async (req, res) => {
  let wishCount;

  try {
    wishCount = await Wish.count({
      where: { [Op.or]: [{ isPublic: true }, { userId: req.session.userId }] },
    });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
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
    return;
  } catch (error) {
    console.log(`Ошибка при добавлении вопроса: ${error.message}`);
    res.status(500).json({ error: 'Не удалось добавить новый вопрос' });
  }
});

module.exports = wishRouter;
