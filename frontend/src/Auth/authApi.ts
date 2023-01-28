import {
  AuthApiError,
  UserLogin,
  UserProfile,
  UserRegister,
} from './usersTypes';

export const requestRegister = async (
  newUser: UserRegister,
): Promise<UserProfile> => {
  // newUser - объект с ключами email, userName, password
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as AuthApiError).error);
  }

  return data as UserProfile;
};

export const requestLogin = async (user: UserLogin): Promise<UserProfile> => {
  // user - объект с ключами email, password
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as AuthApiError).error);
  }

  return data as UserProfile;
};

export const requestLogout = async () => {
  const response = await fetch('/api/auth/logout', { method: 'DELETE' });

  if (!response.ok) {
    throw new Error('Ошибка');
  }
};

export const requestIsAuth = async () => {
  const response = await fetch('/api/auth/user');
  const data = await response.json();
  return data;
};
