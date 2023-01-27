export type UserId = number;

export type UserLogin = {
  // id: UserId | undefined;
  email: string;
  password: string;
};

export type UserRegister = {
  email: string;
  userName: string;
  password: string;
};

export type UserState = {
  profile: UserLogin | UserRegister | undefined;
  error: string | undefined;
};
