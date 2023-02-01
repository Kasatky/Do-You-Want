import React, { useState } from 'react';
import { useEffect } from 'react';
import { Box, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { addWishToUser, getRandomWish } from '../wishSlice';

export default function QuestionView() {
  const [openError, setOpenError] = useState<string | undefined>('');
  const dispatch = useAppDispatch();
  const random = useSelector((state: RootState) => state.wish.random);
  const error = useSelector((state: RootState) => state.wish.error);
  console.log(error);

  useEffect(() => {
    if (!random) {
      dispatch(getRandomWish());
    }
  }, [dispatch, random]);

  const handleFalse = () => {
    dispatch(getRandomWish());
  };

  const handleTrue = () => {
    dispatch(addWishToUser(random?.id));
    dispatch(getRandomWish());
    setOpenError(error);
    setTimeout(() => {
      setOpenError('');
    }, 1000);
  };

  return (
    <Box sx={{ height: '180px', userSelect: 'none' }}>
      <Paper>
        <Box component="h1" sx={{ userSelect: 'none' }}>
          {random
            ? `Хочешь ${random.wish}`
            : 'Вау! Вы перебрали все вопросы, совсем скоро появятся новые или можете добавить свои, нажав на кнопку "Добавить вопрос"'}
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

      <div>{openError}</div>
    </Box>
  );
}
