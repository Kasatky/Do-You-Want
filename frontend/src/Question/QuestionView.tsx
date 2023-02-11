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
    <Box sx={{ height: 'fit-content', userSelect: 'none', }}>
      <Paper sx={{ backgroundColor: '#ffffffba', borderRadius: '100px', }}>
        <Box
          component="p"
          sx={{
            fontSize: '2em',
            color: '#464b68',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'fit-content',
            backgroundColor: '#fff0',
            userSelect: 'none',
            textAlign: 'center',
          }}
        >
          {random
            ? `Хочешь ${random.wish}`
            : 'Вау! Вы перебрали все вопросы, совсем скоро появятся новые или можете добавить свои, нажав на кнопку "Добавить вопрос"'}
        </Box>
      </Paper>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: "0.5em" }}>
        <Button variant="contained" onClick={handleTrue}>
          Да
        </Button>
        <Button
          variant="contained"
          onClick={handleFalse}
          sx={{ marginLeft: '10em' }}
        >
          Нет
        </Button>
      </div>
    </Box>
  );
}
