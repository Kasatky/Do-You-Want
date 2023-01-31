import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { addWishToUser, getRandomWish } from "../CabinetAdminPage/wishSlice";
import { useEffect } from "react";
import { Button } from "@mui/material";

export default function QuestionView() {
  const random = useSelector((state: RootState) => state.wish.random);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!random) {
      dispatch(getRandomWish());
    }
  }, [dispatch, random]);

  const handleFalse = () => {
    dispatch(getRandomWish());
  };
  async function handleTrue() {
    dispatch(addWishToUser())
    dispatch(getRandomWish());
    // const url = "/addWishToUser";
    // await fetch(url, {
    //   method: "PUT",
    //   headers: { "Content-Type": "Application/json" },
    //   body: JSON.stringify({
    //     id: arr[0].id,
    //   }),
    // });
  }

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
