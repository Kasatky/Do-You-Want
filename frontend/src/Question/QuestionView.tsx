import * as React from 'react';
import { useEffect } from 'react';
import { Box, Paper, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';

import { addWishToUser, getRandomWish } from '../wishSlice';
import { Margin } from '@mui/icons-material';

export default function QuestionView() {
  const dispatch = useAppDispatch();
  const random = useSelector((state: RootState) => state.wish.random);

  useEffect(() => {
    if (!random) {
      dispatch(getRandomWish());
    }
  }, [dispatch, random]);

  const handleFalse = () => {
    dispatch(getRandomWish());
  };
  async function handleTrue() {
    dispatch(addWishToUser(random?.id));
    dispatch(getRandomWish());
  }

  // async function a () {
  //   dispatch(addWishToUser(random));
  // }

  return (
    <Box sx={{ height: '180px', userSelect: 'none' }}>
      <Paper>
        <Box component="h1" sx={{ userSelect: 'none' }}>
          {
            random && `Хочешь ${random.wish}`
            // то, что ниже можно добавить, когда будет реализовано, чтобы вопросы не повторялись
            // а если надо, чтобы они повторялись, то и строка ниже не нужна
            // : 'Вау! Вы перебрали все вопросы, совсем скоро появятся новые или можете добавить свои, нажав на кнопку "Добавить вопрос"'
          }
        </Box>
      </Paper>
      <Button variant="contained" onClick={handleTrue}>
        Да
      </Button>
      <Button
        variant="contained"
        onClick={handleFalse}
        sx={{ marginLeft: '10px' }}
      >
        Нет
      </Button>
    </Box>
  );
}
