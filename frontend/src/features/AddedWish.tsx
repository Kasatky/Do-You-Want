import React from 'react';
import { useAppDispatch } from '../store';
import { completeUserWish, deleteUserWish } from '../wishSlice';
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
    <div>
      <button onClick={deleteWish}>X</button>
      {wish?.wish?.wish[0].toUpperCase() +
        wish?.wish?.wish.slice(1, wish?.wish?.wish.length - 1)}
      <button onClick={completeWish}>✓</button>
    </div>
  );
}

export default AddedWish;
