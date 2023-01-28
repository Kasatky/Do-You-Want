import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import React from 'react';
import { logout } from '../Auth/userSlice';
import { useAppDispatch } from '../store';

type Props = {
  isAuth: boolean;
};

function Footer({ isAuth }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ padding: '20px 0' }}>
            {isAuth ? (
              <Button onClick={handleLogout} variant="contained">
                Logout
              </Button>
            ) : (
              'FOOTER'
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Footer;
