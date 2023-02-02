import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import '../App/App.css';
import { Box, Button, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Auth from '../Auth/Auth';
import { url } from 'inspector';

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
  const [open, setOpen] = useState(true);
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <>
        <link
          href="https://fonts.googleapis.com/css?family=Damion&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
          rel="stylesheet"
        />
        <h2 id='carouselFont'>Более 300 вопросов будут доступны после регистрации, на любые темы, с возможность добавления своих</h2>
        <Box
          onClick={() => setOpen(false)}
          className="cardContainer"
          sx={{
            width: '600px',
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
                  top: `${index * 20}px`,
                  position: 'relative',
                }}
                className="card"
              >
                <Item
                  sx={{
                    padding: '0.3em',
                    borderRadius: '30px',
                    opacity: `${0.1 * index + opacity}`,
                    userSelect: 'none',
                    width: `${index * 2.5 + width}vw`,
                    fontSize: '1.5em',
                    transform: `translateY(${top}px)`,
                    transition: 'all .5s',
                    color: `#0313c8 ${0.1 * index + opacity})`,
                  }}
                >
                  {character.wish}
                </Item>
              </Stack>
            </TinderCard>
          ))}{' '}
          {currentIndex === -1 && (
            <>
              <Auth open={open} setOpen={setOpen} />
              <h2>Авторизуйтесь чтобы продолжить</h2>
            </>
          )}
        </Box>

        {currentIndex > -1 && (
          <Box className="buttons">
            <IconButton onClick={() => swipe('left')}>
              Нет
              <ClearIcon />
            </IconButton>
            <IconButton onClick={() => swipe('right')}>
              Да
              <CheckIcon />
            </IconButton>
          </Box>)}
      </>
    </Box >
  );
}

export default QuestionCarousel;
