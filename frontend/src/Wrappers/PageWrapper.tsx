import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../Auth/userSlice';
import Footer from '../features/Footer';
import Header from '../features/Header';
import { RootState, useAppDispatch } from '../store';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  isProfile: boolean;
};

function PageWrapper({ children, isProfile }: Props): JSX.Element {
  const user = useSelector((state: RootState) => state.user);
  const { isAuth } = user;
  console.log(user);
  const userName = user.profile?.userName;
  console.log('AUTH: ', isAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch, navigate]);

  return (
    <div className="wrapper" style={{ height: '100%' }}>
      <div style={{ flex: '1 0 auto' }}>
        <Header isProfile={isProfile} isAuth={isAuth} userName={userName} />
        {children}
      </div>

      <Footer isAuth={isAuth} />
    </div>
  );
}

export default PageWrapper;
