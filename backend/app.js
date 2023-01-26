/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
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


app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('/', (req, res) => res.json({ message: 'ok' }));
app.use('/api/auth', authRouter);

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
