import React, { useState } from 'react';
import {
  Container,
  Button,
  AppBar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import './headerStyle.css'
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

type Props = {
  isProfile: boolean;
  isAuth: boolean;
  handleOpen: () => void;
};

function Header({ isProfile, isAuth, handleOpen }: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigateToProfile = () => {
    handleClose();
    navigate('/profile');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="Clouds" position="static" className='headerCover'>
        <Container sx={{
          marginLeft: '0px',
          display: 'flex',
          width: '100vw',
          justifyContent: 'space-between',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}>
          <Logo />
          {!isAuth ? (
            <Button
              className='btnLanding'
              onClick={handleOpen}
              variant="contained"
              sx={{
                width: '120px',
                height: '120px',

                borderRadius: '50%',
              }}
            >
              Войти
            </Button>
          ) : (
            <>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 80, height: 80 }}>Profile</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {isProfile ? (
                  <MenuItem onClick={navigateToProfile}>Empty Item</MenuItem>
                ) : (
                  <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
                )}
              </Menu>
            </>
          )}
        </Container>
        <Box className="Cloud Foreground"></Box>
        <Box className="Cloud Background"></Box>
        <Box className="Cloud Foreground"></Box>
        <Box className="Cloud Background"></Box>
        <Box className="Cloud Foreground"></Box>
        <Box className="Cloud Background"></Box>
        <Box className="Cloud Background"></Box>
        <Box className="Cloud Foreground"></Box>
        <Box className="Cloud Background"></Box>
        <Box className="Cloud Background"></Box>
      </AppBar>
    </Box>
  );
}

export default Header;
