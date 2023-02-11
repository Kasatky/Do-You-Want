import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Box, Typography } from '@mui/material';
import PageWrapper from '../Wrappers/PageWrapper';
import { RootState, useAppDispatch } from '../store';
import { getStat } from '../wishSlice';
import { logout } from '../Auth/userSlice';
import Diary from '../Diary/Diary';
import { NavLink } from 'react-router-dom';
import TelegramIcon from '@mui/icons-material/Telegram';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/joy';

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
        <Grid
          container
          // spacing={2}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box>
            {stat ? (
              <div className='profileStat'>
                <Typography>Создано вопросов: {stat?.createdWishes} <img height='38px' src='/img/thanks.gif' alt=''></img></Typography>
                <Typography>Желаний исполнено: {stat?.doneWishesCount} <img height='38px' src='/img/yeee.gif' alt=''></img></Typography>
                <Typography>Чаще всего ты хочешь: {stat?.mostDoneWish} <img height='38px' src='/img/three.gif' alt=''></img></Typography>
                <Typography>Среднее время исполнения желаний в днях: {stat?.averageTime} <img height='38px' src='/img/dancing.gif' alt=''></img></Typography>
              </div>
            ) : (
              <div className='profileStat'>Выполненных желаний пока нет</div>
            )}
          </Box>


          <Box className='profileStat' sx={{ width: '20em' }}>
            Это приложение не может заменить специалиста, если нужна помощь, обратись к врачу.
            <Typography sx={{ fontSize: '1.1em' }}> Если тебе нужна помощь прямо сейчас -
              всероссийский бесплатный круглосуточный телефон доверия 8-800-2000-122.</Typography>
            Также можем порекомендовать клинического психолога, проверенного нашей командой: <NavLink to="https://t.me/lloyas" target="_blank"><TelegramIcon /> Телеграм Оли</NavLink>
          </Box>

        </Grid>
        <Diary />

        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ flex: '0 0 auto', float: 'right' }}
        >
          Выйти
        </Button>
      </Container>

    </PageWrapper >
  );
}

export default ProfilePage;
