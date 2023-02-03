import { Close, DoneOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../store";
import { completeUserWish, deleteUserWish } from "../wishSlice";
import { UserWish } from "../wishTypes";

type Props = {
  wish: UserWish;
};

function AddedWish({ wish }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const deleteWish = () => {
    dispatch(deleteUserWish(wish.id));
  };

  const completeWish = () => {
    dispatch(completeUserWish(wish.id));
  };

  return (
    <div
      style={{
        fontWeight: "lighter ",
        fontFamily: '"Gill Sans", sans-serif',
        display : 'flex',
        justifyContent : 'space-between',
        fontSize: '0.8em'
      }}
    >
      <IconButton onClick={deleteWish}><Close/></IconButton>
      {wish?.wish?.wish[0].toUpperCase() +
        wish?.wish?.wish.slice(1, wish?.wish?.wish.length - 1)}
      <IconButton onClick={completeWish}><DoneOutline /></IconButton>
    </div>
  );
}

export default AddedWish;
