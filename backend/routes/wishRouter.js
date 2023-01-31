const wishRouter = require('express').Router();
const { Op } = require('sequelize');

const { Wish } = require('../db/models');

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
    return;
  } catch (error) {
    console.log(`Ошибка при добавлении вопроса: ${error.message}`);
    res.status(500).json({ error: 'Не удалось добавить новый вопрос' });
  }
});

module.exports = wishRouter;
