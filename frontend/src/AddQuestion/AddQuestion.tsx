import React from 'react';
import {
  Typography,
  Box,
  Card,
  FormControlLabel,
  Checkbox,
  Button,
  Modal,
} from '@mui/material';
import Input from '@mui/joy/Input';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid black',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  m: 5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function AddQuestion({ open, setOpen }: Props) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form">
        <Card
          sx={{
            margin: '30px 0px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: '40px', fontWeight: '600' }}>
            Хочешь
          </Typography>
          <Input
            placeholder="здесь писать вопрос.."
            variant="solid"
            size="lg"
            sx={{
              backgroundColor: 'black',
              width: '400px',
              color: '#FFFAFA',
              fontSize: '24px',
              borderRadius: '15px',
            }}
          />
          <i style={{ fontSize: '40px' }} className="fa-solid fa-question"></i>
        </Card>

        <Card
          sx={{
            margin: '30px 0px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormControlLabel
            value="top"
            control={<Checkbox />}
            label="Добавить этот вопрос для всех"
            labelPlacement="top"
            sx={{ textAlign: 'left no-wrap' }}
          />
          <Button
            sx={{
              bgcolor: 'black',
              color: 'white',
              width: '300px',
              borderRadius: '15px',
              height: '40px',
            }}
            variant="contained"
          >
            Добавить
          </Button>
        </Card>
      </Box>
    </Modal>
  );
}

export default AddQuestion;
