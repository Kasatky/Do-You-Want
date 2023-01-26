import React, { useState } from 'react';
import { TextField, Typography, Modal, Button, Box } from '@mui/material';
import Registration from './Registration';

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
  const [openRegister, setOpenRegister] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleClose = () => setOpen(false);

  const handleAuthType = () => {
    setAuthType((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const handleSubmit = async (event: any): Promise<any> => {
    event.preventDefault();
    const data = JSON.stringify({
      email: userEmail,
      password: userPassword,
    });
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    console.log(response);

    if (response.status === 200) console.log('Успешно');
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
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          {authType === 'register' && (
            <TextField
              id="outlined-basic"
              label="Ваше имя"
              type="text"
              variant="outlined"
              required
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

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {authType === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            {authType === 'login' ? (
              <>
                {'Впервые у нас? '}
                <Button disableRipple onClick={handleAuthType}>
                  Зарегистрироваться
                </Button>
              </>
            ) : (
              <>
                {'Уже есть аккаунт? '}
                <Button disableRipple onClick={handleAuthType}>
                  Войти
                </Button>
              </>
            )}
          </Typography>
        </Box>
      </Modal>

      <Registration open={openRegister} setOpen={setOpenRegister} />
    </div>
  );
}

export default Auth;
