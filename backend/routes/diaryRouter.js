const diaryRouter = require('express').Router();
const { DiaryEmotion } = require('../db/models');

diaryRouter.get('/', async (req, res) => {
  const { userId } = req.session;

  try {
    const diaryNotes = await DiaryEmotion.findAll({ where: { userId } });

    res.json(diaryNotes);
  } catch (error) {
    console.log(`Ошибка дневника: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = diaryRouter;
