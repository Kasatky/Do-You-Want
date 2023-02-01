import React, { useState, useMemo, useRef } from 'react';
import { Stack, Paper } from '@mui/material';
import TinderCard from 'react-tinder-card';
import { styled } from '@mui/material/styles';

type Char = {
  id: number;
  wish: string;
};

type Props = {
  character: Char;
  currentIndexRef: React.MutableRefObject<number>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  childRefs: any;
  index: number;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#d7e8e4',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function QuestionCard({
  character,
  currentIndexRef,
  setCurrentIndex,
  childRefs,
  index,
}: Props): JSX.Element {
  const [opacity, setOpacity] = useState(0.6);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(35);
  const [fontSize, setFontSize] = useState(40);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = (direction: string, wishToDelete: string, index: number) => {
    updateCurrentIndex(index - 1);
    setOpacity((prevOpacity) => prevOpacity + 0.1);
    setTop((prev) => prev + 10);
    setWidth((prev) => prev + 3);
    setFontSize((prev) => prev + 1);
    console.log(width);
  };

  const outOfFrame = (wish: string, idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };
  return (
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
            opacity: `${0.1 * index + opacity}`,
            userSelect: 'none',
            width: `${index * 3 + width}vw`,
            fontSize: `${index + fontSize}px`,
            transform: `translateY(${top}px)`,
            transition: 'all .5s',
            color: `rgba(0, 0, 0, ${0.1 * index + opacity})`,
          }}
          key={character.id}
        >
          {character.wish}
        </Item>
      </Stack>
    </TinderCard>
  );
}

export default QuestionCard;
