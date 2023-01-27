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

export type UserState = {
  isAuth: boolean;
  profile: UserLogin | UserRegister | undefined;
  error: string | undefined;
};
