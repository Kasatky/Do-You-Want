export type Wish = {
  id: number;
  wish: string;
  userId: number;
  isPublic: boolean;
  isModerated: boolean;
};

export type WishStat = {
  doneWishesCount: number;
  mostDoneWish: string;
  averageTime: number;
};

export type NewWish = {
  wish: string;
  isPublic: boolean;
};

export type WishId = number;

export type WishState = {
  list: Wish[];
  error: string | undefined;
  loading: boolean;
  random: Wish | undefined;
  stat: WishStat | undefined;
};
