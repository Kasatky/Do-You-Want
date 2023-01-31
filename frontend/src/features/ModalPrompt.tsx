import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
};

function ModalPrompt({ open }: Props): JSX.Element {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{ textAlign: 'center', fontSize: '26px', color: 'green' }}
        >
          Вопрос добавлен
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalPrompt;
