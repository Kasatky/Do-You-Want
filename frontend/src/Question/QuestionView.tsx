import React from 'react';
import { useEffect } from 'react';
import { Box, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { addWishToUser, getRandomWish } from '../wishSlice';

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

  const handleTrue = () => {
    dispatch(addWishToUser(random?.id));
    dispatch(getRandomWish());
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

      {random && (
        <>
          <Button
            variant="contained"
            onClick={handleTrue}
            sx={{
              background:
                'linear-gradient(to bottom, #0181f5 0%, rgba(93, 178, 255, 0.99) 100%)',
            }}
          >
            Да
          </Button>
          <Button
            variant="contained"
            onClick={handleFalse}
            sx={{
              marginLeft: '10px',
              background:
                'linear-gradient(to bottom, #0181f5 0%, rgba(93, 178, 255, 0.99) 100%)',
            }}
          >
            Нет
          </Button>
        </>
      )}
    </Box>
  );
}
