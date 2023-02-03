import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button } from '@mui/material';
import PageWrapper from '../Wrappers/PageWrapper';
import { RootState, useAppDispatch } from '../store';
import { getStat } from '../wishSlice';
import { logout } from '../Auth/userSlice';
import Diary from '../Diary/Diary';

function ProfilePage(): JSX.Element {
  const stat = useSelector((state: RootState) => state.wish.stat);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStat());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <PageWrapper isAdmin={false}>
      <Container sx={{ marginTop: '40px', marginBottom: '5em' }}>
        <h2>Статистика:</h2>
        {stat ? (
          <div className='profileStat'>
            <p>Создано желаний: {stat?.createdWishes}</p>
            <p>Всего желаний исполнено: {stat?.doneWishesCount}</p>
            <p>Чаще всего ты хочешь: {stat?.mostDoneWish}</p>
            <p>Среднее время исполнения желаний в днях: {stat?.averageTime}</p>
          </div>
        ) : (
          <div className='profileStat'>Выполненных желаний пока нет</div>
        )}
        <Diary />

        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ flex: '0 0 auto', float: 'right' }}
        >
          Выйти
        </Button>
      </Container>

    </PageWrapper>
  );
}

export default ProfilePage;
