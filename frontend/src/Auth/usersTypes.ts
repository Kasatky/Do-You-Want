export type UserId = number;

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  email: string;
  userName: string;
  password: string;
};

export type UserProfile = {
  email: string;
  userName: string;
};

export type UserState = {
  isAuth: boolean;
  profile: UserProfile | undefined;
  error: string | undefined;
};

export type AuthApiError = {
  error: string;
};

