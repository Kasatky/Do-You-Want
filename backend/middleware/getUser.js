const { User } = require('../db/models');

module.exports = async function getUser(req, res, next) {
  // если пользователь залогинен, то в хранилище сессии лежит его userId
  const isAuthorized = req.session && req.session.userId;

  if (!isAuthorized) {
    next();
    return;
  }

  try {
    const user = await User.findByPk(req.session.userId, {
      include: User.Roles,
    });

    // теперь если пользователь залогинен, то в он будет лежать в res.locals.user
    res.locals.user = user;
  } catch (error) {
    console.log(`Ошибка в middleware: ${error.message}`);
  }

  next();
};
