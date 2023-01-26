export type UserId = number;

export type User = {
  id: UserId;
  email: string;
  userName: string;
  password: string;
};

export type UserState = {
  list: User[];
  error: string | undefined;
};
