import React, { useState } from 'react';
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
import { useAppDispatch } from '../store';
import { addWish } from '../wishSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  border: '2px solid black',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleOpenPrompt: () => void;
};

function AddQuestion({ open, setOpen, handleOpenPrompt }: Props) {
  const [wish, setWish] = useState('');
  const [status, setStatus] = useState(false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
    setWish('');
  };

  const handleWishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWish(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((prev) => !prev);
  };

  const addNewWish = () => {
    let userWish;
    if (wish.includes('?')) {
      userWish = wish;
    } else {
      userWish = wish + '?';
    }
    const newWish = { wish: userWish, isPublic: status };
    dispatch(addWish(newWish));
    handleClose();
    handleOpenPrompt();
  };

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
            minWidth: 300,
            margin: '30px 0px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: '2vw' }}>Хочешь</Typography>

          <Input
            value={wish}
            onChange={handleWishChange}
            placeholder="здесь писать вопрос.."
            variant="solid"
            size="lg"
            sx={{
              backgroundColor: '#fff',
              minWidth: 300,
              color: '#000',
              borderRadius: '15px',
              fontSize: '2vw',
              margin: '0 0 0 10px',
            }}
          />
          <i style={{ fontSize: '2vw' }} className="fa-solid fa-question"></i>
        </Card>

        <Card
          sx={{
            minWidth: 300,
            margin: '30px 0px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <FormControlLabel
            sx={{ textAlign: 'left no-wrap', fontSize: '2vw' }}
            value="top"
            control={
              <Checkbox checked={status} onChange={handleStatusChange} />
            }
            label="Сделать вопрос публичным"
            labelPlacement="top"
          />
          <Button
            sx={{
              bgcolor: '#ccc',
              color: 'white',
              // width: '300px',
              borderRadius: '15px',
              height: '40px',
              fontSize: '2vw',
              // justifyContent: 'center',
            }}
            variant="contained"
            onClick={addNewWish}
          >
            Добавить
          </Button>
        </Card>
      </Box>
    </Modal>
  );
}

export default AddQuestion;
