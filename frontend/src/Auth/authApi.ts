import { UserLogin, UserRegister } from './usersTypes';

export const requestRegister = async (
  newUser: UserRegister,
): Promise<Response> => {
  // newUser - объект с ключами email, userName, password
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ newUser }),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export const requestLogin = async (user: UserLogin) => {
  // user - объект с ключами email, password
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return { response, data };
};

export const requestIsAuth = async () => {
  const response = await fetch('/api/auth/user');
  const data = await response.json();
  return data;
};
