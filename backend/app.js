/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const config = require('./config/config');
const authRouter = require('./routes/authRouter');
const cabinetAdminRouter = require('./routes/cabinetAdminRouter');

const app = express();
const { PORT } = process.env ?? 3000;

config(app);

app.use('/auth', authRouter);
app.use('/api', cabinetAdminRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app
  .listen(PORT)
  .on('listening', () => {
    console.log(`Сервер слушает порт:${PORT}`);
  })
  .on('error', (error) => {
    console.log(`Connecting error: ${error.message}`);
  });
