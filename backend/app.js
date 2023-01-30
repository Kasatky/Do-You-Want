/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const serverConfig = require('./config/config');
const authRouter = require('./routes/authRouter');
const cabinetAdminRouter = require('./routes/cabinetAdminRouter');
const wishRouter = require('./routes/wishRouter');
const cabinetUserRouter = require('./routes/cabinetUserRouter');

const app = express();
serverConfig(app);
const PORT = process.env.PORT ?? 4000;
app.use('/api/wishes', wishRouter);
app.use('/api/auth', authRouter);
app.use('/api', cabinetAdminRouter);
app.use('/', cabinetUserRouter);

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
