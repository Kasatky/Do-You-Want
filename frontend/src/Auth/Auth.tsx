import React, { useState } from 'react';
import { TextField, Typography, Modal, Button, Box } from '@mui/material';
import { RootState, useAppDispatch } from '../store';
import { login, register } from './userSlice';
import { UserLogin, UserRegister } from './usersTypes';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1525d8',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function Auth({ open, setOpen }: Props) {
  const [authType, setAuthType] = useState('login');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const error = useSelector((state: RootState) => state.user.error);

  const dispatch = useAppDispatch();

  const handleClose = () => setOpen(false);

  const handleAuthType = () => {
    setAuthType((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const handleLogin = async (): Promise<any> => {
    const user: UserLogin = { email: userEmail, password: userPassword };
    dispatch(login(user));
  };

  const handleRegister = async (): Promise<any> => {
    const user: UserRegister = {
      email: userEmail,
      userName: userName,
      password: userPassword,
    };
    dispatch(register(user));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setUserPassword(event.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          {error && (
            <Typography
              sx={{ display: 'flex', alignItems: 'center', color: 'red' }}
            >
              {error}
            </Typography>
          )}
          {authType === 'register' && (
            <TextField
              id="outlined-basic"
              label="Ваше имя"
              type="text"
              variant="outlined"
              required
              onChange={handleNameChange}
              value={userName}
              sx={{ mt: 2, width: '100%' }}
            />
          )}

          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            required
            onChange={handleEmailChange}
            value={userEmail}
            sx={{ mt: 2, width: '100%' }}
          />

          <TextField
            id="outlined-basic"
            label="Пароль"
            type="password"
            variant="outlined"
            required
            onChange={handlePasswordChange}
            value={userPassword}
            sx={{ mt: 2, width: '100%' }}
          />

          {authType === 'login' ? (
            <Button onClick={handleLogin} variant="contained" sx={{ mt: 2 }}>
              Войти
            </Button>
          ) : (
            <Button onClick={handleRegister} variant="contained" sx={{ mt: 2 }}>
              Зарегистрироваться
            </Button>
          )}
          <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            {authType === 'login' ? (
              <>
                {'Впервые у нас? '}
                <Button
                  disableRipple
                  onClick={handleAuthType}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  Зарегистрироваться
                </Button>
              </>
            ) : (
              <>
                {'Уже есть аккаунт? '}
                <Button
                  disableRipple
                  onClick={handleAuthType}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  Войти
                </Button>
              </>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Auth;
