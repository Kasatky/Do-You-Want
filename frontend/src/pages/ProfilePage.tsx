import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import PageWrapper from '../Wrappers/PageWrapper';
import { RootState, useAppDispatch } from '../store';
import { getStat } from '../wishSlice';

function ProfilePage(): JSX.Element {
  const stat = useSelector((state: RootState) => state.wish.stat);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStat());
  }, [dispatch]);
  return (
    <PageWrapper isProfile={true} isAdmin={false}>
      <Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
        <Typography>Статистика</Typography>
        {stat ? (
          <div>
            <p>Всего желаний исполнено:</p>
            <p>{stat?.doneWishesCount}</p>
            <p>Ваше самое исполняемое желание:</p>
            <p>{stat?.mostDoneWish}</p>
            <p>Среднее время исполнения желаний в днях:</p>
            <p>{stat?.averageTime}</p>
          </div>
        ) : (
          <div>Выполненных желаний пока нет</div>
        )}
      </Container>
    </PageWrapper>
  );
}

export default ProfilePage;
