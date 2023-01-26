const authRouter = require('express').Router;
// const bcrypt = require('bcrypt');
const db = require('../db');

authRouter.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const userId = db.find((user) => user.email === email && user.password === password);
  if (userId) {
    delete userId.password;
    req.session.user = userId;
    return res.end();
  }
  return res.status(401).end;
});

authRouter.use((req, res, next) => {
  if (req.session.user) {
    return next();
  }
});

authRouter.get((req, res) => {
  res.json({
    email: req.session.email,
  });
});

module.exports = authRouter;
