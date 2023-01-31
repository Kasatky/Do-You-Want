import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getRandomWish } from '../wishSlice';

export default function QuestionView() {
  const arr = useSelector((state: RootState) => state.wish.list);

  let wish;
  if (arr && arr.length) {
    wish = arr[0].wish;
  }

  const dispatch = useAppDispatch();

  const handleFalse = () => {
    dispatch(getRandomWish());
  };
  const handleTrue = () => {
    dispatch(getRandomWish());
  };

  return (
    <Box sx={{ height: '180px' }}>
      <Paper sx={{ m: 1 }} elevation={4}>
        <Box component="h1" sx={{ width: 500, height: 50 }}>
          {wish
            ? `Хочешь ${wish}`
            : 'Вау! Вы перебрали все вопросы, совсем скоро появятся новые или можете добавить свои, нажав на кнопку "Добавить вопрос"'}
        </Box>
      </Paper>
      <button type="button" onClick={handleTrue}>
        Да
      </button>
      <button type="button" onClick={handleFalse}>
        Нет
      </button>
    </Box>
  );
}
