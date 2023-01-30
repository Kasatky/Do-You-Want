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
    <div style={{ flex: '0 0 auto' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar id='footer' position="absolute" sx={{ top: '93vh' }}>
          <Container>
            <Toolbar>
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
    </div>
  );
}

export default Footer;
