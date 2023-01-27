const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

// функция для шифрования почты
const maskEmail = (email) => {
  const splitted = email.split('@');
  let part1 = splitted[0];
  const avg = part1.length / 2;
  part1 = part1.substring(0, part1.length - avg);
  const part2 = splitted[1];
  return `${part1}***@${part2}`;
};

authRouter.get('/user', (req, res) => {
  const { user } = res.locals;

  if (!user) {
    res.status(401).json({ isAuth: false, error: 'Вы не авторизованы!' });
    return;
  }

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

  res.json({
    email: maskEmail(user.email),
    userName: user.userName,
  });
});

authRouter.post('/register', async (req, res) => {
  // проверка на длину имени
  console.log(req.body);
  if (req.body.userName.trim().length < 3) {
    res.status(403).json({ error: 'Имя должно содержать минимум 3 символа!' });
    return;
  }

  // проверка на формат ввода почты
  if (!req.body.email.includes('@')) {
    res
      .status(403)
      .json({ error: 'Неверный формат: email должен содержать символ @!' });
    return;
  }

  const rawPassword = req.body.password.trim();

  // проверка на длину пароля
  if (rawPassword.length < 5) {
    res.status(403).json({
      error: 'Пароль должен содержать минимум 5 символов без пробелов!',
    });
    return;
  }

  let isEmailRepeat;

  // проверка на уникальность почты
  try {
    isEmailRepeat = await User.findOne({ where: { email: req.body.email } });
  } catch (error) {
    console.log(`Ошибка при регистрации: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
    return;
  }

  if (isEmailRepeat) {
    res.status(403).json({
      error: 'Пользователь с такой почтой уже существует!',
    });
    return;
  }

  let hashedPassword;

  // хэширование пароля
  try {
    hashedPassword = await bcrypt.hash(
      rawPassword,
      Number(process.env.SALT_ROUNDS) || 11,
    );
  } catch (error) {
    console.log(`Ошибка при создании пароля: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
    return;
  }

  console.log(hashedPassword);
  // наконец-то создаём нового пользователя
  try {
    const user = await User.create({
      email: req.body.email,
      userName: req.body.userName,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    user.save();

    // создаём сессию
    req.session.userId = user.id;

    res.json({ email: maskEmail(user.email), userName: user.userName });
  } catch (error) {
    console.log(`Ошибка при создании пользователя: ${error.message}`);
    res.status(500).json({ error: 'Не удалось зарегистрироваться' });
  }
});

authRouter.delete('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.end();
});

module.exports = authRouter;
