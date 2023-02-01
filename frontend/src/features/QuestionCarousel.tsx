import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App/App.css';
import { Box, Button, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Auth from '../Auth/Auth';

import '../index.css';

const wishMock = [
  { id: 1, wish: 'Хочу прогуляться?' },
  { id: 2, wish: 'Хочу нарисовать гору?' },
  { id: 3, wish: 'Хочу приготовить пирог?' },
  { id: 4, wish: 'Хочу сходить в кино?' },
  { id: 5, wish: 'Хочу  кофе?' },
];

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#d7e8e4',
  background:
    'linear-gradient(to bottom, #0181f5 0%, rgba(93, 178, 255, 0.99) 100%)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function QuestionCarousel(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(wishMock.length - 1);
  const [op, setOp] = useState(0.6);
  const currentIndexRef = useRef(currentIndex);
  const [open, setOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const childRefs: any = useMemo(
    () =>
      Array(wishMock.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, wishToDelete: string, index: number) => {
    updateCurrentIndex(index - 1);
    setOp((prevOp) => prevOp + 0.1);
    // console.log('swiped');
  };

  const outOfFrame = (wish: string, idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // console.log('outOfFrame');
  };

  const swipe = async (dir: any) => {
    if (canSwipe && currentIndex < wishMock.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="questionCarousel">
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
          <>
            {currentIndex > -1 && (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character.id}
                onSwipe={(dir: any) => swiped(dir, character.wish, index)}
                onCardLeftScreen={() => outOfFrame(character.wish, index)}
              >
                <Stack
                  key={character.id}
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
                      opacity: `${0.1 * index + op}`,
                      userSelect: 'none',
                      fontSize: '1.5em',
                      padding: '0.8em',
                    }}
                    key={character.id}
                  >
                    {character.wish}
                  </Item>
                </Stack>
              </TinderCard>
            )}
          </>
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
