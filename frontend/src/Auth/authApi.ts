import { UserLogin, UserRegister } from './usersTypes';

export const requestRegister = async (
  newUser: UserRegister,
): Promise<Response> => {
  // newUser - объект с ключами email, userName, password
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ newUser }),
  });

  return response;
};

// +
export const requestLogin = async (user: UserLogin) => {
  // user - объект с ключами email, password
  // console.log('user in authApi: ', user);
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return response;
};
