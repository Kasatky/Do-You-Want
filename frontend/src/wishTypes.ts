export type Wish = {
  id: number;
  wish: string;
  userId: number;
  isPublic: boolean;
  isModerated: boolean;
};

export type WishStat = {
  createdWishes: number;
  doneWishesCount: number;
  mostDoneWish: string;
  averageTime: number;
};

export type NewWish = {
  wish: string;
  isPublic: boolean;
};

export type WishId = number;

type WishWithName = Pick<Wish, 'wish'>;

export type UserWish = {
  id: WishId;
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
  stat: WishStat | undefined;
};
