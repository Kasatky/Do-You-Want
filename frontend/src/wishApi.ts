import { NewWish, UserWish, Wish, WishId } from './wishTypes';

export const requestUnmoderatedWishes = async (): Promise<Wish[]> => {
  const url = 'api/cabinetAdmin';
  const response = await fetch(url);
  const data = await response.json();
  return data.wishes;
};

export const requestDeleteWishes = async (id: WishId): Promise<WishId> => {
  await fetch('api/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({ id }),
  });
  return id;
};

export const requestChangeWish = async (arrayId: WishId[]) => {
  await fetch('api/isModeration', {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      arrayId,
    }),
  });
};
export const requestRandomWish = async (): Promise<Wish> => {
  const url = '/api/wishes/random';
  const response = await fetch(url);
  const data = await response.json();
  return data.wish;
};

export const requestNewWish = async (newWish: NewWish) => {
  const url = '/api/wishes/new';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newWish),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.loading;
};

export const requestUserWishes = async (): Promise<UserWish[]> => {
  const url = '/api/cabinetUser';
  const response = await fetch(url);
  const acceptedWishes = await response.json();
  return acceptedWishes;
};

export const requestAddWishToUser = async (id: any) => {
  const url = '/api/cabinetUser/addWishToUser';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  return data;
};

export const requestStat = async () => {
  const url = '/api/wishes/stat';
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const requestCompleteWish = async (wishId: WishId) => {
  const url = '/api/wishes/complete';
  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({ wishId }),
  });
};

export const requestDeleteWish = async (wishId: WishId) => {
  const url = '/api/wishes/delete';
  await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({ wishId }),
  });
};
