import { User } from './usersTypes';

export const requestRegister = async (newUser: User): Promise<Response> => {
  // newUser - объект с ключами email, userName, password
  const response = await fetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ newUser }),
  });

  return response;
};

export const requestLogin = async (user: User) => {
  // user - объект с ключами email, password
  const response = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ user }),
  });
  return response;
};
