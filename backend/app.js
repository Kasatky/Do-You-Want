/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const sessionConfig = require('./config/sessionConfig');
const authRouter = require('./routes/authRouter');
const getUser = require('./middleware/getUser');

const app = express();
const PORT = process.env.PORT ?? 3000;
const buildDir = path.join(__dirname, '../frontend/build');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(getUser);
app.use(express.json());
app.use(express.static(buildDir));

app.use('/api/auth', authRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app
  .listen(PORT)
  .on('listening', () => {
    console.log(`Server's listening port ${PORT}`);
  })
  .on('error', (error) => {
    console.log(`Connecting error: ${error.message}`);
  });
