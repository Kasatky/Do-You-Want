import { NewWish, Wish } from './wishTypes';

export const requestUnmoderatedWishes = async (): Promise<Wish[]> => {
  const url = 'api/cabinetAdmin';
  const response = await fetch(url);
  const data = await response.json();
  return data.wishes;
};

export const requestRandomdWish = async (): Promise<Wish[]> => {
  const url = '/api/wishes/random';
  const response = await fetch(url);
  const data = await response.json();
  return data.wishes;
};

export const requestNewWish = async (newWish: NewWish) => {
  const url = '/api/wishes/new';
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newWish),
  });
};
