import React, { useState } from 'react';
import {
  Container,
  Button,
  AppBar,
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import './headerStyle.css'
import '../index.css';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import { logout } from '../Auth/userSlice';
import { useAppDispatch } from '../store';
import { Fingerprint } from '@mui/icons-material';

type Props = {
  isAdmin: boolean;
  isAuth: boolean;
  userName: string | undefined;
};

function Header({ isAdmin, isAuth, userName }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isAdmin ? (
        <AppBar position="static">
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          ></Container>
          <Button onClick={handleLogout} variant="contained">
            Logout
          </Button>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Logo />

            {!isAuth ? (
              <IconButton aria-label="fingerprint" color="success"
                onClick={handleOpen}
                sx={{
                  background: 'white',
                  borderRadius: '15px',
                  zIndex: 7,
                  cursor: 'pointer'
                }}>
                <Fingerprint />
                ВОЙТИ
              </IconButton>
            ) : (
              <>
                <IconButton
                  onClick={navigateToProfile}
                  size="small"
                  sx={{ ml: 2, zIndex: 7 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 80, height: 80, fontSize: '50px' }}>
                    {userName && userName[0]}
                  </Avatar>
                </IconButton>
              </>
            )}
          </Container>
          <Auth open={open} setOpen={setOpen} />
        </AppBar>
      )
      }
    </Box >
  );
}

export default Header;
