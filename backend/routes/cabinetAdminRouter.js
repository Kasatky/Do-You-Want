/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const cabinetAdminRouter = require('express').Router();
const { Op } = require('sequelize');
const { Wish } = require('../db/models');

cabinetAdminRouter.get('/cabinetAdmin', async (req, res) => {
  try {
    const wishNoModeration = await Wish.findAll({
      where: {
        isPublic: true,
        [Op.or]: [{ isModerated: false }], // isModerated: false
      },
    });
    res.json({ wishes: wishNoModeration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cabinetAdminRouter.put('/isModeration', async (req, res) => {
  try {
    const { arrayId } = req.body;
    arrayId.map(async (el) => {
      const wishChangeStatus = await Wish.findOne({ where: { id: el } });
      wishChangeStatus.isModerated = true;
      wishChangeStatus.save();
    });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
});

cabinetAdminRouter.delete('/delete', async (req, res) => {
  try {
    const wishChangeStatus = await Wish.destroy({ where: { id: req.body.id } });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = cabinetAdminRouter;
