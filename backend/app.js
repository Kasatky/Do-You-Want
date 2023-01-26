/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const sessionConfig = require('./config/sessionConfig');
const authRouter = require('./routes/authRouter');

const app = express();
const { PORT } = process.env ?? 3000;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

app.use('/api/auth', authRouter);

app
  .listen(PORT)
  .on('listening', () => {
    console.log(`Server's listening port ${PORT}`);
  })
  .on('error', (error) => {
    console.log(`Connecting error: ${error.message}`);
  });
