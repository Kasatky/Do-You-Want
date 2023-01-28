import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { RootState, useAppDispatch } from '../store';
import { checkUser } from '../Auth/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../features/Header';
import Footer from '../features/Footer';

function ProfilePage(): JSX.Element {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUser());
    if (!isAuth) navigate('/');
    console.log('AUTH: ', isAuth);
  }, [dispatch, isAuth, navigate]);

  return (
    <div style={{ height: '100%' }}>
      <Header isProfile={true} isAuth={isAuth} handleOpen={() => {}} />

      <Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
        CONTENT
      </Container>

      <Footer isAuth={isAuth} />
    </div>
  );
}

export default ProfilePage;
