import React from 'react';
import { useAppDispatch } from '../store';
import { completeUserWish, deleteUserWish } from '../wishSlice';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { UserWish } from '../wishTypes';

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
    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
      <IconButton
        onClick={deleteWish}><CloseIcon /></IconButton>
      {wish?.wish?.wish[0].toUpperCase() +
        wish?.wish?.wish.slice(1, wish?.wish?.wish.length - 1)}
      <IconButton onClick={completeWish}><TaskAltIcon /></IconButton>
    </div>
  );
}

export default AddedWish;
