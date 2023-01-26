import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #1525d8",
  boxShadow: 24,
  p: 4,
};

function Registration() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Зарегистрироваться</Button>
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
            type='text'
            variant="outlined"
            required
            sx={{ ml: 4, mt: 2, width: 350 }}
          />

          <TextField
            id="outlined-basic"
            label="Email"
            type='email'
            variant="outlined"
            required
            sx={{ ml: 4, mt: 2, width: 350 }}
          />

          <TextField
            id="outlined-basic"
            label="Пароль"
            type='password'
            variant="outlined"
            required
            sx={{ ml: 4, mt: 2, width: 350 }}
          />

          <Button variant="contained" sx={{ mt: 2, ml: 12}}>Зарегистрироваться</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Registration;
