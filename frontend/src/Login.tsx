import React, { useState } from "react";
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

function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = async (event: any): Promise<any> => {
    event.preventDefault();
    const data = JSON.stringify({
      email: userEmail,
      password: userPassword,
    });
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    console.log(response);

    if (response.status === 200) console.log("Успешно");
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUserPassword(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Войти</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            required
            onChange={handleEmailChange}
            value={userEmail}
            sx={{ ml: 4, mt: 2, width: 350 }}
          />

          <TextField
            id="outlined-basic"
            label="Пароль"
            type="password"
            variant="outlined"
            required
            onChange={handlePasswordChange}
            value={userPassword}
            sx={{ ml: 4, mt: 2, width: 350 }}
          />

          <Button type="submit" variant="contained" sx={{ mt: 2, ml: 20 }}>
            Войти
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Login;
