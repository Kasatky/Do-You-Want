import { User, UserId } from './usersTypes';

export const requestRegister = async (newUser: User): Promise<{}> => {
  // я так понимаю, что newUser это будет объект с ключами email, userName, password
  const response = await fetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(newUser),
  });
  return { status: response.ok, data: newUser };
};

export const requestLogin = async (id: UserId) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
  return response.ok;
};
