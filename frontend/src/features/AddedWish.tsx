import React from 'react';
import { useAppDispatch } from '../store';
import { completeUserWish, deleteUserWish } from '../wishSlice';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VerifiedIcon from '@mui/icons-material/Verified';
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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', lineHeight: 0.9, }} >
      <IconButton
        onClick={deleteWish}><DeleteIcon sx={{ fontSize: 'medium' }} /></IconButton>
      {wish?.wish?.wish[0].toUpperCase() +
        wish?.wish?.wish.slice(1, wish?.wish?.wish.length - 1)}
      <IconButton onClick={completeWish}><VerifiedIcon /></IconButton>
    </div>
  );
}

export default AddedWish;
