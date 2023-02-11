import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../store';
import { addNewNote } from './diarySlice';
import { DiaryNote } from './diaryTypes';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

function DiaryModalNew({ open, setOpen }: Props): JSX.Element {
  const [situation, setSituation] = useState('');
  const [emotion, setEmotion] = useState('');
  const [mind, setMind] = useState('');
  const [action, setAction] = useState('');

  const dispatch = useAppDispatch();

  const handleClose = () => setOpen(false);

  const clearFields = () => {
    setSituation('');
    setEmotion('');
    setMind('');
    setAction('');
  };

  const handleSituationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSituation(event.target.value);
  };

  const handleEmotionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmotion(event.target.value);
  };

  const handleMindChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMind(event.target.value);
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAction(event.target.value);
  };

  const handleSubmit = () => {
    const newNote: DiaryNote = {
      id: undefined,
      situation,
      emotion,
      mind,
      action,
      createdAt: undefined,
    };
    dispatch(addNewNote(newNote));
    setOpen(false);
    clearFields();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid sx={style}>
        <Typography>Добавить запись в дневник</Typography>

        <TextField
          id="outlined-basic"
          label="Событие"
          type="text"
          variant="outlined"
          color='success'
          required
          onChange={handleSituationChange}
          value={situation}
          sx={{ mt: 2, width: '100%' }}
        />
        <TextField
          id="outlined-basic"
          label="Эмоции"
          type="text"
          variant="outlined"
          color='success'
          required
          onChange={handleEmotionChange}
          value={emotion}
          sx={{ mt: 2, width: '100%' }}
        />
        <TextField
          id="outlined-basic"
          label="Мысли"
          type="text"
          variant="outlined"
          color='success'
          required
          onChange={handleMindChange}
          value={mind}
          sx={{ mt: 2, width: '100%' }}
        />
        <TextField
          id="outlined-basic"
          label="Поведение"
          type="text"
          variant="outlined"
          color='success'
          required
          onChange={handleActionChange}
          value={action}
          sx={{ mt: 2, width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1em' }}>
          <Button variant="contained" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Сохранить
          </Button>
        </div>
      </Grid>
    </Modal>
  );
}

export default DiaryModalNew;
