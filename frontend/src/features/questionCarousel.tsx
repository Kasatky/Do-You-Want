import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App/App.css';
const db = [
  { wish: 'Хочу прогуляться?' },
  { wish: 'Хочу нарисовать гору?' },
  { wish: 'Хочу приготовить пирог?' },
  { wish: 'Хочу сходить в кино?' },
  { wish: 'Хочу  кофе?' },
];

function QuestionCarousel(): JSX.Element {
  useEffect(() => {
    fetch('/api/');
  });

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState<string>();
  const currentIndexRef = useRef(currentIndex);

  const childRefs: any = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, wishToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (wish: string, idx: number) => {
    console.log(`${wish} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: any) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
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
      <div className="cardContainer">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.wish}
            onSwipe={(dir: any) => swiped(dir, character.wish, index)}
            onCardLeftScreen={() => outOfFrame(character.wish, index)}
          >
            <div
              style={{
                top: `${index * 8}px`,
                left: `${index * 8}px`,
                position: 'relative',
              }}
              className="card"
            >
              <h3>{character.wish}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div
        className="buttons"
        // style={{
        //   // top: `${index * 8}px`,
        //   // left: `${index * 8}px`,
        //   position: 'relative',
        // }}
      >
        <IconButton
          onClick={() => swipe('left')}
          // style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
        >
          <CheckIcon />
        </IconButton>

        {/* Swipe left! */}

        <button
          // style={{ backgroundColor: !canGoBack && '#c3c4d3' }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <IconButton
          onClick={() => swipe('right')}
          // style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default QuestionCarousel;
