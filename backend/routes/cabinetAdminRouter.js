const cabinetAdminRouter = require('express').Router();
const { Wish } = require('../db/models');

cabinetAdminRouter.get('/cabinetAdmin', async (req, res) => {
  try {
    const wishNoModeration = await Wish.findAll({
      where: {
        isPublic: true,
        isModeraited: false,
      },
    });
    res.json({ wishes: wishNoModeration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = cabinetAdminRouter;
