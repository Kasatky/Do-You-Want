import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App/App.css';
import { Box, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const wishMock = [
  { wish: "Хочу прогуляться?" },
  { wish: "Хочу нарисовать гору?" },
  { wish: "Хочу приготовить пирог?" },
  { wish: "Хочу сходить в кино?" },
  { wish: "Хочу  кофе?" },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#d7e8e4",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function QuestionCarousel(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(wishMock.length - 1);
  const [op, setOp] = useState(0.6);
  const currentIndexRef = useRef(currentIndex);

  const childRefs: any = useMemo(
    () =>
      Array(wishMock.length)
        .fill(0)
        .map((i) => React.createRef()),
    [],
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, wishToDelete: string, index: number) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (wish: string, idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: any) => {
    if (canSwipe && currentIndex < wishMock.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
    setOp((prevOp) => prevOp + 0.1);
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>React Tinder Card</h1>
      <Box
        className="cardContainer"
        sx={{
          height: "200px",
          position: "relative",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {wishMock.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.wish}
            onSwipe={(dir: any) => swiped(dir, character.wish, index)}
            onCardLeftScreen={() => outOfFrame(character.wish, index)}
          >
            <Stack
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{
                top: `${index * 15}px`,
                position: 'relative',
              }}
              className="card"
            >
              <Item sx={{ opacity: `${0.1 * index + op}` }}>
                {character.wish}
              </Item>
            </Stack>
          </TinderCard>
        ))}
      </Box>
      <div className="buttons">
        <IconButton onClick={() => swipe('left')}>
          Да
          <CheckIcon />
        </IconButton>
        <IconButton onClick={() => swipe('right')}>
          Нет
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default QuestionCarousel;
