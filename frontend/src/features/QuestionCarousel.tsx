import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App/App.css";
import { RootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { getRandomWish } from "../CabinetAdminPage/wishSlice";
import { Box, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

type Wish = {
  id: number;
  wish: string;
  userId: number;
  isPublic: boolean;
  isModerated: boolean;
};
type WishId = number;

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
  const dispatch = useAppDispatch();

  const wish = [];
  const store = useSelector((state: RootState) => state);
  // const wishRandom = useSelector((state: RootState) => state.wish.list);
  // const isAuth = useSelector((state: RootState) => state.user.isAuth);

  // console.log(user);
  useEffect(() => {
    dispatch(getRandomWish());
  }, [dispatch]);

  if (store.user.isAuth) {
    wish.push(...store.wish.list);
  } else {
    wish.push(...wishMock);
  }
  const [currentIndex, setCurrentIndex] = useState(wish.length - 1);
  const [lastDirection, setLastDirection] = useState<string>();
  const [op, setOp] = useState(0.6);
  const currentIndexRef = useRef(currentIndex);

  const childRefs: any = useMemo(
    () =>
      Array(wish.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < wish.length - 1;

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
    if (canSwipe && currentIndex < wish.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
    setOp((prevOp) => prevOp + 0.1);
  };

  // increase current index and show card
  //Для кнопки вернуть карточку
  // const goBack = async () => {
  //   if (!canGoBack) return;
  //   const newIndex = currentIndex + 1;
  //   updateCurrentIndex(newIndex);
  //   await childRefs[newIndex].current.restoreCard();
  // };

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
        {wish.map((character, index) => (
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
                // left: `${index * 8}px`,
                position: "relative",
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
      <div
        className="buttons"
        // style={{
        //   // top: `${index * 8}px`,
        //   // left: `${index * 8}px`,
        // position: 'relative',
        // }}
      >
        <IconButton
          onClick={() => swipe("left")}
          // style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
        >
          Да
          <CheckIcon />
        </IconButton>

        {/* Swipe left! */}

        {/* <button
          // style={{ backgroundColor: !canGoBack && '#c3c4d3' }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button> */}
        <IconButton
          onClick={() => swipe("right")}
          // style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
        >
          Нет
          <DeleteIcon />
        </IconButton>
      </div>
      {/* {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )} */}
    </div>
  );
}

export default QuestionCarousel;
