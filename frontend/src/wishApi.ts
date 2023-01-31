import { NewWish, Wish, WishId } from './wishTypes';

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

export const requestRandomdWish = async (): Promise<Wish[]> => {
  const url = '/api/wishes/random';
  const response = await fetch(url);
  const data = await response.json();
  return data.wishes;
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
