const { User } = require('../db/models');

module.exports = async function getUser(req, res, next) {
  // если пользователь залогинен, то в хранилище сессии лежит его userId
  let userId;
  if (req.session) {
    userId = req.session.userId;
  }

  let user;

  try {
    user = userId && (await User.findByPk(userId));
  } catch (error) {
    console.log(`Ошибка в middleware: ${error.message}`);
  }

  // теперь если пользователь залогинен, то в он будет лежать в req.user
  res.locals.user = user;

  next();
};
