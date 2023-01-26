/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const db = require('./db/models');

const { PORT } = process.env || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('/', (req, res) => res.json({ message: 'ok' }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

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
