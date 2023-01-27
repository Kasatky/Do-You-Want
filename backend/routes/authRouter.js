const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

authRouter.get('/user', (req, res) => {
  const { user } = res.locals;

  if (!user) {
    res.status(401).json({ isAuth: false, error: 'Вы не авторизованы!' });
    return;
  }

  console.log(user);
  res.json({ isAuth: true });
});

authRouter.post('/login', async (req, res) => {
  // достаём почту и пароль пользователя
  const isEmail = Boolean(req.body.email.trim());
  const isPassword = Boolean(req.body.password.trim());

  // проверка, что пользователь ввёл и почту, и пароль
  if (!isEmail || !isPassword) {
    res.status(403).json({ error: 'Необходимо ввести email и пароль!' });
    return;
  }

  // создаём пользователя
  let user;

  // достаём его из БД по email
  try {
    user = await User.findOne({ where: { email: req.body.email } });
  } catch (error) {
    console.log(`Ошибка при авторизации: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
    return;
  }

  // если такого пользователя нет в БД, отправляем ошибку
  if (!user) {
    res.status(403).json({ error: 'Неверный email или пароль!' });
    return;
  }

  // достаём сырой и хэшированный пароли
  const rawPassword = req.body.password;
  const hashedPassword = user.password;
  let isSame;

  // сравниваем пароли
  try {
    isSame = await bcrypt.compare(rawPassword, hashedPassword);
  } catch (error) {
    console.log(`Ошибка при сравнении паролей: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
  }

  // если пароли не совпадают, отправляем ошибку
  if (!isSame) {
    res.status(403).json({ error: 'Неверный email или пароль!' });
    return;
  }

  // если всё хорошо, создаём сессию
  req.session.userId = user.id;

  console.log('auth/login', req.session);

  res.json({ success: 'Вход выполнен' });
});

module.exports = authRouter;
