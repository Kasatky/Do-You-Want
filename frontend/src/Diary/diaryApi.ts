import { DiaryNote } from './diaryTypes';

export const requestDiary = async (): Promise<DiaryNote[]> => {
  const url = '/api/diary';
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error('Ошибка');

  return data;
};
