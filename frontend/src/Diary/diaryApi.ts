import { DiaryNote } from './diaryTypes';

export const requestDiary = async (): Promise<DiaryNote[]> => {
  const url = '/api/diary';
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error('Ошибка');

  return data;
};

export const requestNewNote = async (
  newNote: DiaryNote,
): Promise<DiaryNote> => {
  const url = 'api/diary/new';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNote),
  });
  const data = await response.json();

  if (!response.ok) throw new Error('Ошибка');

  return data;
};
