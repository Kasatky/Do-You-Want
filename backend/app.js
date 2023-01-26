/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const db = require('./db/models');

const { PORT } = process.env;

const app = express();

const start = async () => {
  try {
    await db.sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Cервер слушает ${PORT} порт`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
