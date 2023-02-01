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
      {wish.wish.wish}
      <button onClick={completeWish}>Выполнено</button>
    </div>
  );
}

export default AddedWish;
