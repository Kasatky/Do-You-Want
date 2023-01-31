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

type WishWithName = Pick<Wish, "wish">;

export type UserWish = {
  id: number;
  wishId: number;
  wish: WishWithName;
  userId: number;
  doneCount: number;
  isDone: boolean;
};

export type WishState = {
  list: Wish[];
  addedWishes: UserWish[];
  error: string | undefined;
  loading: boolean;
  random: Wish | undefined;
};
