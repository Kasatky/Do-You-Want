import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getRandomWish } from '../wishSlice';
import { Wish } from '../wishTypes';

export default function QuestionView() {
  // const [checked, setChecked] = useState(true);
  const [wishObj] = useSelector((state: RootState) => state.wish.list);

  let wish;
  if (wishObj) {
    wish = wishObj.wish;
  }

  console.log(wish);

  const dispatch = useAppDispatch();

  const handleFalse = () => {
    // setChecked(false);
    dispatch(getRandomWish());
  };
  const handleTrue = () => {
    // setChecked(false);
    dispatch(getRandomWish());
  };
  // const icon = (
  //   <Paper sx={{ m: 1 }} elevation={4}>
  //     <Typography>
  //       {wish
  //         ? wish
  //         : 'Вау! Вы перебрали все вопросы, совсем скоро появятся новые или можете добавить свои, нажав на кнопку "Добавить вопрос"'}
  //     </Typography>
  //     <Box component="svg" sx={{ width: 500, height: 200 }}></Box>
  //   </Paper>
  // );

  return (
    <Box sx={{ height: 180 }}>
      <div>{wish}</div>
      <button type="button" onClick={handleTrue}>
        Yes
      </button>
      <button type="button" onClick={handleFalse}>
        No
      </button>
      {/* <Box sx={{ display: 'flex' }}>
        <Zoom in={checked}>{icon}</Zoom>
      </Box> */}
    </Box>
  );
}
