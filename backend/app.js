/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const serverConfig = require('./config/config');
const authRouter = require('./routes/authRouter');
const cabinetAdminRouter = require('./routes/cabinetAdminRouter');
const randomWishRouter = require('./routes/randomWishRouter');

const app = express();
serverConfig(app);
const PORT = process.env.PORT ?? 4000;
app.use('/', randomWishRouter);
app.use('/api/auth', authRouter);
app.use('/api', cabinetAdminRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app
  .listen(PORT)
  .on('listening', () => {
    console.log(`Server's listening port ${PORT}`);
  })
  .on('error', (error) => {
    console.log(`Connecting error: ${error.message}`);
  });
