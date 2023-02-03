import React, { useState } from 'react';
import {
  Container,
  Button,
  AppBar,
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import './headerStyle.css';
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
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{
            width: '100px',
            float: 'right',
          }}
        >
          Выход
        </Button>
      ) : (
        <AppBar position="static" color="primary">
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
              <Button
                color="success"
                variant="contained"
                onClick={handleOpen}
                sx={{
                  borderRadius: '10px',
                  width: '7em',
                  zIndex: 7,
                  cursor: 'pointer',
                }}
              >
                ВОЙТИ
              </Button>
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
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      fontSize: '50px',
                      backgroundColor: '#02611d',
                    }}
                  >
                    {userName && userName[0]}
                  </Avatar>
                </IconButton>
              </>
            )}
          </Container>
          <Auth open={open} setOpen={setOpen} />
        </AppBar>
      )}
    </Box>
  );
}

export default Header;
