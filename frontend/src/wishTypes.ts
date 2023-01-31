export type Wish = {
  id: number;
  wish: string;
  userId: number;
  isPublic: boolean;
  isModerated: boolean;
};

export type NewWish = {
  wish: string;
  isPublic: boolean;
};

export type WishId = number;

export type UserWish = {
  Wish: { wish: string };
  id: number;
  wishId: string;
  userId: string;
  doneCount: number;
  isDone: boolean;
};

export type WishState = {
  list: Wish[];
  addedWishes: UserWish[];
  error: string | undefined;
  random: Wish | undefined;
};
