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

diaryRouter.post('/new', async (req, res) => {
  const { userId } = req.session;
  const { situation, emotion, mind, action } = req.body;

  try {
    const newNote = await DiaryEmotion.create({
      userId,
      situation,
      emotion,
      mind,
      action,
    });

    res.json(newNote);
  } catch (error) {
    console.log(`Ошибка при добавлении записи: ${error.message}`);
    res.status(500).json({ error: 'Ошибка при добавлении записи' });
  }
});

module.exports = diaryRouter;
