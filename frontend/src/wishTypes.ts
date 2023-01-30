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

export type WishId = number

export type WishState = {
  list: Wish[];
  error: string | undefined;
};
