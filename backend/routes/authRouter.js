const authRouter = require('express').Router();
// const bcrypt = require('bcrypt');
// const db = require('../db');

authRouter.post('/login', (req, res) => {
  console.log('req.body', req.body);
  res.json(req.body);
});

// authRouter.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   const user = db.find((u) => u.email === email && u.password === password);
//   if (user) {
//     req.session.userId = user.id;
//     return res.json({ name: user.name });
//   }
//   return res.status(401).json({ error: 'Ошибка логина' });
// });

// authRouter.use((req, res, next) => {
//   if (req.session.user) {
//     return next();
//   }
// });

// authRouter.get((req, res) => {
//   res.json({
//     email: req.session.email,
//   });
// });

module.exports = authRouter;
