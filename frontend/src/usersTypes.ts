export type UserId = number;

export type User = {
  id: UserId;
  email: string;
  userName: string;
  password: string;
};

export type UserState = {
  profile: User | undefined;
  error: string | undefined;
};
