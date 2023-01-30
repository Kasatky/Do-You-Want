const express = require('express');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const sessionConfig = require('./sessionConfig');
const getUser = require('../middleware/getUser');

const serverConfig = (app) => {
  app.use(logger('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(session(sessionConfig));
  app.use(getUser);
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
};

module.exports = serverConfig;
