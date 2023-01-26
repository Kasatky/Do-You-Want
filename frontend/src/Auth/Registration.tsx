import React, { useState } from 'react';
import { TextField, Typography, Modal, Button, Box } from '@mui/material';
import Login from './Auth';

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
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function Registration({ open, setOpen }: Props) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <TextField
            id="outlined-basic"
            label="Ваше имя"
            type="text"
            variant="outlined"
            required
            sx={{ ml: 4, mt: 2, width: 350 }}
          />

          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            required
            sx={{ ml: 4, mt: 2, width: 350 }}
          />

          <TextField
            id="outlined-basic"
            label="Пароль"
            type="password"
            variant="outlined"
            required
            sx={{ ml: 4, mt: 2, width: 350 }}
          />

          <Button variant="contained" sx={{ mt: 2, ml: 12 }}>
            Зарегистрироваться
          </Button>

          <Typography>
            Уже есть аккаунт? <span>Войти</span>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Registration;
