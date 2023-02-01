import * as React from 'react';
import { useEffect } from 'react';
import { Box, Paper, Button,Typography  } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';

import { addWishToUser, getRandomWish } from "../wishSlice";


export default function QuestionView() {
  const dispatch = useAppDispatch();
  const random = useSelector((state: RootState) => state.wish.random);

  const error = useSelector((state: RootState) => state.wish.error);

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
    <Box sx={{ height: "180px" }}>
      <Paper>
        <Box component="h1">
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
      <Button variant="contained" onClick={handleFalse}>
        Нет
      </Button>
    </Box>
  );
}
