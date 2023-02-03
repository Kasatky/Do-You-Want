import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../Auth/userSlice';
import Header from '../features/Header';
import { RootState, useAppDispatch } from '../store';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  isAdmin: boolean;
};

function PageWrapper({ children, isAdmin }: Props): JSX.Element {
  const user = useSelector((state: RootState) => state.user);
  const { isAuth } = user;
  const userName = user.profile?.userName;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch, navigate]);

  return (
    <div>
      <Header isAdmin={isAdmin} isAuth={isAuth} userName={userName} />
      {children}
    </div>
  );
}

export default PageWrapper;
