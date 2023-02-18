const cabinetAdminRouter = require('express').Router();
const { Op } = require('sequelize');
const { Wish } = require('../db/models');

cabinetAdminRouter.get('/cabinetAdmin', async (req, res) => {
  try {
    const { user } = res.locals;
    if (user.role === 1) {
      const wishNoModeration = await Wish.findAll({
        where: {
          isPublic: true,
          [Op.or]: [{ isModerated: false }], // isModerated: false
        },
      });
      res.json({ wishes: wishNoModeration });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cabinetAdminRouter.put('/isModeration', async (req, res) => {
  const { user } = res.locals;
  try {
    if (user.role === 1) {
      const { arrayId } = req.body;
      const promises = arrayId.map(async (id) => {
        const wishChangeStatus = await Wish.findByPk(id);
        wishChangeStatus.isModerated = true;
        wishChangeStatus.save();
      });
      await Promise.all(promises);
    }
    return res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

cabinetAdminRouter.delete('/delete', async (req, res) => {
  const { user } = res.locals;
  try {
    if (user.role === 1) {
      await Wish.destroy({ where: { id: req.body.id } });
      return res.sendStatus(200);
    }
    return res.sendStatus(500).json({ error: 'Доступ запрещён' });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = cabinetAdminRouter;
