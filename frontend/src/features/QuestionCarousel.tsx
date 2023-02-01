import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App/App.css';
import { Box, Button, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Auth from '../Auth/Auth';
import QuestionCard from './QuestionCard';

declare type Direction = 'left' | 'right' | 'up' | 'down';

const wishMock = [
  { id: 1, wish: 'Хочешь прогуляться?' },
  { id: 2, wish: 'Хочешь нарисовать гору?' },
  { id: 3, wish: 'Хочешь приготовить пирог?' },
  { id: 4, wish: 'Хочешь сходить в кино?' },
  { id: 5, wish: 'Хочешь кофе?' },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#d7e8e4',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function QuestionCarousel(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(wishMock.length - 1);
  const [opacity, setOpacity] = useState(0.6);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(35);
  const [fontSize, setFontSize] = useState(40);
  const [open, setOpen] = useState(false);
  const currentIndexRef = useRef(currentIndex);

  const handleOpen = () => setOpen(true);

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

  const swiped = (
    direction: Direction,
    wishToDelete: string,
    index: number,
  ) => {
    // Количество вызовов для последующих вопросов растёт (1 раз, 2 раза, 4 раза, 8 раз, 16 раз).
    // Чтобы игнорировать лишние вызовы, пока подаём предыдущее значение БЕЗ callback-функции.
    // FIXME найти и убрать причину лишних вызовов
    updateCurrentIndex(index - 1);
    setOpacity(opacity + 0.1);
    setTop(top + 10);
    setWidth(width + 3);
    setFontSize(fontSize + 1);
  };

  const outOfFrame = (wish: string, idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < wishMock.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
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
      <h1>Добрый вечер</h1>
      <Box
        className="cardContainer"
        sx={{
          height: '200px',
          position: 'relative',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        {wishMock.map((character, index) => (
          <TinderCard
            key={character.id}
            ref={childRefs[index]}
            className="swipe"
            onSwipe={(dir: Direction) => swiped(dir, character.wish, index)}
            onCardLeftScreen={(index) =>
              outOfFrame(character.wish, Number(index))
            }
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
              <Item
                sx={{
                  opacity: `${0.1 * index + opacity}`,
                  userSelect: 'none',
                  width: `${index * 3 + width}vw`,
                  fontSize: `${index + fontSize}px`,
                  transform: `translateY(${top}px)`,
                  transition: 'all .5s',
                  color: `rgba(0, 0, 0, ${0.1 * index + opacity})`,
                }}
              >
                {character.wish}
              </Item>
            </Stack>
          </TinderCard>
        ))}{' '}
        {currentIndex === -1 && (
          <>
            <Button onClick={handleOpen}>
              Если хотите еще вопросов войдите
            </Button>
            <Auth open={open} setOpen={setOpen} />
          </>
        )}
      </Box>

      <div className="buttons">
        <IconButton onClick={() => swipe('left')}>
          Нет
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => swipe('right')}>
          Да
          <CheckIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default QuestionCarousel;
